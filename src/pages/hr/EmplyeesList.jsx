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
    useTheme
} from "@mui/material";
import { Edit, AccountCircle } from "@mui/icons-material";
import { ShowAllEmployee, CreateEmployee } from "../../apis/Employee";
import Create from "./Employee/Create";
import Update from "./Employee/Update";
import { MaterialReactTable } from "material-react-table";
import { tokens } from "theme";
import Profile from './Employee/Profile';

const departments = [
    "Adminstration",
    "Executive",
    "Human Resources",
    "Technical Office",
    "Sales Office",
    "Operation Office",
    "Control Office",
    "Supply Chain",
    "Markiting",
    "Research & Development",
    "Finance"
];

const EmployeeList = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'create'
    const [selectedRow, setSelectedRow] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersFromApi = await ShowAllEmployee();
                setTableData(usersFromApi.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error if necessary
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCreateNewRow = async (values) => {
        try {
            
            const response = await CreateEmployee(values);
            // console.log(response);
            console.log(response.data);
            if (response && response?.data) {
                const newData = await ShowAllEmployee();
                setTableData(newData.data);
                setModalOpen(false); // Close modal after successful creation
                setSnackbarSeverity('success');
                setSnackbarMessage('Employee created successfully');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error creating employee:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to create employee');
            setSnackbarOpen(true);
        }
    };

    const handleUpdateSuccess = (updatedEmployee) => {
        setTableData((prevTableData) =>
            prevTableData.map((row) =>
                row.id === updatedEmployee.id ? updatedEmployee : row
            )
        );
        setSnackbarSeverity('success');
        setSnackbarMessage('Employee updated successfully refresh the page.');
        setSnackbarOpen(true);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        try {
            if (!Object.keys(validationErrors).length) {
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
                accessorKey: "profileimage",
                header: "Image",
                Cell: ({ cell }) => (
                    <img
                        src={`http://api.staronegypt.com.eg/${cell.getValue()}`}
                        alt="Employee"
                        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
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
                        label={cell.getValue() === "1" ? "Active" : "Inactive"}
                        color={cell.getValue() === "1" ? "info" : "error"}
                        style={{ width: "80px", fontSize: "12px" }}
                    />
                ),
                muiTableBodyCellEditTextFieldProps: {
                    select: true,
                    children: [1, 0].map((status) => (
                        <MenuItem key={status} value={status}>
                            {status === "1" ? "Active" : "Inactive"}
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

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
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
                muiLinearProgressProps={{
                    color: 'secondary',
                }}
                enableEditing
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
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
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
                        onClick={() => handleOpenModal('create')}
                        variant="outlined"
                        color="secondary"
                    >
                        Onboard New Employee
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
                            bgcolor: "background.paper",
                            border: `1px solid ${colors.greenAccent[500]}`,
                            borderRadius: "8px",
                            boxShadow: 24,
                            p:2,
                            pb:4

                        }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase",pl:3,pr:3,pb:2, }}>
                            <Lottie style={{ width: '25px', display: 'flex', }} animationData={Document} />
                            {modalMode === 'create' && "Onboard New Employee"}
                            {modalMode === 'edit' && `Edit Employee: ${selectedRow?.name}`}
                            {modalMode === 'view' && `Profile of :  ${selectedRow?.name}`}
                            <IconButton onClick={handleCloseModal} sx={{ 
                                marginLeft: 'auto',
                                "&:hover":{color:colors.redAccent[400] }}}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        {modalMode === 'create' && <Create onSubmit={handleCreateNewRow} onClose={handleCloseModal} />}
                        {modalMode === 'edit' && <Update  onClose={handleCloseModal} selectedRow={selectedRow} onUpdateSuccess={handleUpdateSuccess} />}
                        {modalMode === 'view' && <Profile employee={selectedRow} />}
                    </Box>
                </Modal>
            )}

            <CustomizedSnackbars
                open={snackbarOpen}
                handleClose={handleSnackbarClose}
                severity={snackbarSeverity}
                message={snackbarMessage}
            />
        </>
    );
};

const CustomizedSnackbars = ({ open, handleClose, severity, message }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default EmployeeList;
