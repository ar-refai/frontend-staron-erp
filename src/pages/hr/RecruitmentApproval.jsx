import React, { useState, useMemo } from 'react';
import { Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from '@mui/material';
import { lighten, useTheme } from '@mui/material/styles';
import { MaterialReactTable, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton } from 'material-react-table';
import Divider from '@mui/material/Divider';
import IMAGE from "../../assets/user.jpg";
import { tokens } from '../../theme';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json"
import RecruitmentApprovalDescriptionModal from './Recruitment Approval Components/RecruitmentApprovalDescriptionModal';

// FileUploadModal Component
const FileUploadModal = ({ open, onClose, onUpload }) => {
    const [cvFile, setCvFile] = useState(null);
    const [timesheetFile, setTimesheetFile] = useState(null);
    const [error, setError] = useState('');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleCvFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setCvFile(file);
            setError('');
        } else {
            setError('Please upload a valid PDF file for the CV.');
        }
    };
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
    });

    const handleTimesheetFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
            setTimesheetFile(file);
            setError('');
        } else {
            setError('Please upload a valid Excel file for the Timesheet.');
        }
    };

    const handleUpload = () => {
        if (cvFile && timesheetFile) {
            onUpload(cvFile, timesheetFile);
            onClose();
        } else {
            setError('Please upload both files and be sure of thier types');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
        >
            <Box
            sx={{
                bgcolor:colors.grey[800],
                borderRadius:`5px`,
                
            }}
            >

            <DialogTitle>          
            <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
            <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
                Upload Files
            </Box>

            </DialogTitle>
            <Divider />
            <DialogContent
                sx={{
                    paddingBlock: "20px",
                    paddingInline: "60px"
                }}
            >
                <Box sx={{ mb: 2 }}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        color='secondary'
                        tabIndex={-1}
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                        
                        >
                        Upload The CV (PDF file)
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleCvFileChange}
                            helperText={error && cvFile == null ? error : ""}
                        />

                    </Button>

                </Box>
                <Box>
                    <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        color='secondary'
                        tabIndex={-1}
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            color:colors.greenAccent[500]
                        }}
                    >
                        Upload The Time Sheet (Excel file)
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleTimesheetFileChange}
                        />
                    </Button>
                </Box>
                {error && <Alert sx={{
                    mt: 2
                }} variant='outlined' severity="error">{error}</Alert>}

            </DialogContent>
            <Divider />

            <DialogActions>
                <Button variant='outlined' color='error' onClick={onClose}>Cancel</Button>
                <Button variant='outlined' color='secondary' onClick={handleUpload}>Upload</Button>
            </DialogActions>
            </Box>
        </Dialog>
    );
};

// RequestsApproval Component
const RequestsApproval = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState([
        {
            id: 1,
            name: 'John Doe',
            title: 'Software Engineer',
            date: new Date(),
            requesterName: 'Jane Smith',
            requesterImage: IMAGE,
            status: 'Pending',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        // Add more dummy data as needed
    ]);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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

    const handleOpenUploadModal = () => {
        setShowUploadModal(true);
    };

    const handleCloseUploadModal = () => {
        setShowUploadModal(false);
    };

    const handleUploadFiles = (cvFile, timesheetFile) => {
        // Perform the file upload action here
        // console.log('Uploaded CV:', cvFile);
        // console.log('Uploaded Timesheet:', timesheetFile);

        // Update the status of selected requests to 'Admin Pending'
        const updatedData = data.map((row) => {
            if (selectedRows.some((selectedRow) => selectedRow.original.id === row.id)) {
                return { ...row, status: 'Admin Pending' };
            }
            return row;
        });

        setData(updatedData);
        setAlertMessage('Request(s) Approved and files uploaded.');
        setShowAlert(true);
    };

    const handleApprove = (table) => {
        // Open the upload modal for file uploads
        setSelectedRows(table.getSelectedRowModel().flatRows);
        handleOpenUploadModal();
    };

    const handleReject = (table) => {
        // Get the selected rows from the table
        const selectedRows = table.getSelectedRowModel().flatRows;

        // Update the status of selected requests to 'Rejected' in your data
        const updatedData = data.map((row) => {
            if (selectedRows.some((selectedRow) => selectedRow.original.id === row.id)) {
                return { ...row, status: 'Rejected' };
            }
            return row;
        });

        setData(updatedData);
        setAlertMessage('Request(s) Rejected.');
        setShowAlert(true);

        // Reset row selection after updating
        table.resetRowSelection();
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
                            height={40}
                            width={40}
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
                                : status === 'Admin Pending'
                                    ? 'blue'
                                    : 'red';
                    return (
                        <Chip label= {status} 
                        sx=
                        {{
                            borderColor:color,
                            color: color,
                            p: '0.25rem',
                            textAlign: 'center',
                            fontSize: '14px',
                        }} 
                        variant="outlined"
                        
                        />
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

    return (
        <>
            <Snackbar
                open={showAlert}
                autoHideDuration={5000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseAlert} variant="filled" severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>

            <RecruitmentApprovalDescriptionModal
            showDescriptionModal = {showDescriptionModal} 
            handleCloseDescriptionModal = {handleCloseDescriptionModal}
            selectedDescription = {selectedDescription}
            />
        
            <FileUploadModal
                open={showUploadModal}
                onClose={handleCloseUploadModal}
                onUpload={handleUploadFiles}
            />

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
                    muiBottomToolbarProps={({ table }) => ({
                        sx: { backgroundColor: colors.primary[400] },
                    })}
                
                        muiTableContainerProps= {{ sx: { maxHeight: '600px', backgroundColor: colors.primary[400], overflowX: 'auto' } }}
                        muiTableHeadCellProps= {{ sx: { backgroundColor: colors.primary[400] } }}
                        muiTableBodyCellProps= {{ sx: { backgroundColor: colors.primary[400] } }}
                        muiTableBodyProps= {{ sx: { backgroundColor: colors.primary[400] } }}
                        muiTablePaperProps={{
                        elevation: 2,
                        sx: {
                            borderRadius: '20px',
                            padding: '10px 0 0 0',
                        },
                    }}

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
                        rowsPerPageOptions: [10, 20, 30, 40, 50],
                        shape: 'rounded',
                        variant: 'outlined',
                    }}
                    renderTopToolbarCustomActions={({ table }) => (
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
                                        variant="outlined"
                                        color="secondary"
                                        disabled={Object.keys(table.getState().rowSelection).length === 0}
                                        onClick={() => handleApprove(table)}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        disabled={Object.keys(table.getState().rowSelection).length === 0}
                                        onClick={() => handleReject(table)}
                                    >
                                        Reject
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                />
            </Box>
        </>
    );
};

export default RequestsApproval;

