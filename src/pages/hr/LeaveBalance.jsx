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
    makeStyles,
    Modal,
    Slide,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import UserImg from "../../assets/user.jpg";
import { increaseRequest, decreaseRequest, showEmployeeHistoryLog } from "../../apis/HumanRecourse/LeaveBalance";
import { showEmployee, ShowAllEmployee } from "../../apis/HumanRecourse/Employee";
import { tokens } from "../../theme";
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json";

// const useStyles = makeStyles(() => ({
//     paper: { minWidth: "900px" },
//   }));

const LeaveBalance = () => {
    const [tableData, setTableData] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [showLog, setShowLog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editDays, setEditDays] = useState(0);
    const [employeeDetails, setEmployeeDetails] = useState({});
    const [employeeLogs, setEmployeeLogs] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ShowAllEmployee();
                setTableData(response.data);
            } catch (err) {
                console.error('Error Fetching Data', err);
            }
        }
        fetchData();
    }, []);

    const handleEdit = async (employee) => {
        const request = {
            userid: employee.id,
            count: Math.abs(editDays),
            requestname: "Vacation balance",
            text: "Requesting additional vacation days.",
            type: editDays > 0 ? "incress" : "decress",
            file: null,
        };

        try {
            if (editDays > 0) {
                await increaseRequest(request);
            } else {
                await decreaseRequest(request);
            }

            const updatedData = await ShowAllEmployee();
            setTableData(updatedData.data);
            setShowEdit(false);
        } catch (error) {
            console.error("Error updating leave balance", error);
        }
    };

    const handleShowLog = async (employee) => {
        // console.log(employee)
        try {
            const logs = await showEmployeeHistoryLog(employee.id);
            // console.log(logs)
            setEmployeeLogs(logs.data);
            setSelectedEmployee(employee);
            setShowLog(true);
        } catch (error) {
            console.error("Error fetching employee logs", error);
        }
    };

    const handleClose = () => {
        setShowEdit(false);
        setShowLog(false);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "hr_code",
                header: "Employee ID",
            },
            {
                accessorKey: "profileimage",
                header: "Image",
                Cell: ({ cell }) => (
                    <img
                        src={`https://erpsystem.darakoutlet.com/${cell.row.original.profileimage}` || UserImg}
                        alt="Employee"
                        style={{ width: "50px", height:"50px", borderRadius: "50%" }}
                    />
                ),
            },
            {
                accessorKey: "name",
                header: "Full Name",
                size: 140,
            },
            {
                accessorKey: "department",
                header: "Department",
            },
            {
                accessorKey: "VacationBalance",
                header: "Vacation Balance",
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
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleShowLog(cell.row.original)}
                        >
                            Show History
                        </Button>
                    </Box>
                ),
            },
        ],
        []
    );

    const logColumns = useMemo(
        () => [
            {
                accessorKey: "date",
                header: "Date",
            },
            {
                accessorKey: "text",
                header: "Description",
            },
            {
                accessorKey: "count",
                header: "Days",
            },
            {
                accessorKey: "type",
                header: "Type",
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
    const innerTableStyles = {
        muiBottomToolbarProps: {
            sx: { backgroundColor: colors.grey[800] }
        },
        muiTableContainerProps: {
            sx: {
                maxHeight: '600px',
                backgroundColor: colors.grey[800],
                overflowX: 'auto'
            }
        },
        muiTableHeadCellProps: {
            sx: { backgroundColor: colors.grey[800] }
        },
        muiTableBodyCellProps: {
            sx: { backgroundColor: colors.grey[800] }
        },
        muiPaginationProps: {
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30],
            shape: 'rounded',
            variant: 'outlined',
        },
        muiTableBodyProps: {
            sx: { backgroundColor: colors.grey[800] }
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
                enableColumnOrdering
                enableColumnActions={false}
                muiBottomToolbarProps={tableStyles.muiBottomToolbarProps}
                muiTableContainerProps={tableStyles.muiTableContainerProps}
                muiTableHeadCellProps={tableStyles.muiTableHeadCellProps}
                muiTableBodyCellProps={tableStyles.muiTableBodyCellProps}
                muiTableBodyProps={tableStyles.muiTableBodyProps}
                muiTablePaperProps={tableStyles.muiTablePaperProps}
                enableStickyHeader
                enableStickyFooter
                muiPaginationProps={{
                    color: 'secondary',
                    rowsPerPageOptions: [10, 20, 30],
                    shape: 'rounded',
                    variant: 'outlined',
                }}
                paginationDisplayMode='pages'
                
            />

            <Dialog 
            fullWidth            
            open={showEdit} 
            onClose={handleClose}
            // TransitionComponent={Transition}
            >
                <Box
                    sx={{
                        borderRadius: `5px`,
                        bgcolor: colors.grey[800],
                        //  minWidth:'700px !important'
                    }}
                >
                    <DialogTitle>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                            Edit Leave Balance for {selectedEmployee?.name}
                        </Box>
                    </DialogTitle>
                    <Divider />

                    <DialogContent  sx={{ color: colors.grey[200], paddingBlock: '20px' }}>
                        <Typography>
                            Positive Numbers for Increasing / Negative Numbers For Decreasing
                        </Typography>
                        <TextField
                            type="number"
                            label="Days to add/subtract"
                            value={editDays}
                            onChange={(e) => setEditDays(!e.target.value ? null : Number(e.target.value))}
                            fullWidth
                            sx={{
                                marginTop: '20px',
                            }}
                        />
                        {selectedEmployee && (
                            <Box sx={{ marginTop: '20px' }}>
                                <Typography variant="subtitle1">Employee Details:</Typography>
                                <Typography variant="body2">Name: {selectedEmployee.name}</Typography>
                                <Typography variant="body2">Department: {selectedEmployee.department}</Typography>
                                <Typography variant="body2">Email: {selectedEmployee.email}</Typography>
                            </Box>
                        )}
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
                            onClick={() => handleEdit(selectedEmployee)}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Modal sx={{height:'100%', maxWidth:"900px" , mx:'auto', mt:2}} open={showLog} onClose={handleClose}>
                <Box
                    sx={{
                        borderRadius: `5px`,
                        bgcolor: colors.grey[800]
                    }}
                >
                    <DialogTitle>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                            Vacation History for {selectedEmployee?.name}
                        </Box>
                    </DialogTitle>
                    <Divider />

                    <DialogContent sx={{ maxWidth:"900px", color: colors.grey[200], paddingBlock: '20px' }}>
                        <MaterialReactTable
                            columns={logColumns}
                            data={employeeLogs}
                            enableColumnOrdering
                            enableColumnActions={false}
                            muiBottomToolbarProps={innerTableStyles.muiBottomToolbarProps}
                            muiTableContainerProps={innerTableStyles.muiTableContainerProps}
                            muiTableHeadCellProps={innerTableStyles.muiTableHeadCellProps}
                            muiTableBodyCellProps={innerTableStyles.muiTableBodyCellProps}
                            muiTableBodyProps={innerTableStyles.muiTableBodyProps}
                            muiTablePaperProps={innerTableStyles.muiTablePaperProps}
                            enableStickyHeader
                            enableStickyFooter
                            muiPaginationProps={{
                                color: 'secondary',
                                rowsPerPageOptions: [10, 20, 30],
                                shape: 'rounded',
                                variant: 'outlined',
                            }}
                            mrtTheme = {(theme) => ({
                                baseBackgroundColor: colors.grey[700],
                                draggingBorderColor: theme.palette.secondary.main,
                            })}
                        
                            
                            paginationDisplayMode='pages'
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
            </Modal>
        </>
    );
};

export default LeaveBalance;
