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
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useTheme, lighten } from '@mui/system';
import { tokens } from '../../theme';
import {
    MaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from 'material-react-table';
import { AccountCircle, Send } from '@mui/icons-material';
import { data as initialData } from './makeDataApprovals';
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json"




const RequestsApproval = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [data, setData] = useState(initialData);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);

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

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Request Name',
                size: 150,
            },
            {
                accessorKey: 'title',
                header: 'Request Title',
                size: 200,
            },
            {
                accessorKey: 'date',
                header: 'Date of Request',
                size: 150,
                Cell: ({ cell }) => new Date(cell.getValue()).toISOString().slice(0, 10),
            },
            {
                accessorFn: (row) => `${row.requesterName}`,
                id: 'requester',
                header: 'Requester',
                size: 150,
                Cell: ({ renderedCellValue, row }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                            alt="requester"
                            height={30}
                            src={row.original.requesterImage}
                            loading="lazy"
                            style={{ borderRadius: '50%' }}
                        />
                        <span>{renderedCellValue}</span>
                    </Box>
                ),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 100,
                Cell: ({ cell }) => {
                    const status = cell.getValue();
                    const color =
                        status === 'Accepted'
                            ? 'green'
                            : status === 'Pending'
                                ? 'orange'
                                : 'red';
                    return (
                        <Box
                            component="span"
                            sx={{
                                backgroundColor: color,
                                borderRadius: '0.25rem',
                                color: '#fff',
                                maxWidth: '9ch',
                                p: '0.25rem',
                                textAlign: 'center',
                            }}
                        >
                            {status}
                        </Box>
                    );
                },
            },
            {
                accessorKey: 'description',
                header: 'Description',
                Cell: ({ cell }) => (
                    <Button
                        variant="outlined"
                        sx={{
                            color:colors.greenAccent[300],
                            borderColor:colors.greenAccent[300],
                            "&:hover": {
                                borderColor:colors.greenAccent[300]
                            }
                        }}
                        onClick={() => handleOpenDescriptionModal(cell.getValue())}
                    >
                        View Description
                    </Button>
                ),
            },
        ],
        []
    );

    const handleApprove = () => {
        const updatedData = data.map((row) => {
            if (row.selected) {
                return { ...row, status: 'Accepted' };
            }
            return row;
        });
        setData(updatedData);
        setAlertMessage('Request Accepted.');
        setShowAlert(true);
    };

    const handleReject = () => {
        const updatedData = data.map((row) => {
            if (row.selected) {
                return { ...row, status: 'Rejected' };
            }
            return row;
        });
        setData(updatedData);
        setAlertMessage('Request Rejected.');
        setShowAlert(true);
    };

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
                    boxSizing:'border-box',
                    borderRadius:'8px'
                }}
                >

                <DialogTitle id="description-dialog-title">
            
                <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
                <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
                    Request Description
                </Box>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ padding: "30px 80px", width:'600px' }}>
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
                        color:colors.redAccent[300],
                        borderColor:colors.redAccent[300],
                        "&:hover": {
                            borderColor:colors.redAccent[300]
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
                    enableRowSelection
                    initialState={{
                        showColumnFilters: true,
                        showGlobalFilter: true,
                        columnPinning: {
                            left: ['mrt-row-expand', 'mrt-row-select'],
                            right: ['mrt-row-actions'],
                        },
                    }}
                    muiSelectCheckboxProps={({ row }) => ({
                        sx: {
                            color: colors.greenAccent[400],
                            '&.Mui-checked': {
                                color: colors.greenAccent[400],
                            },
                        },
                    })}
                    paginationDisplayMode="pages"
                    positionToolbarAlertBanner="bottom"
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
                    renderRowActionMenuItems={({ closeMenu }) => [
                        <MenuItem
                            key={0}
                            onClick={() => {
                                // View details logic...
                                closeMenu();
                            }}
                            sx={{ m: 0 }}
                        >
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            View Details
                        </MenuItem>,
                        <MenuItem
                            key={1}
                            onClick={() => {
                                // Send notification logic...
                                closeMenu();
                            }}
                            sx={{ m: 0 }}
                        >
                            <ListItemIcon>
                                <Send />
                            </ListItemIcon>
                            Send Notification
                        </MenuItem>,
                    ]}
                    renderTopToolbar={({ table }) => {
                        return (
                            <Box
                                sx={{
                                    backgroundColor: lighten(theme.palette.background.default, 0.05),
                                    display: 'flex',
                                    gap: '0.5rem',
                                    p: '8px',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <MRT_GlobalFilterTextField table={table} />
                                    <MRT_ToggleFiltersButton table={table} />
                                </Box>
                                <Box>
                                    <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                                        <Button
                                            color="success"
                                            disabled={!table.getIsSomeRowsSelected()}
                                            onClick={handleApprove}
                                            variant="outlined"
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            color="error"
                                            disabled={!table.getIsSomeRowsSelected()}
                                            onClick={handleReject}
                                            variant="outlined"
                                        >
                                            Reject
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    }}
                />
            </Box>
        </>
    );
};

export default RequestsApproval;
