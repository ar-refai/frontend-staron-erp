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
    Select,
    TextField,
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
                    <img
                        src={UserImg}
                        alt="Employee"
                        style={{ width: "40px", borderRadius: "50%" }}
                    />
                ),
            },
            {
                accessorKey: "name",
                header: "Full Name",
                Cell: ({ cell }) => (
                  <Link 
                  style={{
                      color: colors.primary[100],
                      transition: 'color 0.3s ease', // Smooth transition
                      fontSize: "14px",
                      textDecoration:'none',
                      borderBottom: `1px solid ${colors.primary[100]}`,
                      padding: '2px',
                      borderBottomColor : colors.blueAccent[400]
                  }} 
                  to={`/employee/${cell.row.original.id}`}
                  onMouseEnter={(e) => {
                    e.target.style.color = colors.blueAccent[400];
                  }} // Change color on hover
                  onMouseLeave={(e) => e.target.style.color = colors.primary[100]} // Restore color on hover out
              >
                {cell.getValue()}
              </Link>
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
                    
                        sx={{
                            borderColor:colors.blueAccent[200],
                            color:colors.blueAccent[200],
                            "&:hover": {
                                borderColor:colors.blueAccent[400],
                                color:colors.blueAccent[400]
                            }
                        }}
                        variant="outlined"
                        color="primary"
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
            />

            <Dialog
                open={editDialogOpen}
                onClose={handleClose}
            >
                <DialogTitle>Edit Warning Level for {selectedEmployee?.name}</DialogTitle>
                <DialogContent>
                    <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 2, 
                        mt: 2 ,
                        width:'300px',
                        }}>
                        <Select
                            value={warningLevel}
                            onChange={(e) => setWarningLevel(e.target.value)}
                            displayEmpty
                            fullWidth
                            sx={{
                                "&.Mui-focused": {
                                    borderColor:colors.blueAccent[300],
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
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: colors.redAccent[800],
                            backgroundColor:colors.redAccent[300],
                            
                            "&:hover": {
                                color: colors.redAccent[700],
                                backgroundColor:colors.redAccent[200],

                            }
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            const updatedData = tableData.map((emp) =>
                                emp.id === selectedEmployee.id
                                    ? { ...emp, warning_count: warningLevel }
                                    : emp
                            );
                            
                            setTableData(updatedData);
                            handleClose();
                        }}
                        sx={{
                            color: colors.blueAccent[800],
                            backgroundColor:colors.blueAccent[300],
                            
                            "&:hover": {
                                color: colors.blueAccent[700],
                                backgroundColor:colors.blueAccent[200],
                            }
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
