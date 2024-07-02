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
    Select,
    useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import UserImg from "../../assets/user.jpg";
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

const mockData = [
    {
        id: 1,
        profileimage: "/path/to/image1.jpg",
        name: "John Doe",
        hr_code: "EMP001",
        department: "HR",
        warning_count: 2,
    },
    {
        id: 2,
        profileimage: "/path/to/image2.jpg",
        name: "Jane Smith",
        hr_code: "EMP002",
        department: "Technical Office",
        warning_count: 1,
    },
    // Add more mock data as needed
];

const Warning = () => {
    const [tableData, setTableData] = useState(mockData);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [warningLevel, setWarningLevel] = useState('');
    const [reason, setReason] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const reasons = [
        "Late Arrival",
        "Incomplete Task",
        "Unprofessional Behavior",
        "Violation of Policy"
    ];

    const handleClose = () => {
        setEditDialogOpen(false);
        setWarningLevel('');
        setReason('');
    };

    const handleEdit = (item) => {
        setSelectedEmployee(item);
        setWarningLevel(item.warning_count); // Set warning level to the selected employee's warning count
        setEditDialogOpen(true);
    };

    const filteredEmployees = () => {
        let filteredData = tableData;

        if (searchQuery) {
            filteredData = filteredData.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (departmentFilter) {
            filteredData = filteredData.filter(
                (item) => item.department === departmentFilter
            );
        }

        if (sortBy === "Warning Level Up") {
            filteredData = filteredData.sort((a, b) => a.warning_count - b.warning_count);
        } else if (sortBy === "Warning Level Down") {
            filteredData = filteredData.sort((a, b) => b.warning_count - a.warning_count);
        }

        return filteredData;
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
                accessorKey: "profileimage",
                header: "Image",
                Cell: ({ cell }) => (
                    <Link
                        to={`/employee/${cell.row.original.id}`}
                        onMouseEnter={(e) => {
                            e.target.style.color = colors.blueAccent[400];
                        }} // Change color on hover
                        onMouseLeave={(e) => e.target.style.color = colors.primary[100]} // Restore color on hover out
                    >
                        <img
                        src={UserImg}
                        alt="Employee"
                        style={{ width: "40px", borderRadius: "50%" }}
                    />
                    </Link>
                    
                ),
            },
            {
                accessorKey: "name",
                header: "Full Name",
                Cell: ({ cell }) => (
                <Box>
                    {cell.getValue()}
                </Box>
                ),
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
                accessorKey: "warning_count",
                header: "Warning Level",
                Cell: ({ cell }) => `Level ${cell.getValue()}`,
            },
            {
                accessorKey: "action",
                header: "Action",
                Cell: ({ cell }) => (
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleEdit(cell.row.original)}
                    >
                        Edit
                    </Button>
                ),
            },
        ],
        []
    );

    return (
        <>
            <MaterialReactTable
                columns={columns}
                data={filteredEmployees()}
                editingMode="modal"
                enableColumnOrdering
                enableColumnActions={false}
                muiTablePaperProps={{
                    elevation: 2,
                    sx: {
                        borderRadius: '20px',
                        padding: '20px 0 0 0',
                    },
                }}
                muiTableContainerProps={{ sx: { maxHeight: '600px', backgroundColor: colors.primary[400] } }}
                muiTableHeadCellProps={{ sx: { backgroundColor: colors.primary[400] } }}
                muiTableBodyCellProps={{ sx: { backgroundColor: colors.primary[400] } }}
                muiTableBodyProps={{ sx: { backgroundColor: colors.primary[400] } }}
                muiBottomToolbarProps={({ table }) => ({
                    sx: { backgroundColor: colors.primary[400] },
                })}
            />

            <Dialog
                open={editDialogOpen}
                onClose={handleClose}
            >
                <DialogTitle>Edit Warning Level for {selectedEmployee?.name}</DialogTitle>
                <Divider />

                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            mt: 2,
                            width: '450px',
                        }}>
                        <Select
                            value={warningLevel}
                            onChange={(e) => setWarningLevel(e.target.value)}
                            displayEmpty
                            fullWidth
                            sx={{
                                "&.Mui-focused": {
                                    borderColor: colors.blueAccent[300],
                                }
                            }}
                        >
                            <MenuItem value="" disabled>Select Warning Level</MenuItem>
                            <MenuItem value={1}>Level 1</MenuItem>
                            <MenuItem value={2}>Level 2</MenuItem>
                            <MenuItem value={3}>Level 3</MenuItem>
                            <MenuItem value={4}>Level 4</MenuItem>
                        </Select>
                        <Select
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            defaultValue=""
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem value="" disabled>Select Reason</MenuItem>
                            {reasons.map((reason) => (
                                <MenuItem key={reason} value={reason}>
                                    {reason}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                </DialogContent>
                <Divider />

                <DialogActions>
                    <Button
                    variant="outlined"
                    sx={{
                        color:colors.redAccent[300],
                        borderColor:colors.redAccent[300],
                        "&:hover": {
                            borderColor:colors.redAccent[300]
                        }
                    }}
                    onClick={handleClose}
                    
                    >
                        Close
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            color:colors.greenAccent[300],
                            borderColor:colors.greenAccent[300],
                            marginRight:'15px',
                            "&:hover": {
                                borderColor:colors.greenAccent[300]
                            }
                        }}
                        onClick={() => {
                            const updatedData = tableData.map((emp) =>
                                emp.id === selectedEmployee.id
                                    ? { ...emp, warning_count: warningLevel }
                                    : emp
                            );

                            setTableData(updatedData);
                            handleClose();
                        }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Warning;
