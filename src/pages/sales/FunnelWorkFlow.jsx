import React, { useState, useMemo } from 'react';
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
import { fakeData, clientsList } from './makeData';
import { tokens } from 'theme';

const statusList = [
    'pending client data', 'pending qs', 'qs in progress', 'out of scope', 'missing info',
    'pending drafting', 'drafting in progress', 'drafting recalculation',
    'pending admin approve', 'admin approved', 'pending client approve', 'client recalculation',
    'pending contract', 'pending variation'
];

const FunnelWorkFlow = () => {
    const [tableData, setTableData] = useState(fakeData);
    const [validationErrors, setValidationErrors] = useState({});
    const [isAddNewLeadOpen, setIsAddNewLeadOpen] = useState(false);
    const [newLeadData, setNewLeadData] = useState({ clientName: '', location: '', description: '' });
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [descriptionData, setDescriptionData] = useState({});
    const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const loggedInUserRole = 'admin'; // example role, change as needed

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLeadData({
            ...newLeadData,
            [name]: value,
        });
    };
      
    const columns = useMemo(() => [
        { accessorKey: 'name', header: 'Name' ,
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
    
    const getClientNameById = (id) => {
        const client = clientsList.find(client => client.id === id);
        return client ? client.name : '';
    };
    
    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        try {
            if (!Object.keys(validationErrors).length) {
                tableData[row.index] = values;
                setTableData([...tableData]);
                exitEditingMode();
            }
        } catch (error) {
            console.error("Failed to save row edits:", error);
        }
    };

    const handleRequestQuantitySurvey = (row) => {
        setSelectedRow(row.original);
        setIsFileUploadModalOpen(true);
    };

    const handleRejectRow = (row) => {
        const updatedTableData = tableData.filter((item) => item.id !== row.original.id);
        setTableData(updatedTableData);
    
    };

    const handleCreateNewLead = () => {
        const newValidationErrors = validateNewLead(newLeadData);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        setTableData([...tableData, { ...newLeadData, status: 'pending client data' }]);
        setNewLeadData({ clientName: '', location: '', description: '' }); // Clear fields
        setIsAddNewLeadOpen(false);
    };

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
        state:{
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
            <Box
            sx={{
                bgcolor:colors.grey[800],
                borderRadius:'5px',
            }}>
                <DialogTitle variant="h3">
                <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
                <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
                                    Edit Dialog
                </Box>
                </DialogTitle>
                <Divider/>
                <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
                >
                {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <MRT_EditActionButtons   table={table} row={row} />
                </DialogActions>
            </Box>
            ),
        
            renderRowActions: ({ row, table }) => (
                row.original.status === 'pending client approve' && (
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
                
                <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
                <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
                                    Add New Lead
                </Box>

                </DialogTitle>
                <Divider/>
                <DialogContent
                sx={{
                    minWidth:'500px',
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
                {client.name}
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
                <Divider/>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={() => setIsAddNewLeadOpen(false)}>Cancel</Button>
                    <Button variant="outlined" color="secondary" onClick={handleCreateNewLead}>Submit</Button>
                </DialogActions>
                </Box>
            </Dialog>

            <Dialog  open={isDescriptionModalOpen} onClose={handleCloseDescriptionModal}>
                <Box sx={{
                    bgcolor: colors.grey[800],
                    borderRadius: '5px',
                }}>

                <DialogTitle>
              
<Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
  <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
                    Description
</Box>

                </DialogTitle>
                <Divider/>
                <DialogContent 
                sx={
                    {
                minWidth:'500px',
                margin: 'auto',}
                }
                >
                    <Box>
                        <p><strong>Client Name:</strong> {getClientNameById(descriptionData.clientName)}</p>
                        <p><strong>Location:</strong> {descriptionData.location}</p>
                        <p><strong>Description:</strong> {descriptionData.description}</p>
                    </Box>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button variant='outlined' color="error" onClick={handleCloseDescriptionModal}>Close</Button>
                </DialogActions>
                </Box>
            </Dialog>

            <Dialog sx={{
                width: '700px',
                margin: 'auto',
            }} open={isFileUploadModalOpen} onClose={() => setIsFileUploadModalOpen(false)}>
                <Box
                sx={{
                    bgcolor:colors.grey[800],
                    borderRadius: '5px',
                }}
                >
                <DialogTitle>
<Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
  <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
                    Request Quantity Survey:
</Box>

                    
                </DialogTitle>
                <Divider/>
                <DialogContent 
                sx={{
                    minWidth:'500px',
                margin: 'auto',
                }}
                >
                    <input
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        id="file-upload"
                        type="file"
                    />
                    <label htmlFor="file-upload">
                        <Button variant="outlined" color="secondary" component="span">
                            Upload File
                        </Button>
                        <Typography 
                        sx={{
                            color:colors.primary[100]
                            , display: 'inline',
                            marginLeft: '10px'
                        }}
                        >
                        Upload The Requset Quantity Survay Zipped File
                        </Typography>
                    </label>
                </DialogContent>
                <DialogActions>
                <Divider/>  
                    <Button variant='outlined' color="error" onClick={() => setIsFileUploadModalOpen(false)}>Close</Button>
                </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default FunnelWorkFlow;