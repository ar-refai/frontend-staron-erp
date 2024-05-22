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
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [rowToDelete, setRowToDelete] = useState(null);
    const [showIncress, setShowIncress] = useState(false);
    const [selectedemployee, setselectedemployee] = useState();
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleClose = () => {
        setShowIncress(false);
    };

    const handleIncress = (item) => {
        setselectedemployee(item);
        setShowIncress(true);
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
                        variant="outlined"
                        color="warning"
                        onClick={() => handleIncress(cell.row.original)}
                    >
                        Increase
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

            <Dialog open={showIncress} onClose={handleClose}>
                <DialogTitle>Increase Warning Level for {selectedemployee?.name}</DialogTitle>
                <DialogContent>Are you sure you want to increase the warning level?</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{
                      color:colors.redAccent[200],
                      "&:hover": {
                        color:colors.redAccent[300]
                      }

                    }}>Close</Button>
                    <Button
                        color="warning"
                        onClick={() => {
                            const updatedData = tableData.map((emp) =>
                                emp.id === selectedemployee.id
                                    ? { ...emp, warning_count: emp.warning_count + 1 }
                                    : emp
                            );
                            setTableData(updatedData);
                            handleClose();
                        }}
                    >
                        Increase
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default Warning;
