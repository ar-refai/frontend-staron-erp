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
    Zoom,
} from '@mui/material';
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json"
import {
    quotationApprove,
    quotationReject,
    switchQSAssign,
    clientApprove,
    clientRecalculation,
    clientReject,
    submitDrafting
} from 'apis/SalesApi/crm';
import EditIcon from '@mui/icons-material/Edit';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BallotIcon from '@mui/icons-material/Ballot';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { tokens } from 'theme';
import { ShowAllLeads, CreateLead, DeleteLead, RequestQuantitySurvay, UpdateLead } from 'apis/SalesApi/crm';
import { showAllClients } from 'apis/SalesApi/Clint';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import SwitchQS from './components/SwitchQs';
import { showDeptEmployees } from 'apis/TechnicalApi/QuantitySurvayApi';


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
    // Switch Modal States
    const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
    const [deptEmployees, setDeptEmployees] = useState([]);
    const [switchEmployee, setSwitchEmployee] = useState();
    const [switchData, setSwitchData] = useState({});
    const [editLeadData, setEditLeadData] = useState({
        clientName: '',
        location: '',
        description: '',
    });
    // draft
    const [contractValue, setContractValue] = useState(0);
    // reject 
    const [isClientRejectButton, setIsClientRejectButton] = useState(false);
    // recalculate
    const [isClientRecalculateButton, setIsClientRecalculateButton] = useState(false);
    // theme settings
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    const fetchDeptEmployees = async () => {
        try {
            const response = await showDeptEmployees();
            if (response.status === 200 || response.status === 201 || response.status === 204) {
                setDeptEmployees(response.data);
            }
        }
        catch (error) {
            console.error("Error Fetching data.", error);
        }
    }

    useEffect(() => {
        fetchLeads();
        fetchClients();
        fetchDeptEmployees();
    }, []);

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


    // assign property to value 
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditLeadData({
            ...editLeadData,
            [name]: value,
        });
    };
    // Switch Employee functions 
    const handleSubmitSwitchEmployee = async (switchEmployeeID) => {
        // console.log(assignedEmployeeID);
        // console.log(assignData);
        try {
            const formData = {
                "asignby": switchEmployeeID,
            }
            const response = await switchQSAssign(switchData?.id, JSON.stringify(formData, null, 2));
            console.log(response);
            if (response.status === 200 || response.status === 201 || response.status === 204) {
                console.log("success switching employee");
                // fetchAllRequests();  fetch all requests 
                fetchLeads();
                setIsSwitchModalOpen(false);

            }
        } catch (err) {
            console.error("Error switching", err);
        }

    };
    const handleApproveSubmit = (row) =>{
        // console.log(row);
        setSelectedRow(row);
        submitApproveQuotation();
    }
    const submitApproveQuotation = async () => {
        try {
            console.log(selectedRow);
            const response = await quotationApprove(selectedRow?.original.id);
            // console.log(response);
            if (response.status === 200 || response.status === 201 || response.status === 204) {
                console.log("success approving");
                // fetchAllRequests();  fetch all requests 
                fetchLeads();
                setIsSwitchModalOpen(false);

            }
        } catch (err) {
            console.error("Error approving", err);
        }
    }



    const handleAssignedEmplyeeChange = (event) => {
        setSwitchEmployee(event.target.value);
    }

    const handleSwitchSales = (row) => {
        setIsSwitchModalOpen(true);
        setSwitchData(row.original);
    }


    // // Updating Function
    // const handleUpdateLead = async (id, values) => {
    //     console.log("#".repeat(11))
    //     console.log("----Values: ", values)
    //     const updatedData = {
    //         clients_id: values.clientName,
    //         location: values.location,
    //         description: values.description,
    //     };
    //     console.log("#".repeat(11))
    //     console.log("----updatedData: ", updatedData);
    //     try {
    //         const response = await UpdateLead(id, updatedData);
    //         console.log("#".repeat(11))
    //         console.log("----Response: ", response);
    //         if (response.status === 200 || response.status === 201) {
    //             fetchLeads(); // Refresh the table data after a successful update
    //             setIsEditing(false); // Close the editing modal
    //         }
    //     } catch (error) {
    //         console.error('Error updating lead:', error);
    //     }
    // };

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
            {
                clientName: row.name,
                location: row.location,
                description: row.description
            }
        );
        const client = clientsList.filter((row) => {
            // console.log("Row name: ",row.name);
            // console.log("values name: ", values["client.name"]);
            return row.name === values["client.name"]
        })
        console.log('-----Client:', client);

        const updatedData = {
            clients_id: client[0]?.id,
            location: values.location,
            description: values.description,
        };

        try {
            console.log("UpdatedData: ", updatedData);
            const response = await UpdateLead(row.id, updatedData);
            console.log("Response: ", response);
            if (response.status === 200 || response.status === 201) {
                fetchLeads(); // Refresh the table data after a successful update
                setIsEditing(false); // Close the editing modal
                setEditLeadData(
                    {
                        clientName: '',
                        location: '',
                        description: '',
                    })
            }
        } catch (error) {
            console.error('Error updating lead:', error);
        }
    };



    const handleUpload = async (row, file) => {
        console.log(row);
        console.log(file);
        if(selectedRow?.original.status === "pending qutation Drafting") {
            try {
                const formData = new FormData();
                formData.append('file', file);
    
                const response = await submitDrafting(row?.id, { file: file });
                if (response.status === 200 || response.status === 201 || response.status === 204) {
                    fetchLeads(); // Refresh the table data after a successful upload
                    setIsFileUploadModalOpen(false);
                }
            } catch (error) {
                console.error("Failed to upload file:", error);
            }
        }
        else if (selectedRow?.original.status === "pending client Approve")
        {
            try {
            
    
                const response = await clientApprove(row?.id, 
                    { 
                        contractdata: file ,
                        contractValue: contractValue
                    });
                if (response.status === 200 || response.status === 201 || response.status === 204) {
                    fetchLeads(); // Refresh the table data after a successful upload
                    setIsFileUploadModalOpen(false);
                }
            } catch (error) {
                console.error("Failed to upload file:", error);
            }
        }
        else{
            try {
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
        }
    };
      

    // Request Quantity Survey
    const handleRequestQuantitySurvey = (row) => {
        setSelectedRow(row);
        setIsFileUploadModalOpen(true);
    };

    const handleSubmitDrafting =  (row) => {
        setSelectedRow(row);
        setIsFileUploadModalOpen(true);
    }

    const handleClientApprove = (row) => {
        setSelectedRow(row);
        setIsFileUploadModalOpen(true);
    }
    // Reject Functions 
    const handleRejectRow = async (row) => {
        setSelectedRow(row);
        setIsRejectModalOpen(true);

    };
    const handleClientReject =  (row) => {
        setSelectedRow(row);
        setIsClientRejectButton(true);
        setIsRejectModalOpen(true)
    }

    const handleRecalculate =  (row) => {
        setSelectedRow(row);
        setIsClientRecalculateButton(true);
        setIsRejectModalOpen(true)
    }

    const handleConfirmReject = async () => {
        if (selectedRow) {
            const data = {
                reason: rejectReason,
            };

            if (selectedRow?.original.status === "pending qutation approve") {
                try {
                    const response = await quotationReject(selectedRow.id, JSON.stringify(data, null, 2));

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
            else if (selectedRow?.original.status === "pending client Approve" && isClientRecalculateButton === true) {
                try {
                    const response = await clientRecalculation(selectedRow.id, JSON.stringify(data, null, 2));

                    if (response.status === 200 || response.status === 201) {
                        fetchLeads();
                        setIsRejectModalOpen(false);
                        setIsClientRecalculateButton(false);
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
            else if (selectedRow?.original.status === "pending client Approve" && isClientRejectButton === true) {
                try {
                    const response = await clientReject(selectedRow?.id, JSON.stringify(data, null, 2));

                    if (response.status === 200 || response.status === 201) {
                        fetchLeads();
                        setIsRejectModalOpen(false);
                        setIsClientRejectButton(false);
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
            else {
                try {
                    const response = await DeleteLead(selectedRow.id, JSON.stringify(data, null, 2));

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
        }
        // console.log(selectedRow);


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
            <Box sx={{ display: "flex", gap: "10px" }}>
                {/* show switch button if not rejected */}
                {row.original.status !== "rejected" && (
                    <Tooltip
                        TransitionComponent={Zoom}
                        // arrow 
                        title="switch"
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    color: '#262625',
                                    backgroundColor: "#E1E1E1",
                                    fontSize: "12px"
                                }
                            }
                        }}
                    >
                        <IconButton color="info" sx={{ m: '4px' }} onClick={() => handleSwitchSales(row)}>
                            <SwapHorizOutlinedIcon sx={{ fontSize: '26px' }}>
                            </SwapHorizOutlinedIcon>
                        </IconButton>
                    </Tooltip>
                )}

                {row.original.status === 'pending client data' && (
                    <>
                        <Tooltip
                            title="Edit"
                            TransitionComponent={Zoom}
                            // arrow 
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        color: '#262625',
                                        backgroundColor: "#E1E1E1",
                                        fontSize: "12px"
                                    }
                                }
                            }}
                        >
                            <IconButton onClick={() => table.setEditingRow(row)} color="secondary" variant="outlined">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip

                            title="Request Quantity Survay"
                            TransitionComponent={Zoom}
                            // arrow 
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        color: '#262625',
                                        backgroundColor: "#E1E1E1",
                                        fontSize: "12px"
                                    }
                                }
                            }}
                        >
                            <IconButton color="secondary" variant="outlined" onClick={() => handleRequestQuantitySurvey(row)}>
                                <BallotIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Reject"
                            TransitionComponent={Zoom}
                            // arrow 
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        color: '#262625',
                                        backgroundColor: "#E1E1E1",
                                        fontSize: "12px"
                                    }
                                }
                            }}
                        >
                            <IconButton color="error" variant="outlined" onClick={() => handleRejectRow(row)}>
                                <ThumbDownIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                )}

                {row.original.status === "pending qutation approve" && (
                    <Box sx={{ display: 'flex', gap: "10px" }}>
                        {/* approve */}
                        <Tooltip
                            TransitionComponent={Zoom}
                            // arrow 
                            title="Quotation Approve"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        color: '#262625',
                                        backgroundColor: "#E1E1E1",
                                        fontSize: "12px"
                                    }
                                }
                            }}
                        >
                            <IconButton color="success" sx={{ m: '4px' }} onClick={()=>handleApproveSubmit(row)}>
                                <ThumbUpAltIcon sx={{ fontSize: '26px' }}>
                                </ThumbUpAltIcon>
                            </IconButton>
                        </Tooltip>
                        {/* reject */}
                        <Tooltip
                            TransitionComponent={Zoom}
                            // arrow 
                            title="Quotation Reject"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        color: '#262625',
                                        backgroundColor: "#E1E1E1",
                                        fontSize: "12px"
                                    }
                                }
                            }}
                        >
                            <IconButton color="error" sx={{ m: '4px' }} onClick= {()=> handleRejectRow(row)}>
                                <ThumbDownAltIcon sx={{ fontSize: '26px' }}>
                                </ThumbDownAltIcon>
                            </IconButton>
                        </Tooltip>



                    </Box>
                )}

                {row.original.status === "pending client Approve" && (
                    <Box sx={{ display: 'flex', gap: "10px" }}>
                        {/* approve */}
                        <Tooltip
                            TransitionComponent={Zoom}
                            // arrow 
                            title="Client Approve"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        color: '#262625',
                                        backgroundColor: "#E1E1E1",
                                        fontSize: "12px"
                                    }
                                }
                            }}
                        >
                            <IconButton color="success" sx={{ m: '4px' }} onClick={()=> handleClientApprove(row)}>
                                <ThumbUpAltIcon sx={{ fontSize: '26px' }}>
                                </ThumbUpAltIcon>
                            </IconButton>
                        </Tooltip>
                        {/* reject */}
                        <Tooltip
                            TransitionComponent={Zoom}
                            // arrow 
                            title="Client Reject"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        color: '#262625',
                                        backgroundColor: "#E1E1E1",
                                        fontSize: "12px"
                                    }
                                }
                            }}
                        >
                            <IconButton color="error" sx={{ m: '4px' }} onClick={()=> handleClientReject(row)}>
                                <ThumbDownAltIcon sx={{ fontSize: '26px' }}>
                                </ThumbDownAltIcon>
                            </IconButton>
                        </Tooltip>
                        {/* recalculation */}
                        <Tooltip
                            TransitionComponent={Zoom}
                            // arrow 
                            title="Client Recalculation"
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        color: '#262625',
                                        backgroundColor: "#E1E1E1",
                                        fontSize: "12px"
                                    }
                                }
                            }}
                        >
                            <IconButton color="error" sx={{ m: '4px' }} onClick={()=>handleRecalculate(row)}>
                                <CalculateOutlinedIcon sx={{ fontSize: '26px' }}>
                                </CalculateOutlinedIcon>
                            </IconButton>
                        </Tooltip>


                    </Box>
                )}

                {/* pending qutation Drafting */}
                {row?.original.status === "pending qutation Drafting" && (
                    <Tooltip
                        TransitionComponent={Zoom}
                        // arrow 
                        title="Quotation Drafting"
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    color: '#262625',
                                    backgroundColor: "#E1E1E1",
                                    fontSize: "12px"
                                }
                            }
                        }}
                    >
                        <IconButton color="success" sx={{ m: '4px' }} onClick={()=>handleSubmitDrafting(row)}>
                            <ForwardToInboxOutlinedIcon sx={{ fontSize: '26px' }}>
                            </ForwardToInboxOutlinedIcon>
                        </IconButton>
                    </Tooltip>
                )}


            </Box>
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
                <Divider />
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
                <Divider />
                <DialogActions>
                    <Button onClick={() => {
                        setIsClientRecalculateButton(false);
                        setIsClientRejectButton(false);
                        setIsRejectModalOpen(false)
                        }} variant='outlined' color='error'>Cancel</Button>
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


{/* Quotation file upload */}
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
                        {selectedRow?.original.status === "pending client Approve" && 
                        <TextField
                        label="Contract Value"
                        variant="filled"
                        type="number"
                        defaultValue={contractValue}
                        onChange={(e) => setContractValue(Number(e.target.value))}
                        fullWidth
                        margin="normal"
                      />
                        }
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
                    <Divider />
                    <DialogActions>
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
            <SwitchQS
                isOpen={isSwitchModalOpen}
                onClose={() => setIsSwitchModalOpen(false)}
                deptEmployees={deptEmployees}
                switchEmployee={switchEmployee}
                onSwitchChange={handleAssignedEmplyeeChange}
                onSubmit={() => handleSubmitSwitchEmployee(switchEmployee)}

            />
        </Box>
    );
};

export default FunnelWorkFlow;