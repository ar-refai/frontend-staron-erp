import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
    Box,
    Button,
    Chip,
    DialogActions,
    IconButton,
    MenuItem,
    Modal,
    Stack,
    TextField,
    Tooltip,
    Avatar,
    Card,
    Divider,
    Typography,
} from "@mui/material";
import { Edit, AccountCircle } from "@mui/icons-material";
import { fakeData as data } from "./makeData"; // Make sure to import other necessary data such as usStates if needed
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { MaterialReactTable } from "material-react-table";
import {  ShowAllEmployee } from "../../apis/Employee";

const departments = [
    "HR",
    "Technical Office",
    "Sales",
    "Supply Chain",
    "Warehouse",
    "Operation",
    "Carpenter",
    "Solid Surface Factory Worker",
    "Site Engineer",
    "Financial Department",
    "IT",
    "Administration",
    "Buffet",
    "Software Department",
];

const EmployeeList = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'create'
    const [selectedRow, setSelectedRow] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersFromApi = await ShowAllEmployee();
                setTableData(usersFromApi.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error if necessary
            }
        };
        
        fetchData();
        const interval = setInterval(() => {
              setLoading(false);
          }, 2000);
          return () => clearInterval(interval);



    }, []);


    // console.log(users?.data)
    console.log(tableData)

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleCreateNewRow = (values) => {
        tableData.push(values);
        setTableData([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        try {
            if (!Object.keys(validationErrors).length) {
                tableData[row.index] = values;
                setTableData([...tableData]);
                exitEditingMode();
            }
        } catch (error) {
            console.error("Failed to save row edits:", error);
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
            };
        },
        [validationErrors]
    );

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
                accessorKey: "profileimage",
                header: "Image",
                Cell: ({ cell }) => (
                    <img
                        src={`https://erpsystem.darakoutlet.com/${cell.getValue()}`}
                        alt="Employee"
                        style={{ width: "40px" , height:"40px", borderRadius: "50%" }}
                    />
                ),
            },
            {
                accessorKey: "name",
                header: "Full Name",
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: "department",
                header: "Department",
                muiTableBodyCellEditTextFieldProps: {
                    select: true,
                    children: departments.map((department) => (
                        <MenuItem key={department} value={department}>
                            {department}
                        </MenuItem>
                    )),
                },
            },
            {
                accessorKey: "job_role",
                header: "Job Role",
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: "isemploee",
                header: "Status",
                Cell: ({ cell }) => (
                    <Chip
                        variant="outlined"
                        label={cell.getValue() == 1 ? "active" : "inactive"}
                        color={cell.getValue() == 1 ? "info" : "error"}
                        style={{ width: "80px", fontSize: "12px" }}
                    />
                ),
                muiTableBodyCellEditTextFieldProps: {
                    select: true,
                    children: [1, 0].map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    )),
                },
            },
        ],
        [getCommonEditTextFieldProps]
    );

    const handleOpenModal = (mode, row) => {
        setModalMode(mode);
        setSelectedRow(row);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedRow(null);
    };

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
                editingMode="modal"
                state={{ isLoading: loading }}
                muiCircularProgressProps={{
                    color: 'secondary',
                    thickness: 5,
                    size: 55,
                }}
                muiSkeletonProps={{
                    animation: 'pulse',
                    height: 28,
                }}
            
                muiLinearProgressProps= {
                {color: 'secondary',}
                }
                enableColumnOrdering
                enableEditing
                enableStickyHeader
                enableStickyFooter
                muiPaginationProps={{
                    color: 'secondary',
                    rowsPerPageOptions: [10, 20, 30],
                    shape: 'rounded',
                    variant: 'outlined',
                }}
                paginationDisplayMode='pages'
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                muiTablePaperProps={{
                    elevation: 2,
                    sx: {
                        borderRadius: '20px',
                    },
                }}
                muiTableContainerProps={{ sx: { maxHeight: '600px', backgroundColor: colors.primary[400] } }}
                muiTableHeadCellProps={{ sx: { backgroundColor: colors.primary[400] } }}
                muiTableBodyCellProps={{ sx: { backgroundColor: colors.primary[400] } }}
                muiTableBodyProps={{ sx: { backgroundColor: colors.primary[400] } }}
                muiBottomToolbarProps={({ table }) => ({
                    sx: { backgroundColor: colors.primary[400] },
                })}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Tooltip arrow placement="left" title="Profile">
                            <IconButton color="secondary" onClick={() => handleOpenModal('view', row.original)}>
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => handleOpenModal('edit', row.original)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Button
                        sx={{
                            color: colors.primary[200], backgroundColor: colors.blueAccent[900],
                            '&:hover': {
                                color: colors.primary[800],
                                backgroundColor: colors.primary[100]
                            }
                        }}
                        onClick={() => handleOpenModal('create')}
                        variant="contained"
                    >
                        Onboard New Employee
                    </Button>
                )}
            />

            <EmployeeModal
                open={modalOpen}
                mode={modalMode}
                onClose={handleCloseModal}
                // here mode is either 'create' or 'edit' 
                onSubmit={modalMode === 'create' ? handleCreateNewRow : handleSaveRowEdits}
                selectedRow={selectedRow}
                columns={columns}
            />
        </>
    );
};

