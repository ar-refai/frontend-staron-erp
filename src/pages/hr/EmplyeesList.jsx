import { fakeData as data, usStates as states } from "./makeData";
import React, { useCallback, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
    Chip,
} from "@mui/material";
import { Delete, Edit, AccountCircle } from "@mui/icons-material";
import UserImg from "../../assets/user.jpg";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";



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
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState(() => data);
    const [validationErrors, setValidationErrors] = useState({});
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const handleCreateNewRow = (values) => {
        tableData.push(values);
        setTableData([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            setTableData([...tableData]);
            exitEditingMode();
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(() => {
        tableData.splice(rowToDelete.index, 1);
        setTableData([...tableData]);
        setDeleteDialogOpen(false);
    }, [rowToDelete, tableData]);

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
                accessorKey: "image",
                header: "Image",
                Cell: () => (
                    <img
                        src={UserImg}
                        alt="Employee"
                        style={{ width: "40px", borderRadius: "50%" }}
                    />
                ),
            },
            {
                accessorKey: "fullName",
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
                accessorKey: "jobRole",
                header: "Job Role",
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: "status",
                header: "Status",
                Cell: ({ cell }) => (
                    <Chip
                        variant="outlined"
                        label={cell.getValue() === "active" ? "Active" : "Inactive"}
                        color={cell.getValue() === "active" ? "info" : "error"}
                        style={{ width: "80px", fontSize: "12px" }}
                    />
                ),
                muiTableBodyCellEditTextFieldProps: {
                    select: true,
                    children: ["active", "inactive"].map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    )),
                },
            },
        ],
        [getCommonEditTextFieldProps]
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
                editingMode="modal"
                enableColumnOrdering
                enableEditing
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Tooltip arrow placement="left" title="Profile">
                            <IconButton color="secondary">
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Delete">
                            <IconButton
                                color="error"
                                onClick={() => {
                                    setRowToDelete(row);
                                    setDeleteDialogOpen(true);
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Button
                        sx={{color:colors.primary[200] , backgroundColor:colors.blueAccent[900],
                            '&:hover': {
                                color: colors.primary[800],
                                backgroundColor: colors.primary[100]}}}
                        onClick={() => setCreateModalOpen(true)}
                        variant="contained"
                    >
                        Onboard New Employee
                    </Button>
                )}
            />
            <CreateNewAccountModal
                columns={columns}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                sx={{backgroundColor:colors.primary[100]}}
                onSubmit={handleCreateNewRow}
            />
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteRow}
            />
        </>
    );
};

const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ""] = "";
            return acc;
        }, {})
    );

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Create New Account</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: "100%",
                            minWidth: { xs: "300px", sm: "360px", md: "400px" },
                            gap: "1.5rem",
                        }}
                    >
                        {columns.map((column) => (
                            <TextField
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                                select={column.muiTableBodyCellEditTextFieldProps?.select}
                                children={column.muiTableBodyCellEditTextFieldProps?.children}
                            />
                        ))}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: "1.25rem" }}>
                <Button 
                sx={{
                    color:colors.primary[100] , 
                    background:colors.primary[800],
                    '&:hover': {
                        color: colors.primary[800],
                        backgroundColor: colors.primary[100]}
                    }} onClick={onClose}>Cancel</Button>
                <Button 
                sx={{
                    color:colors.primary[100] , 
                background:colors.primary[800],
                '&:hover': {
                    color: colors.primary[800],
                    backgroundColor: colors.primary[100]}
                }} onClick={handleSubmit} variant="contained">
                    Onboard New Employee
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            <p>Are you sure you want to delete this record?</p>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button color="error" onClick={onConfirm} variant="contained">
                Delete
            </Button>
        </DialogActions>
    </Dialog>
);

export default EmployeeList;
