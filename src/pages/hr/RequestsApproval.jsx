import {
    Box,
    Typography,
    MenuItem,
    ListItemIcon,
    Button,
    Alert,
    Snackbar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Chip,
} from '@mui/material';
import React, { useMemo, useState, useEffect } from 'react';
import { useTheme, lighten } from '@mui/system';
import { tokens } from '../../theme';
import {
    MaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from 'material-react-table';
import { AccountCircle, Send } from '@mui/icons-material';
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json";
import { RejectRequest, ApproveRequest, ShowAllRequests } from 'apis/HumanRecourse/RequestsApproval';


const RequestsApproval = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, setData] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);

    const fetchData = async () => {
        const result = await ShowAllRequests();
        setData(result.data); // Assuming the API returns an object with a `data` property
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleOpenDescriptionModal = (description) => {
        setSelectedDescription(description);
        setShowDescriptionModal(true);
    };

    const handleCloseDescriptionModal = () => {
        setShowDescriptionModal(false);
    };

    const handleApprove = async (row) => {
        await ApproveRequest(row.id); // Assuming each row has an `id`
        setAlertMessage('Request Approved.');
        setShowAlert(true);
        fetchData();
    };

    const handleReject = async (row) => {
        await RejectRequest(row.id); // Assuming each row has an `id`
        setAlertMessage('Request Rejected.');
        setShowAlert(true);
        fetchData();
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'actions',
                header: 'Actions',
                size: 150,
                Cell: ({ row }) => row.original.hr_approve === 'pending' && (
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Button
                            variant="outlined"
                            onClick={() => handleApprove(row.original)}
                            sx={{
                                color: colors.greenAccent[300],
                                borderColor: colors.greenAccent[300],
                                "&:hover": {
                                    borderColor: colors.greenAccent[300]
                                }
                            }}
                        >
                            {console.log(row.original)}
                            Approve
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => handleReject(row.original)}
                            sx={{
                                color: colors.redAccent[300],
                                borderColor: colors.redAccent[300],
                                "&:hover": {
                                    borderColor: colors.redAccent[300]
                                }
                            }}
                        >
                            Reject
                        </Button>
                    </Box>
                ),
            },
            {
                accessorKey: 'user.name',
                header: 'Requester',
                size: 200,
            },
            {
                accessorKey: 'request_type',
                header: 'Request Type',
                size: 120,
            },
            {
                accessorKey: 'from_date',
                header: 'From Date',
                size: 120,
                Cell: ({ cell }) => cell.getValue() ? cell.getValue() : "__",
            },
            {
                accessorKey: 'to_date',
                header: 'To Date',
                size: 120,
                Cell: ({ cell }) => cell.getValue() ? cell.getValue() : "__",
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 120,
            },
            {
                accessorKey: 'date',
                header: 'Date',
                size: 120,
                Cell: ({ cell }) => cell.getValue() ? new Date(cell.getValue()).toISOString().slice(11, 19) : "__",
            },
            {
                accessorKey: 'from_ci',
                header: 'From Time',
                size: 120,
                Cell: ({ cell }) => cell.getValue() ? cell.getValue() : "__",
            },
            {
                accessorKey: 'to_co',
                header: 'To Time',
                size: 120,
                Cell: ({ cell }) => cell.getValue() ? cell.getValue() : "__",
            },
            {
                accessorKey: 'hr_approve',
                filterVariant: "select",
                filterSelectOptions: ['accepted', 'pending', 'rejected'],
                header: 'Status',
                size: 150,
                Cell: ({ cell }) => {
                    const status = cell.getValue();
                    const color =
                        status === 'approved'
                            ? 'success.main' // MUI 'success' color
                            : status === 'pending'
                                ? 'warning.main' // MUI 'warning' color
                                : 'error.main'; // MUI 'error' color


                    return (
                        <Chip
                            variant='outlined'
                            label={status}
                            sx={{
                                borderColor: color,
                                color: color,
                                textAlign: 'center',
                                width: '120px',
                                fontSize: '13px',
                                fontWeight: 'semiBold',
                                letterSpacing: "0.5px",
                            }}
                        />
                    );
                },
            },
        ],
        [colors],
    );

    return (
        <>
            <Snackbar
                open={showAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseAlert} variant="filled" severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>

            <Dialog
                maxWidth="lg"
                open={showDescriptionModal}
                onClose={handleCloseDescriptionModal}
                aria-labelledby="description-dialog-title"
            >
                <Box
                    sx={{
                        bgColor: `${colors.grey[800]}`,
                        boxSizing: 'border-box',
                        borderRadius: '8px'
                    }}
                >
                    <DialogTitle id="description-dialog-title">
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                            Request Description
                        </Box>
                    </DialogTitle>
                    <Divider />
                    <DialogContent sx={{ padding: "30px 80px", width: '600px' }}>
                        <DialogContentText sx={{ textAlign: 'center' }}>
                            {selectedDescription}
                        </DialogContentText>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button
                            onClick={handleCloseDescriptionModal}
                            variant='outlined'
                            sx={{
                                color: colors.redAccent[300],
                                borderColor: colors.redAccent[300],
                                "&:hover": {
                                    borderColor: colors.redAccent[300]
                                }
                            }}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Box sx={{ padding: '20px' }}>
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    enableColumnFilterModes
                    enableColumnOrdering
                    enableGrouping
                    enableColumnPinning
                    enableFacetedValues
                    initialState={{
                        showColumnFilters: true,
                        showGlobalFilter: true,
                        columnPinning: {
                            left: ['actions'], // Pin the actions column to the left
                        },
                    }}
                    muiSearchTextFieldProps={{
                        size: 'small',
                        variant: 'outlined',
                    }}
                    muiPaginationProps={{
                        color: 'secondary',
                        rowsPerPageOptions: [10, 20, 30],
                        shape: 'rounded',
                        variant: 'outlined',
                    }}
                    muiTablePaperProps={{
                        elevation: 2,
                        sx: {
                            borderRadius: '20px',
                            padding: '20px 0 0 10px',
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
            </Box>
        </>
    );
};

export default RequestsApproval;
