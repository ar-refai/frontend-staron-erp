import React, { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    MenuItem,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import UserImg from "../../assets/user.jpg";
import { tokens } from "../../theme";

const departments = [
    "The Technical Office",
    "Financial Department",
    "Operation",
    "Warehouse",
    "Administration",
    "Human Resource",
    "IT",
    "Buffet",
    "Head Office",
    "Software",
    "Store",
    "Control Office",
    "Supply Chain",
    "Sales",
];

const mockData = [
    {
        id: 1,
        profileimage: UserImg,
        name: "John Doe",
        hr_code: "EMP001",
        department: "The Technical Office",
        VacationBalance: 20,
    },
    {
        id: 2,
        profileimage: UserImg,
        name: "Jane Smith",
        hr_code: "EMP002",
        department: "Financial Department",
        VacationBalance: 15,
    },
    // Add more mock data if needed
];

const LeaveBalance = () => {
    const [tableData, setTableData] = useState(mockData);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editDays, setEditDays] = useState(0);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleEdit = (employee) => {
        const updatedData = tableData.map((item) => {
            if (item.id === employee.id) {
                return {
                    ...item,
                    VacationBalance: Math.max(0, item.VacationBalance + editDays),
                };
            }
            return item;
        });
        setTableData(updatedData);
        setShowEdit(false);
    };

    const handleClose = () => {
        setShowEdit(false);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "#",
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
                        src={cell.row.original.profileimage}
                        alt="Employee"
                        style={{ width: "40px", borderRadius: "50%" }}
                    />
                ),
            },
            {
                accessorKey: "name",
                header: "Full Name",
                size: 140,
            },
            {
                accessorKey: "hr_code",
                header: "Employee ID",
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
                accessorKey: "VacationBalance",
                header: "Remaining Days",
                Cell: ({ cell }) => `${cell.row.original.VacationBalance} DAYS`,
            },
            {
                accessorKey: "action",
                header: "Action",
                Cell: ({ cell }) => (
                    <Box display="flex" gap={1}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                setSelectedEmployee(cell.row.original);
                                setEditDays(0);
                                setShowEdit(true);
                            }}
                        >
                            Inc & Dec
                        </Button>
                    </Box>
                ),
            },
        ],
        []
    );
    const tableStyles = {
        muiBottomToolbarProps: {
            sx: { backgroundColor: colors.primary[400] }
        },
        muiTableContainerProps: {
            sx: { 
                maxHeight: '600px', 
                backgroundColor: colors.primary[400], 
                overflowX: 'auto' 
            }
        },
        muiTableHeadCellProps: {
            sx: { backgroundColor: colors.primary[400] }
        },
        muiTableBodyCellProps: {
            sx: { backgroundColor: colors.primary[400] }
        },
        muiPaginationProps: {
          color: 'secondary',
          rowsPerPageOptions: [10, 20, 30],
          shape: 'rounded',
          variant: 'outlined',
        },
        muiTableBodyProps: {
            sx: { backgroundColor: colors.primary[400] }
        },
        muiTablePaperProps: {
            elevation: 2,
            sx: {
                borderRadius: '20px',
                padding: '10px 0 0 0'
            }
        },
      };
      
    return (
        <>
            <MaterialReactTable
                columns={columns}
                data={tableData}
                editingMode="modal"
                enableColumnOrdering
                enableColumnActions={false}
                muiBottomToolbarProps={tableStyles.muiBottomToolbarProps}
                muiTableContainerProps={tableStyles.muiTableContainerProps}
                muiTableHeadCellProps={tableStyles.muiTableHeadCellProps}
                muiTableBodyCellProps={tableStyles.muiTableBodyCellProps}
                muiPaginationProps={tableStyles.muiPaginationProps}
                muiTableBodyProps={tableStyles.muiTableBodyProps}
                muiTablePaperProps={tableStyles.muiTablePaperProps}
            
            />

            <Dialog open={showEdit} onClose={handleClose} >
                <DialogTitle >Edit Leave Balance for {selectedEmployee?.name}</DialogTitle>
                <Divider />

                <DialogContent sx={{ color: colors.grey[200], paddingBlock:'20px'}} >
                    <Typography>
                        Positive Numbers for Increasing / Negative Numbers For Decreasing
                    </Typography>
                    <TextField
                        type="number"
                        label="Days to add/subtract"
                        value={editDays}
                        onChange={(e) => setEditDays(e.target.value === '' ? '' : Number(e.target.value))}
                        fullWidth
                        sx={{
                            marginTop: '20px',
                        }}
                    />
                </DialogContent>
                <Divider />

                <DialogActions>
                    <Button
                        sx={{
                            color:colors.redAccent[300],
                            borderColor:colors.redAccent[300],
                            "&:hover": {
                                borderColor:colors.redAccent[300]
                            }
                        }}
                        variant="outlined"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        sx={{
                            color:colors.greenAccent[300],
                            borderColor:colors.greenAccent[300],
                            marginRight:'15px',
                            "&:hover": {
                                borderColor:colors.greenAccent[300]
                            }
                        }}
                        variant="outlined"
                        onClick={() => handleEdit(selectedEmployee)}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LeaveBalance;