const EmployeeModal = ({ open, mode, onClose, onSubmit, selectedRow, columns }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ""] = selectedRow ? selectedRow[column.accessorKey] : "";
            return acc;
        }, {})
    );

    useEffect(() => {
        if (selectedRow) {
            const newValues = columns.reduce((acc, column) => {
                acc[column.accessorKey ?? ""] = selectedRow[column.accessorKey] ?? "";
                return acc;
            }, {});
            setValues(newValues);
        }
    }, [selectedRow, columns]);

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValues({ ...values, profileimage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 900,
                    bgcolor: colors.primary[700],
                    color: colors.primary[200],
                    border: `3px solid ${colors.greenAccent[300]}`,
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '100%',
                    overflow: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderRadius: '10px'
                }}
            >
                <Typography variant="h6" sx={{
                    textTransform: "uppercase",
                    fontWeight: 'bold',
                }} component="h3">
                    {mode === 'edit' ? 'Edit Employee' : mode === 'create' ? 'Onboard New Employee' : 'Employee Profile'}
                </Typography>
                <Divider />
                <Box>
                    <Card sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 2,
                        backgroundColor: colors.primary[800]
                    }}>
                        <Avatar
                            alt="Employee Photo"
                            src={`https://erpsystem.darakoutlet.com${values.profileimage}`}
                            sx={{ width: 120, height: 120, mb: 2 }}
                        />
                        {mode === 'view' ? (
                            <>
                                <Typography variant="h5" sx={{
                                    textTransform: "uppercase",
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}>
                                    {values.name}
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    mt: 2,
                                    mb: 2
                                }}>
                                    <Typography sx={{ opacity: '75%' }}>
                                        {values.department}
                                    </Typography>
                                    <Typography sx={{ opacity: '75%' }}>
                                        {values.job_role}
                                    </Typography>
                                    <Typography sx={{ opacity: '75%' }}>
                                        {values.isemploee == 1 ? 'Active' : 'Inactive'}
                                    </Typography>
                                </Box>
                                <Box>
                                    Here add all the data you need!
                                </Box>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <Stack sx={{ width: '100%', gap: '1.5rem' }}>
                                    {columns.map((column) => (
                                        <TextField
                                            key={column.accessorKey}
                                            label={column.header}
                                            name={column.accessorKey}
                                            value={values[column.accessorKey]}
                                            onChange={handleInputChange}
                                            select={column.muiTableBodyCellEditTextFieldProps?.select}
                                            children={column.muiTableBodyCellEditTextFieldProps?.children}
                                        />
                                    ))}
                                    <TextField
                                        type="file"
                                        label="Upload Image"
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ accept: "image/*" }}
                                        onChange={handleFileChange}
                                    />
                                </Stack>
                                <DialogActions sx={{paddingTop:'20px',  display: 'flex', justifyContent: 'center', alignItems:"center" }}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            color: colors.greenAccent[400],
                                            borderColor: colors.greenAccent[400],
                                            '&:hover': {
                                                color: colors.greenAccent[600],
                                                borderColor: colors.greenAccent[600],
                                            }
                                        }}
                                        type="submit"
                                    >
                                        {mode === 'edit' ? 'Save Changes' : 'Onboard Employee'}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={onClose}
                                        sx={{
                                            color: colors.redAccent[400],
                                            borderColor: colors.redAccent[400],
                                            "&:hover": {
                                                color: colors.redAccent[600],
                                                borderColor: colors.redAccent[600],
                                            },
                                        }}
                                    >
                                        Close
                                    </Button>
                                </DialogActions>
                            </form>
                        )}
                    </Card>
                </Box>

            </Box>
        </Modal>
    );
};

export default EmployeeList;
