import React, { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
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
    const [showIncrease, setShowIncrease] = useState(false);
    const [showDecrease, setShowDecrease] = useState(false); // State for showing decrease modal
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleIncrease = (employee) => {
        const updatedData = tableData.map((item) => {
            if (item.id === employee.id) {
                return { ...item, VacationBalance: item.VacationBalance + 1 };
            }
            return item;
        });
        setTableData(updatedData);
        setShowIncrease(false);
    };

    const handleDecrease = (employee) => {
        const updatedData = tableData.map((item) => {
            if (item.id === employee.id) {
                return { ...item, VacationBalance: Math.max(0, item.VacationBalance - 1) };
            }
            return item;
        });
        setTableData(updatedData);
        setShowDecrease(false);
    };

    const handleClose = () => {
        setShowIncrease(false);
        setShowDecrease(false);
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
                            color="warning"
                            onClick={() => {
                                setSelectedEmployee(cell.row.original);
                                setShowDecrease(true);
                            }}
                        >
                            Decrease
                        </Button>
                        <Button
                            variant="outlined"
                            color="warning"
                            onClick={() => {
                                setSelectedEmployee(cell.row.original);
                                setShowIncrease(true);
                            }}
                        >
                            Increase
                        </Button>
                    </Box>
                ),
            },
        ],
        []
    );

    return (
        <>
            <MaterialReactTable
                columns={columns}
                data={tableData}
                editingMode="modal"
                enableColumnOrdering
                enableColumnActions={false}
            />

            <Dialog open={showIncrease} onClose={handleClose}>
                <DialogTitle>Increase Leave Balance for {selectedEmployee?.name}</DialogTitle>
                <DialogContent sx={{ color: colors.grey[200] }}>Are you sure you want to increase the leave balance?</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: colors.redAccent[200], "&:hover": { color: colors.redAccent[300] } }}>Close</Button>
                    <Button
                        color="warning"
                        onClick={() => {
                            handleIncrease(selectedEmployee);
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={showDecrease} onClose={handleClose}>
                <DialogTitle>Decrease Leave Balance for {selectedEmployee?.name}</DialogTitle>
                <DialogContent sx={{ color: colors.grey[200] }}>Are you sure you want to decrease the leave balance?</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: colors.redAccent[200], "&:hover": { color: colors.redAccent[300] } }}>Close</Button>
                    <Button
                        color="warning"
                        onClick={() => {
                            handleDecrease(selectedEmployee);
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LeaveBalance;
