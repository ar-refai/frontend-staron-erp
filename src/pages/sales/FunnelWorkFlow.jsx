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
    // Status Variables
    const [tableData, setTableData] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [isAddNewLeadOpen, setIsAddNewLeadOpen] = useState(false);
    const [newLeadData, setNewLeadData] = useState({ clientName: '', location: '', description: '' });
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [descriptionData, setDescriptionData] = useState({});
    const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [clientsList, setClientsList] = useState([]);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editLeadData, setEditLeadData] = useState({
        clientName: '',
        location: '',
        description: '',
    });
    // theme settings
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    // Use Effects
    useEffect(() => {
        if (selectedRow) {
            setEditLeadData({
                clientName: selectedRow.clientName,
                location: selectedRow.location,
                description: selectedRow.description,
            });
        }
    }, [selectedRow]);

    useEffect(() => {
        fetchLeads();
        fetchClients();
    }, []);

    // assign property to value 
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditLeadData({
            ...editLeadData,
            [name]: value,
        });
    };

    // Updating Function
    const handleUpdateLead = async (id, values) => {
        console.log("#".repeat(11))
        console.log("----Values: ",values)
        const updatedData = {
            clients_id: values.clientName,
            location: values.location,
            description: values.description,
        };
        console.log("#".repeat(11))
        console.log("----updatedData: ",updatedData);
        try {
            const response = await UpdateLead(id, updatedData);
            console.log("#".repeat(11))
            console.log("----Response: ",response);
            if (response.status === 200 || response.status === 201) {
                fetchLeads(); // Refresh the table data after a successful update
                setIsEditing(false); // Close the editing modal
            }
        } catch (error) {
            console.error('Error updating lead:', error);
        }
    };

    // Upload funciton
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };


    
    // Fetching Leads
    const fetchLeads = async () => {
        const response = await ShowAllLeads();
        if (response.status === 200) {
            setTableData(response.data);
        }
    };
    // Fetching Clients
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
        {
            accessorKey: 'client.name', header: 'Client Name',
            muiTableBodyCellEditTextFieldProps: {
                select: true,
                children: clientsList.map((client) => (
                    <MenuItem key={client} value={client}>
                        {client}
                    </MenuItem>
                )),
            },
        },
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
        { accessorKey: 'status', header: 'Status' },

    ], [validationErrors]);

    const handleOpenDescriptionModal = (row) => {
        setDescriptionData(row);
        setIsDescriptionModalOpen(true);
    };

    const handleCloseDescriptionModal = () => {
        setIsDescriptionModalOpen(false);
    };


    // Update Functions 
    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        // console.log("----Values: " , values);
        setEditLeadData(
{           clientName:row.name,
            location:row.location,
            description:row.description
        }
        );
        const client = clientsList.filter((row)=> {
            // console.log("Row name: ",row.name);
            // console.log("values name: ", values["client.name"]);
            return row.name === values["client.name"]})
        console.log('-----Client:' ,client);

        const updatedData = {
            clients_id: client[0]?.id,
            location: values.location,
            description: values.description,
        };

        try {
            console.log("UpdatedData: " ,updatedData);
            const response = await UpdateLead(row.id, updatedData);
            console.log("Response: " ,response);
            if (response.status === 200 || response.status === 201) {
                fetchLeads(); // Refresh the table data after a successful update
                setIsEditing(false); // Close the editing modal
                setEditLeadData(
                    {clientName: '',
                    location: '',
                    description: '',})
            }
        } catch (error) {
            console.error('Error updating lead:', error);
        }
    };


    const handleUpload = async (row, file) => {
        try {
            // console.log(file);
            // console.log(typeof file);
    
            const formData = new FormData();
            formData.append('tasbuilt', file);
    
            const response = await RequestQuantitySurvay(row?.id, { tasbuilt: file });
            if (response.status === 200) {
                fetchLeads(); // Refresh the table data after a successful upload
                setIsFileUploadModalOpen(false);
            }
        } catch (error) {
            console.error("Failed to upload file:", error);
        }
    };
    
    // Request Quantity Survey
    const handleRequestQuantitySurvey = (row) => {
        setSelectedRow(row.original);
        
        // selectedFile
        setIsFileUploadModalOpen(true);
    };

    // Reject Functions 
    const handleRejectRow = async (row) => {
        setSelectedRow(row.original);
        setIsRejectModalOpen(true);

    };
    const handleConfirmReject = async () => {
        if (selectedRow) {
            const data = {
                reason: rejectReason,
            };
    
            try {
                const response =  await DeleteLead(selectedRow.id, JSON.stringify(data,null,2));
        
                if (response.status === 200 || response.status === 201) {
                    fetchLeads();
                    setIsRejectModalOpen(false);
                    setRejectReason('');
                } else {
                    console.error('Failed to reject lead:', response.data);
                    // Optionally, display an error message or handle it as per your application's requirements
                }
            } catch (error) {
                console.error('Error rejecting lead:', error);
                // Handle network errors or other exceptions
                // Optionally, display an error message or handle it as per your application's requirements
            }
        }
    };
    
    
    // Create Functions 
    const handleCreateNewLead = async () => {
        const newValidationErrors = validateNewLead(newLeadData);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        
        try {
            // Prepare data in the format expected by the API
            const data = {
                clients_id: newLeadData.clientName, // Assuming newLeadData.clientName is the client ID
                location: newLeadData.location,
                description: newLeadData.description,
            };
    
            // Call the API to create the lead
            const response = await CreateLead(data);
            if (response.status === 200 || response.status === 201) {
                // Update the table data or perform necessary actions
                fetchLeads(); // Refresh the table data after creating a new lead
                setNewLeadData({ clientName: '', location: '', description: '' }); // Clear fields
                setIsAddNewLeadOpen(false); // Close the modal
            } else {
                // Handle error scenarios if needed
                console.error('Failed to create lead:', response.data);
                // Optionally, display an error message or handle it as per your application's requirements
            }
        } catch (error) {
            console.error('Error creating lead:', error);
            // Handle network errors or other exceptions
            // Optionally, display an error message or handle it as per your application's requirements
        }
    };
    
    // Create Functions
    const validateNewLead = (values) => {
        const errors = {};
        if (!values.clientName) {
            errors.clientName = 'Client Name is required';
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
    state: {
        isLoading: true,
        showProgressBars: true
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
                <Divider sx={{ background: '#3e3' }} />
                {internalEditComponents}
                <Divider />
            </DialogContent>
            <DialogActions>
                <MRT_EditActionButtons variant="outlined" color="secondary" table={table} row={row} />
            </DialogActions>
        </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
        <Box
            sx={{
                bgcolor: colors.grey[800],
                borderRadius: '5px',
            }}>
            <DialogTitle variant="h3">
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                    <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                    Edit Existing Lead
                </Box>
            </DialogTitle>
            <Divider />
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <TextField
                        label="Client Name"
                        name="clientName"
                        variant="outlined"
                        value={editLeadData.clientName}
                        onChange={handleEditChange}
                        select
                    >
                        {clientsList.map((client) => (
                            <MenuItem key={client.id} value={client.id}>
                                {client.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Location"
                        name="location"
                        variant="outlined"
                        value={editLeadData.location}
                        onChange={handleEditChange}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        variant="outlined"
                        value={editLeadData.description}
                        onChange={handleEditChange}
                        multiline
                        rows={4}
                    />
                </DialogContent>
            <Divider />
            <DialogActions>
                <MRT_EditActionButtons table={table} row={row} />
            </DialogActions>
        </Box>
    ),
    renderRowActions: ({ row, table }) => (
        row.original.status === 'pending client data' && (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)} color="secondary" variant="outlined">
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Request Quantity Survay">
                    <IconButton color="secondary" variant="outlined" onClick={() => handleRequestQuantitySurvey(row)}>
                        <BallotIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Reject">
                    <IconButton color="error" variant="outlined" onClick={() => handleRejectRow(row)}>
                        <ThumbDownIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        )
    ),
    renderTopToolbarCustomActions: ({ table }) => (
        <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsAddNewLeadOpen(true)}
        >
            Add New Lead
        </Button>
    ),
    state: {
        isLoading: false,
        isSaving: false,
        showAlertBanner: false,
        showProgressBars: false,
    },
});

    return (
        <Box>
            <MaterialReactTable table={table} />

            {/* Reject Modal */}
            <Dialog open={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                            Lead Rejection
                        </Box>
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <Typography>
                        Name the reason for rejection:
                    </Typography>
                    <TextField
                        margin="normal"
                        id="rejectReason"
                        name="reason"
                        label="Reason for rejection"
                        fullWidth
                        multiline
                        rows={4}
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                    />
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick={() => setIsRejectModalOpen(false)} variant='outlined' color='error'>Cancel</Button>
                    <Button onClick={handleConfirmReject} color="secondary" variant="outlined">Reject</Button>
                </DialogActions>
            </Dialog>

            {/* Add new lead Modal */}
            <Dialog sx={{
                width: '700px',
                margin: 'auto',
            }} open={isAddNewLeadOpen} onClose={() => setIsAddNewLeadOpen(false)}>
                <Box
                    sx={{
                        bgcolor: colors.grey[800],
                        borderRadius: '5px',
                    }}
                >
                    <DialogTitle>

                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                            Add New Lead
                        </Box>

                    </DialogTitle>
                    <Divider />
                    <DialogContent
                        sx={{
                            minWidth: '500px',
                            margin: 'auto',
                        }}
                    >
                        <FormControl fullWidth variant="filled">
                            <InputLabel>Client Name</InputLabel>
                            <Select
                                name="clientName"
                                value={newLeadData.clientName}
                                onChange={handleChange}
                                color="secondary"
                            >
                                {clientsList.map((client) => (
                                    <MenuItem key={client.id} value={client.id}>
                                        {client?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Location"
                            value={newLeadData.location}
                            onChange={(e) => setNewLeadData({ ...newLeadData, location: e.target.value })}
                            error={!!validationErrors.location}
                            helperText={validationErrors.location}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            value={newLeadData.description}
                            onChange={(e) => setNewLeadData({ ...newLeadData, description: e.target.value })}
                            error={!!validationErrors.description}
                            helperText={validationErrors.description}
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button variant="outlined" color="error" onClick={() => setIsAddNewLeadOpen(false)}>Cancel</Button>
                        <Button variant="outlined" color="secondary" onClick={handleCreateNewLead}>Submit</Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Dialog open={isDescriptionModalOpen} onClose={handleCloseDescriptionModal}>
                <Box sx={{
                    bgcolor: colors.grey[800],
                    borderRadius: '5px',
                }}>

                    <DialogTitle>

                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                            Description
                        </Box>

                    </DialogTitle>
                    <Divider />
                    <DialogContent
                        sx={
                            {
                                minWidth: '500px',
                                margin: 'auto',
                            }
                        }
                    >
                        <Box>
                            <p><strong>Client Name:</strong> {descriptionData?.client?.name}</p>
                            <p><strong>Location:</strong> {descriptionData?.location}</p>
                            <p><strong>Description:</strong> {descriptionData?.description}</p>
                        </Box>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button variant='outlined' color="error" onClick={handleCloseDescriptionModal}>Close</Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Dialog
    sx={{ width: '700px', margin: 'auto' }}
    open={isFileUploadModalOpen}
    onClose={() => setIsFileUploadModalOpen(false)}
>
    <Box sx={{ bgcolor: colors.grey[800], borderRadius: '5px' }}>
        <DialogTitle>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                Request Quantity Survey:
            </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ minWidth: '500px', margin: 'auto' }}>
            <input
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
                <Button variant="outlined" color="secondary" component="span">
                    Upload File
                </Button>
                <Typography
                    sx={{ color: colors.primary[100], display: 'inline', marginLeft: '10px' }}
                >
                    Upload The Request Quantity Survey Zipped File
                </Typography>
            </label>
        </DialogContent>
        <DialogActions>
            <Divider />
            <Button
                variant='outlined'
                color="secondary"
                onClick={() => handleUpload(selectedRow, selectedFile)}
            >
                Confirm
            </Button>
            <Button
                variant='outlined'
                color="error"
                onClick={() => setIsFileUploadModalOpen(false)}
            >
                Close
            </Button>
        </DialogActions>
    </Box>
</Dialog>

        </Box>
    );
};

export default FunnelWorkFlow;