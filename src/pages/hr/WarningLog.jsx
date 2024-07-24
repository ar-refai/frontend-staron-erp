import React, { useMemo, useState, useEffect } from "react";
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
    Typography,
    useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import UserImg from "../../assets/user.jpg";
import { tokens } from "../../theme";
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json";
import { getAllWarningLogs, getAllEmployeeWarningLog, storeWarning } from "../../apis/HumanRecourse/WarningLog";

const Warning = () => {
    const [tableData, setTableData] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [warningLevel, setWarningLevel] = useState('');
    const [reason, setReason] = useState('');
    const [employeeLogs, setEmployeeLogs] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const reasons = [
        "Late Arrival",
        "Incomplete Task",
        "Unprofessional Behavior",
        "Violation of Policy"
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllWarningLogs();
                setTableData(response.data);
            } catch (err) {
                console.error('Error fetching data', err);
            }
        }
        fetchData();
    }, []);

    const handleClose = () => {
        setEditDialogOpen(false);
        setHistoryDialogOpen(false);
        setWarningLevel('');
        setReason('');
    };

    const handleEdit = (item) => {
        setSelectedEmployee(item);
        setWarningLevel(''); // Reset warning level
        setReason(''); // Reset reason
        setEditDialogOpen(true);
    };

    const handleStoreWarning = async () => {
        const warningData = {
            userid: selectedEmployee.id,
            level: warningLevel,
            date: new Date().toISOString().split('T')[0], // current date
            text: reason,
        };

        try {
            await storeWarning(warningData);
            const updatedData = await getAllWarningLogs();
            setTableData(updatedData.data);
            handleClose();
        } catch (error) {
            console.error("Error storing warning", error);
        }
    };

    const handleShowHistory = async (employee) => {
        try {
            const logs = await getAllEmployeeWarningLog(employee.id);
            setEmployeeLogs(logs.data.data);
            setSelectedEmployee(employee);
            setHistoryDialogOpen(true);
        } catch (error) {
            console.error("Error fetching employee logs", error);
        }
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
                            src={`http://api.staronegypt.com.eg/${cell.row.original.profileimage}` || UserImg}
                            alt="Employee"
                            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
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
            },
            {
                accessorKey: "latest_warning_log.level",
                header: "Warning Level",
                Cell: ({ cell }) => cell.getValue() ? `Level ${cell.getValue()}` : 'N/A',
            },
            {
                accessorKey: "latest_warning_log.date",
                header: "Date",
                Cell: ({ cell }) => cell.getValue() || 'N/A',
            },
            {
                accessorKey: "latest_warning_log.text",
                header: "Reason",
                Cell: ({ cell }) => cell.getValue() || 'N/A',
            },
            {
                accessorKey: "action",
                header: "Action",
                Cell: ({ cell }) => (
                    <Box display="flex" gap={1}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleEdit(cell.row.original)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleShowHistory(cell.row.original)}
                        >
                            Show History
                        </Button>
                    </Box>
                ),
            },
        ],
        [colors.primary, colors.blueAccent]
    );

    const historyColumns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "Log ID",
            },
            {
                accessorKey: "date",
                header: "Date",
            },
            {
                accessorKey: "level",
                header: "Level",
            },
            {
                accessorKey: "text",
                header: "Description",
            },
            {
                accessorKey: "created_date",
                header: "Created Date",
            },
        ],
        []
    );

    return (
        <>
            <MaterialReactTable
                columns={columns}
                data={tableData}
                enableColumnOrdering
                enableColumnActions={false}
                initialState =  {{ density: 'compact' }}
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

            <Dialog open={editDialogOpen} onClose={handleClose}>
                <Box
                    sx={{
                        bgcolor: colors.grey[800],
                        borderRadius: '5px'
                    }}>
                    <DialogTitle>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                            Edit Warning Level for {selectedEmployee?.name}
                        </Box>
                    </DialogTitle>
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
                            color="error"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleStoreWarning}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Dialog open={historyDialogOpen} onClose={handleClose} maxWidth="lg" fullWidth>
                <Box
                    sx={{
                        bgcolor: colors.grey[800],
                        borderRadius: '5px'
                    }}>
                    <DialogTitle>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                            Warning History for {selectedEmployee?.name}
                        </Box>
                    </DialogTitle>
                    <Divider />

                    <DialogContent>
                        <MaterialReactTable
                            columns={historyColumns}
                            data={employeeLogs}
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
                            muiTableHeadCellProps={{ sx: { backgroundColor: colors.grey[900] } }}
                            muiTableBodyCellProps={{ sx: { backgroundColor: colors.grey[800] } }}
                            muiTableBodyProps={{ sx: { backgroundColor: colors.grey[800] } }}
                            muiBottomToolbarProps={({ table }) => ({
                                sx: { backgroundColor: colors.grey[800] },
                            })}
                            mrtTheme = {(theme) => ({
                                baseBackgroundColor: colors.grey[700],
                                draggingBorderColor: theme.palette.secondary.main,
                            })}
                        />
                    </DialogContent>
                    <Divider />

                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

export default Warning;

