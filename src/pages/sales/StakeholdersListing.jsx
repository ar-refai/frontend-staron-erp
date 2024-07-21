import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Lottie from 'lottie-react';
import Document from '../../../src/assets/lottie/document.json';
import { useCallback, useMemo, useState, useEffect } from "react";
import {
    MenuItem,
    Modal,
    Tooltip,
    Chip,
    IconButton,
    Button,
    Box,
    useTheme,
    TextField,
    FormControl,
    InputLabel,
    Select
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { showAllClients, CreateClient, updateClient, deleteClient } from "../../apis/SalesApi/Clint";
import { MaterialReactTable } from "material-react-table";
import { tokens } from "theme";

const sources = [
    "Mr. Tarek El Behairy",
    "Mr. Hussein El Behairy",
    "Independent Effort",
    "Eng. Eslam Moataz"
];

const types = [
    "Project Owner",
    "Main Contractor",
    "Sub Contractor",
    "Consultant"
];

const StakeholdersListing = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create', 'edit'
    const [selectedRow, setSelectedRow] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientsFromApi = await showAllClients();
                setTableData(clientsFromApi.data);
                // console.log("**".repeat(44));
                // console.log(clientsFromApi.data);
                // console.log("**".repeat(44));
            } catch (error) {
                console.error('Error fetching client data:', error);
                // Handle error if necessary
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCreateNewRow = async (values) => {
      try {
          const response = await CreateClient(values);
          console.log(response);
          console.log(response.message);
  
          console.log("=".repeat(44));
          if (response && (response.status === 201 || response.status === 200)) {
              // Fetch the updated list of clients after successful creation
              const updatedClientsResponse = await showAllClients();
              if (updatedClientsResponse && updatedClientsResponse.status === 200) {
                  setTableData(updatedClientsResponse.data);
              } else {
                  throw new Error('Failed to fetch updated clients list');
              }
  
              setModalOpen(false); // Close modal after successful creation
              setSnackbarSeverity('success');
              setSnackbarMessage(response.message);
              setSnackbarOpen(true);
          } else {
              throw new Error('Creation failed: Empty response data');
          }
      } catch (error) {
          console.error('Error creating client:', error);
          setSnackbarSeverity('error');
          setSnackbarMessage('Failed to create client');
          setSnackbarOpen(true);
      }
  };
  
  

    const handleUpdateRow = async (id, values) => {
      try {
          const response = await updateClient(id, values);
          console.log(response);
          console.log(response.message);
          
          console.log("=".repeat(44));
          if (response && response.status === 201) {
              setTableData((prevTableData) =>
                  prevTableData.map((row) =>
                      row.id === id ? { ...row, ...values } : row
                  )
              );
              setModalOpen(false); // Close modal after successful update
              setSnackbarSeverity('success');
              setSnackbarMessage(response.message);
              setSnackbarOpen(true);
          } else {
              throw new Error('Update failed: Empty response data');
          }
      } catch (error) {
          console.error('Error updating client:', error.message);
          setSnackbarSeverity('error');
          setSnackbarMessage('Failed to update client');
          setSnackbarOpen(true);
      }
  };
  

    const handleDeleteRow = async (id) => {
        try {
            await deleteClient(id);
            setTableData((prevTableData) => prevTableData.filter((row) => row.id !== id));
            setSnackbarSeverity('success');
            setSnackbarMessage('Client deleted successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting client:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to delete client');
            setSnackbarOpen(true);
        }
    };

    const handleOpenModal = (mode, row) => {
        setModalMode(mode);
        setSelectedRow(row);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedRow(null);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "ID",
                enableColumnOrdering: false,
                enableEditing: false,
                enableSorting: false,
                size: 80,
            },
            {
                accessorKey: "name",
                header: "Name",
                size: 140,
            },
            {
                accessorKey: "phone",
                header: "Phone",
                size: 140,
            },
            {
                accessorKey: "email",
                header: "Email",
                size: 140,
            },
            {
                accessorKey: "source",
                header: "Source",
                size: 140,
            },
            {
                accessorKey: "type",
                header: "Type",
                size: 140,
            },
            {
                accessorKey: "company",
                header: "Company",
                size: 140,
            },
            {
                accessorKey: "Job_role",
                header: "Job Role",
                size: 140,
            },
            {
                accessorKey: "status",
                header: "Status",
                Cell: ({ cell }) => (
                    <Chip
                        variant="outlined"
                        label={cell.getValue() === "work" ? "Work" : "Not Working"}
                        color={cell.getValue() === "work" ? "info" : "error"}
                        style={{ width: "80px", fontSize: "12px" }}
                    />
                ),
                size: 140,
            },
            {
                accessorKey: "assign_by.name",
                header: "Assigned By",
                size: 140,
            },
        ],
        []
    );

    return (
        <>
            <MaterialReactTable
                displayColumnDefOptions={{
                    "mrt-row-actions": {
                        muiTableHeadCellProps: {
                            align: "center",
                        },
                        size: 120,
                    },
                }}
                columns={columns}
                data={tableData}
                enableEditing
                state={{ isLoading: loading }}
                enableColumnOrdering
                enableStickyHeader
                enableStickyFooter
                muiPaginationProps={{
                    color: 'secondary',
                    rowsPerPageOptions: [10, 20, 30],
                    shape: 'rounded',
                    variant: 'outlined',
                }}
                paginationDisplayMode='pages'
                muiTablePaperProps={{
                    elevation: 2,
                    sx: {
                        borderRadius: '20px',
                    },
                }}
                muiTableContainerProps={{ sx: { maxHeight: '600px', backgroundColor: 'primary' } }}
                muiTableHeadCellProps={{ sx: { backgroundColor: 'primary' } }}
                muiTableBodyCellProps={{ sx: { backgroundColor: 'primary' } }}
                muiTableBodyProps={{ sx: { backgroundColor: 'primary' } }}
                muiBottomToolbarProps={({ table }) => ({
                    sx: { backgroundColor: 'primary' },
                })}
                renderRowActions={({ row }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => handleOpenModal('edit', row.original)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="left" title="Delete">
                            <IconButton onClick={() => handleDeleteRow(row.original.id)}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Button
                        onClick={() => handleOpenModal('create')}
                        variant="outlined"
                        color="secondary"
                    >
                        Add New Client
                    </Button>
                )}
            />

            {modalOpen && (
                <Modal open={modalOpen} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 800,
                            bgcolor: colors.grey[800],
                            border: `1px solid ${colors.greenAccent[500]}`,
                            borderRadius: "8px",
                            boxShadow: 24,
                            p: 2,
                            pb: 4
                        }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase", pl: 3, pr: 3, pb: 2 }}>
                            <Lottie style={{ width: '25px', display: 'flex' }} animationData={Document} />
                            {modalMode === 'create' && "Add New Client"}
                            {modalMode === 'edit' && `Edit Client: ${selectedRow?.name}`}
                            <IconButton onClick={handleCloseModal} sx={{ marginLeft: 'auto', "&:hover": { color: colors.redAccent[400] } }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        {modalMode === 'create' && (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const values = Object.fromEntries(formData.entries());
                                handleCreateNewRow(values);
                            }}>
                                <Box sx={{ p: 3 }}>
                                    <TextField fullWidth label="Name" name="name" required sx={{ mb: 2 }} />
                                    <TextField fullWidth label="Company" name="company" required sx={{ mb: 2 }} />
                                    <TextField fullWidth label="Job Role" name="Job_role" required sx={{ mb: 2 }} />
                                    <TextField fullWidth label="Phone" name="phone" required sx={{ mb: 2 }} />
                                    <TextField fullWidth label="Email" name="email" sx={{ mb: 2 }} />
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel id="source-label">Source</InputLabel>
                                        <Select labelId="source-label" name="source" required>
                                            {sources.map((source) => (
                                                <MenuItem key={source} value={source}>
                                                    {source}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel id="type-label">Type</InputLabel>
                                        <Select labelId="type-label" name="type" required>
                                            {types.map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button type="submit" variant="outlined" color="secondary">Add Client</Button>
                                    </Box>
                                </Box>
                            </form>
                        )}
                        {modalMode === 'edit' && (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const values = Object.fromEntries(formData.entries());
                                handleUpdateRow(selectedRow.id, values);
                            }}>
                                <Box sx={{ p: 3 }}>
                                    <TextField fullWidth label="Name" name="name" defaultValue={selectedRow?.name} required sx={{ mb: 2 }} />
                                    <TextField fullWidth label="Company" name="company" defaultValue={selectedRow?.company} required sx={{ mb: 2 }} />
                                    <TextField fullWidth label="Job Role" name="Job_role" defaultValue={selectedRow?.Job_role} required sx={{ mb: 2 }} />
                                    <TextField fullWidth label="Phone" name="phone" defaultValue={selectedRow?.phone} required sx={{ mb: 2 }} />
                                    <TextField fullWidth label="Email" name="email" defaultValue={selectedRow?.email} sx={{ mb: 2 }} />
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel id="source-label">Source</InputLabel>
                                        <Select labelId="source-label" name="source" defaultValue={selectedRow?.source} required>
                                            {sources.map((source) => (
                                                <MenuItem key={source} value={source}>
                                                    {source}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel id="type-label">Type</InputLabel>
                                        <Select labelId="type-label" name="type" defaultValue={selectedRow?.type} required>
                                            {types.map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button type="submit" variant="outlined" color="secondary">Update Client</Button>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Box>
                </Modal>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default StakeholdersListing;
