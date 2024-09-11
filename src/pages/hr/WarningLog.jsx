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
import WarningEditDialog from "./WarningLog Components/WarningEditDialog";
import WarningHistoryDialog from "./WarningLog Components/WarningHistoryDialog";

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
                            src={`https://erpsystem.darakoutlet.com/${cell.row.original.profileimage}` || UserImg}
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
                        {/* <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleEdit(cell.row.original)}
                        >
                            Edit
                        </Button> */}
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

            <WarningEditDialog 
            editDialogOpen = {editDialogOpen}
            handleClose = {handleClose} 
            selectedEmployee = {selectedEmployee}
            warningLevel = {warningLevel}
            setWarningLevel = {setWarningLevel}
            reason = {reason}
            setReason = {setReason}
            reasons = {reasons}
            handleStoreWarning = {handleStoreWarning}
            />

            <WarningHistoryDialog
            historyDialogOpen = {historyDialogOpen} 
            handleClose = {handleClose}
            selectedEmployee = {selectedEmployee} 
            historyColumns = {historyColumns}
            employeeLogs = {employeeLogs}
            />

        </>
    );
};

export default Warning;

