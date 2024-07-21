import React, { useState, useMemo, useEffect } from 'react';
import {
    MaterialReactTable,
    MRT_EditActionButtons,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography,
    useTheme,
    Chip
} from '@mui/material';
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json"

import EditIcon from '@mui/icons-material/Edit';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BallotIcon from '@mui/icons-material/Ballot';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { tokens } from 'theme';
import { ShowAllLeads, CreateLead, DeleteLead, RequestQuantitySurvay, UpdateLead } from 'apis/SalesApi/crm';
import { showAllClients } from 'apis/SalesApi/Clint';

const statusList = [
    'pending client data', 'pending qs', 'qs in progress', 'out of scope', 'missing info',
    'pending drafting', 'drafting in progress', 'drafting recalculation',
    'pending admin approve', 'admin approved', 'pending client data', 'client recalculation',
    'pending contract', 'pending variation'
];

const FunnelWorkFlow = () => {
    const [tableData, setTableData] = useState([]);
    const [clientsList, setClientsList] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [isAddNewLeadOpen, setIsAddNewLeadOpen] = useState(false);
    const [newLeadData, setNewLeadData] = useState({ clients_id: '', location: '', description: '' });
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [descriptionData, setDescriptionData] = useState({});
    const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const loggedInUserRole = 'admin'; // example role, change as needed

    useEffect(() => {
        fetchLeads();
        fetchClients();
    }, []);

    const fetchLeads = async () => {
        const response = await ShowAllLeads();
        if (response.status === 200) {
            setTableData(response.data);
        }
    };

    const fetchClients = async () => {
        const response = await showAllClients();
        if (response.status === 200) {
            setClientsList(response.data);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLeadData({
            ...newLeadData,
            [name]: value,
        });
    };

    const columns = useMemo(() => [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'client.name', header: 'Client Name' },
        { accessorKey: 'location', header: 'Location' },
        {
            accessorKey: 'description',
            header: 'Description',
            Cell: ({ row }) => (
                <Button variant="outlined" color='secondary' onClick={() => handleOpenDescriptionModal(row.original)}>
                    View Description
                </Button>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            Cell: ({ cell }) => (
                <Chip label={cell.getValue()} color="primary" />
            )
        },
    ], []);

    const handleOpenDescriptionModal = (row) => {
        setDescriptionData(row);
        setIsDescriptionModalOpen(true);
    };

    const handleCloseDescriptionModal = () => {
        setIsDescriptionModalOpen(false);
    };

    const getClientNameById = (id) => {
        const client = clientsList.find(client => client.id === id);
        return client ? client.name : '';
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        try {
            if (!Object.keys(validationErrors).length) {
                await UpdateLead(row.original.id, values);
                tableData[row.index] = values;
                setTableData([...tableData]);
                exitEditingMode();
            }
        } catch (error) {
            console.error("Failed to save row edits:", error);
        }
    };

    const handleRequestQuantitySurvey = async (row) => {
        setSelectedRow(row.original);
        setIsFileUploadModalOpen(true);
    };

    const handleRejectRow = async (row) => {
        setSelectedRow(row.original);
        setIsRejectModalOpen(true);
    };

    const handleConfirmReject = async () => {
        if (selectedRow) {
            await DeleteLead(selectedRow.id, { reason: rejectReason });
            const updatedTableData = tableData.filter((item) => item.id !== selectedRow.id);
            setTableData(updatedTableData);
            setIsRejectModalOpen(false);
            setRejectReason('');
        }
    };

    const handleCreateNewLead = async () => {
        const newValidationErrors = validateNewLead(newLeadData);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        const response = await CreateLead(newLeadData);
        if (response.status === 200 || response.status === 201) {
            setTableData([...tableData, response.data]);
            setNewLeadData({ clients_id: '', location: '', description: '' });
            setIsAddNewLeadOpen(false);
        }
    };

    const validateNewLead = (values) => {
        const errors = {};
        if (!values.clients_id) {
            errors.clients_id = 'Client Name is required';
        }
        if (!values.location) {
            errors.location = 'Location is required';
        }
        if (!values.description) {
            errors.description = 'Description is required';
        }
        return errors;
    };

    const table = useMaterialReactTable({
        columns,
        data: tableData,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableEditing: true,
        state:{
            isLoading: false,
            showProgressBars: false
          },
        enableFacetedValues: true,
        enableStickyHeader: true,
        onEditingRowSave: handleSaveRowEdits,
        columnFilterDisplayMode: 'popover',
        muiSkeletonProps: {
        animation: 'wave',
        },
        muiLinearProgressProps: {
        color: 'secondary',
        },
        muiCircularProgressProps: {
        color: 'secondary',
        },
        initialState: {
        showColumnFilters: true,
        showGlobalFilter: true,
        },
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        muiSearchTextFieldProps: {
        size: 'small',
        variant: 'outlined',
        },
        muiPaginationProps: {
        color: 'secondary',
        rowsPerPageOptions: [10, 20, 30],
        shape: 'rounded',
        variant: 'outlined',
        },
        muiTablePaperProps: {
        elevation: 2, //change the mui box shadow
        //customize paper styles
        sx: {
            borderRadius: '20px',
        }
        },
        muiTableContainerProps: { sx: { maxHeight: '600px', backgroundColor: colors.primary[400] } },
        muiTableHeadCellProps: { sx: { backgroundColor: colors.primary[400] } },
        muiTableBodyCellProps: { sx: { backgroundColor: colors.primary[400] } },
        muiTableBodyProps: { sx: { backgroundColor: colors.primary[400] } },

        getRowId: (row) => String(row.id),
        
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateNewLead,
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Create New Lead</DialogTitle>
                
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <Divider sx={{background:'#3e3'}}/>
                    {internalEditComponents}
                <Divider/>
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="outlined" color="secondary" table={table} row={row} />
                </DialogActions>
            </>
        ),
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Edit Lead</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {internalEditComponents}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons table={table} row={row} />
                </DialogActions>
            </>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                color="secondary"
                onClick={() => setIsAddNewLeadOpen(true)}
                variant="contained"
                sx={{ background: colors.greenAccent[400], color: colors.primary[900], ":hover": { background: colors.greenAccent[600] } }}
            >
                Add New Lead
            </Button>
        ),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip arrow placement="left" title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Reject Lead">
                    <IconButton color="error" onClick={() => handleRejectRow(row)}>
                        <ThumbDownIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Request Quantity Survey">
                    <IconButton color="secondary" onClick={() => handleRequestQuantitySurvey(row)}>
                        <BallotIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
    });

    return (
        <>
            <MaterialReactTable table={table} />

            {/* Add New Lead Modal */}
            <Dialog open={isAddNewLeadOpen} onClose={() => setIsAddNewLeadOpen(false)}>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal" error={!!validationErrors.clients_id}>
                        <InputLabel id="clients-id-label">Client Name</InputLabel>
                        <Select
                            labelId="clients-id-label"
                            id="clients_id"
                            name="clients_id"
                            value={newLeadData.clients_id}
                            onChange={handleChange}
                            label="Client Name"
                        >
                            {clientsList.map((client) => (
                                <MenuItem key={client.id} value={client.id}>
                                    {client.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {validationErrors.clients_id && <Typography color="error">{validationErrors.clients_id}</Typography>}
                    </FormControl>
                    <TextField
                        margin="normal"
                        id="location"
                        name="location"
                        label="Location"
                        fullWidth
                        value={newLeadData.location}
                        onChange={handleChange}
                        error={!!validationErrors.location}
                        helperText={validationErrors.location}
                    />
                    <TextField
                        margin="normal"
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={newLeadData.description}
                        onChange={handleChange}
                        error={!!validationErrors.description}
                        helperText={validationErrors.description}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddNewLeadOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateNewLead} color="secondary" variant="contained">Add</Button>
                </DialogActions>
            </Dialog>

            {/* Description Modal */}
            <Dialog open={isDescriptionModalOpen} onClose={handleCloseDescriptionModal}>
                <DialogTitle>Lead Description</DialogTitle>
                <DialogContent>
                    <Typography>{descriptionData.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDescriptionModal}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Reject Modal */}
            <Dialog open={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)}>
                <DialogTitle>Reject Lead</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        id="rejectReason"
                        name="rejectReason"
                        label="Reason for rejection"
                        fullWidth
                        multiline
                        rows={4}
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsRejectModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirmReject} color="secondary" variant="contained">Reject</Button>
                </DialogActions>
            </Dialog>

            {/* File Upload Modal */}
            <Dialog open={isFileUploadModalOpen} onClose={() => setIsFileUploadModalOpen(false)}>
                <DialogTitle>Request Quantity Survey</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Lottie animationData={Document} loop={true} style={{ height: 250 }} />
                        <Typography>Upload a file to request quantity survey for <strong>{getClientNameById(selectedRow?.client_id)}</strong></Typography>
                        <Button variant="contained" component="label" sx={{ mt: 2 }}>
                            Upload File
                            <input type="file" hidden />
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsFileUploadModalOpen(false)}>Cancel</Button>
                    <Button color="secondary" variant="contained">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FunnelWorkFlow;
