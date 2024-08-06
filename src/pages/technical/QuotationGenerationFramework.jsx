import React, { useMemo, useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField, Chip, useTheme, Divider, List, Collapse, Tooltip, Zoom, Stack, Paper } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import DocumentScanner from '@mui/icons-material/DocumentScanner';
import { Link } from 'react-router-dom';
import { tokens } from 'theme';
import Lottie from 'lottie-react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { TransitionGroup } from 'react-transition-group';
import Document from '../../assets/lottie/document.json';
import Basket from '../../assets/lottie/busket.json';
import Book from '../../assets/lottie/book.json';
import { ShowAllRequests, startQS, sendQS, rejectQS, showDeptEmployees, assignEmployee, rejectInReviewQS ,ShowRequest, acceptQS} from 'apis/TechnicalApi/QuantitySurvayApi';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { CheckCircleOutlined, ThumbUpAlt, VisibilityOutlined } from '@mui/icons-material';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import AssignQS from './components/AssignQS';
import RejectInReviewModal from './components/RejectInReviewModal';
import AcceptQSModal from './components/AcceptQSModal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#363636' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const QuotationGenerationFramework = () => {
  const [data, setData] = useState([]);
  // Assign model statuses
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  // Accept and reject modals
  const [accceptedModalOpen, setAccceptModalOpen] = useState(false);
  const [isInReviewModalOpen , setIsInReviewModalOpen] = useState(false);
  const [seconedRejectReason , setSeconedRejectReason] = useState('');

  const [deptEmployees, setDeptEmployees] = useState([]);
  const [assignedEmployee, setAssignedEmployee] = useState(false);
  const [assignData, setAssignData] = useState({});
  // QS Modal statuses
  const [isQSModalOpen, setIsQSModalOpen] = useState(false);
  const [qsData, setQsData] = useState(null); // to hold QS data from TechnicalRFQ
  const [totalGrossMargin, setTotalGrossMargin] = useState(0);
  const [totalProjectSellingPrice, setTotalProjectSellingPrice] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [file, setFile] = useState(null);
  const [loadingAcceptModal, setLoadingAcceptModal] = useState(false);

  const [applications, setApplications] = useState([
    {
      name: '',
      totalcost: 0,
      grossmargen: 0,
      salingprice: 0,
      items: [
        {
          stockid: '',
          price: 0,
          quantity: 0,
          description: '',
        },
      ],
    },
  ]);


  const [quotationObj, setQuotationObj] = useState({
    qcdata: null,
    totalcost: 0,
    TotalProjectSellingPrice: 0,
    ProjectGrossMargin: 0,
    qc: applications
  });

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectDescription, setRejectDescription] = useState('');
  // other
  const [selectedRow, setSelectedRow] = useState(null);
  const [isTechnicalRFQModalOpen, setIsTechnicalRFQModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = JSON.parse(localStorage.getItem('staron_user'));

  // Use Effects
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(false);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newTotalCost = applications.reduce((acc, app) => {
      const appTotal = app.items.reduce((itemAcc, item) => itemAcc + (parseFloat(item.price || 0) * parseFloat(item.quantity || 0)), 0);
      return acc + appTotal;
    }, 0);
    setTotalCost(newTotalCost);

  }, [applications]);

  // Fetch all data
  useEffect(() => {
    fetchAllRequests();
    fetchDeptEmployees();
  }, []);

  // Fetching all data
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
  // fetch all QS requests 
  const fetchAllRequests = async () => {

    try {
      const response = await ShowAllRequests();
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  const submitAcceptQuantitySurvay = async (id, formData)=> {
    try {
      const response = await acceptQS(id, formData);
      console.log("+".repeat(12))
      console.log(formData);
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        console.log("Successfully added quantity survay")
        fetchAllRequests();
      }
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  }

  // add new QS
  const submitQuantitySurvay = async (id, formData) => {
    try {

      console.log("+".repeat(12));
      console.log(formData);
      const response = await sendQS(id, formData);
      console.log("+".repeat(12))
      
      console.log(formData);
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        console.log("Successfully added quantity survay")
        fetchAllRequests();
      }
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  }
  

  // Supervisor Accept Applications
  // Supervisor Accept Applications
const handleSupervisorAccept = async (row) => {
  try {
    setLoadingAcceptModal(true); // Start loading
    setSelectedRow(row);
    console.log("+".repeat(21));
    console.log(row)
    console.log(selectedRow);

    // Fetch the request data using the provided API function
    const response = await ShowRequest(row?.original?.id);

    // Map the fetched data to match the structure expected for applications
    const newObj = response.data.qc.map((qcApplication) => ({
      name: qcApplication.name,
      grossmargen: parseFloat(qcApplication.grossmargen),
      totalcost: parseFloat(qcApplication.totalcost),
      salingprice: parseFloat(qcApplication.salingprice),
      items: qcApplication.qc_applecation_item.map((item) => ({
        stockid: item.stockid,
        price: parseFloat(item.price),
        description: item.description,
        quantity: parseFloat(item.quantity),
      })),
    }));

    // Update the applications state with the new data
    setApplications(newObj);

    // Optionally, update the quotationObj state if needed
    setQuotationObj((prev) => ({
      ...prev,
      qc: newObj,
      totalcost: newObj.reduce((acc, app) => acc + app.totalcost, 0),
      TotalProjectSellingPrice: newObj.reduce((acc, app) => acc + app.salingprice, 0),
      ProjectGrossMargin: newObj.reduce((acc, app) => acc + app.grossmargen, 0),
    }));

    // console.log("== The data fetched:");
    // console.log(newObj);
  } catch (error) {
    console.error('Error Fetching:', error);
  } finally {
    setLoadingAcceptModal(false); // End loading
    setAccceptModalOpen(true); // Open the modal
  }
};

  // QS Submit Modal
  const calculateTotals = () => {
    let newTotalCost = 0;
    let newTotalGrossMargin = 0;
    let totalProjectSellingPrice = 0;

    // Loop through each application
    applications.forEach((app, index) => {
      let appTotalCost = 0;

      // Calculate total cost for the application
      app.items.forEach((item) => {
        appTotalCost += item.price * item.quantity;
      });

      // Calculate selling price based on input gross margin
      const grossMarginPercentage = app.grossmargen / 100;
      const sellingPrice = appTotalCost / (1 - grossMarginPercentage);

      // Update total cost and selling price for each application
      applications[index].totalcost = appTotalCost;
      applications[index].salingprice = sellingPrice;

      // Aggregate project selling price
      totalProjectSellingPrice += sellingPrice;

      // Aggregate total cost and gross margin for all applications
      newTotalCost += appTotalCost;
      newTotalGrossMargin += app.grossmargen; // Aggregate gross margin
    });

    // Update state with new totals
    setTotalCost(newTotalCost);
    setTotalGrossMargin(applications.length ? newTotalGrossMargin / applications.length : 0); // Average gross margin
    setTotalProjectSellingPrice(totalProjectSellingPrice.toFixed(2)); // Total project selling price
    setApplications([...applications]);
    const newObj = { ...quotationObj, totalcost: totalCost, TotalProjectSellingPrice: totalProjectSellingPrice, ProjectGrossMargin: totalGrossMargin, }
    setQuotationObj(newObj);
  };


  const handleGrossMarginChange = (index, value) => {
    console.log(index, value);
    const updatedApplications = [...applications];
    if(selectedRow.original.qcstatus === "in review") console.log("in review")

    updatedApplications[index].grossmargen = Number(value);

    // Recalculate totals whenever the gross margin is updated
    calculateTotals();
  };


  // Assign modal
  const handleAssignModal = (row) => {
    setIsAssignModalOpen(true);
    setAssignData(row.original);
  }


  const handleSubmitAssignedEmployee = async (assignedEmployeeID) => {
    try {
      const formData = {
        "asign_for_user": assignedEmployeeID,
      }
      const response = await assignEmployee(assignData?.id, JSON.stringify(formData, null, 2));
      console.log(response);
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        console.log("success assigning employee");
        fetchAllRequests();
        setIsAssignModalOpen(false);

      }
    } catch (err) {
      console.error("Error Assigning", err);
    }

  };

  const handleSeconedRejectSubmit = async () => {
    // console.log(assignedEmployeeID);
    // console.log(assignData);
    const id  = selectedRow?.original.id;
    
    try {
      const formData = {
        "reason": seconedRejectReason,
      }
      const response = await rejectInReviewQS(id, JSON.stringify(formData, null, 2));
      console.log(response);
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        console.log("success rejecting employee");
        fetchAllRequests();
        setIsInReviewModalOpen(false);

      }
    } catch (err) {
      console.error("Error Assigning", err);
    }

  };

  // Start QS Button
  const handleStartQS = async (row) => {
    console.log(row.original.asign_for_user);
    console.log(user?.id)
    try {
      const response = await startQS(row?.original?.id);
      console.log(response);
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        console.log("success start task");
        fetchAllRequests();
        setIsAssignModalOpen(false);

      }
    } catch (err) {
      console.error("Error starting", err);
    }
  }


  const handleRejectRow = async () => {
    try {

      const formData = {
        "qcstatus": rejectReason,//out of scope,request for information
        "reason": rejectDescription
      }
      console.log(selectedRow);
      const response = await rejectQS(selectedRow.original.id, JSON.stringify(formData, null, 4));
      console.log(response);
      setIsRejectModalOpen(false);
      fetchAllRequests();

    }
    catch (err) {
      console.error("Some Error", err);
    }
  };

  const handleRejectReasonChange = (event) => {
    setRejectReason(event.target.value);
  };

  const handleSeconedRejectReasonChange = (event) => { 
    setSeconedRejectReason(event.target.value);
  }

  const handleRejectDescriptionChange = (event) => {
    setRejectDescription(event.target.value);
  };

  const handleAssignedEmplyeeChange = (event) => {
    setAssignedEmployee(event.target.value);
  }

  const handleSubmitQS = (row) => {
    setSelectedRow(row);
    setIsTechnicalRFQModalOpen(true);
  };

  // Submit QS button click
  const handleSubmitQSToComplete = () => {           
    if ((user?.Supervior === "1" || user?.Supervisor == null) && applications.some(app => !app.name || app.items.some(item => !item.stockid || !item.price || !item.quantity || !item.description))) {
      // console.log(app)
      alert('Please fill in all required fields.');
      return;
    }
    if ((user?.Supervior !== "1"|| user?.Supervior != null) && applications.some(app => !app.name || app.items.some(item => !item.stockid ||  !item.quantity || !item.description))) {
      // console.log(app)
      alert('Please fill in all required fields.');
      return;
    }
    const qsFormData = { ...quotationObj };
    // console.log(quotationObj);
    // console.log(qsFormData);

    if(selectedRow.original.qcstatus === "in review" || selectedRow.original.qcstatus === "Re-calculation") {
      // console.log(qsFormData);
      submitAcceptQuantitySurvay(selectedRow?.original.id,qsFormData);
      setAccceptModalOpen(false);
    }
    else {

      submitQuantitySurvay(selectedRow?.original.id, qsFormData);
      setIsTechnicalRFQModalOpen(false);
    }
    
    setApplications([{
      name: '',
      totalcost: 0,
      grossmargen: 0,
      salingprice: 0,
      items: [
        {
          stockid: '',
          price: 0,
          quantity: 0,
          description: '',
        },
      ],
    }]);
    
    fetchAllRequests();

  };

  // Add Application Button
  const handleAddApplication = () => {
    setApplications([...applications, {
      name: '',
      totalcost: 0,
      grossmargen: 0,
      salingprice: 0,
      items: [{ stockid: '', price: 0, quantity: 0, description: '' }]
    }]);
  };

  // Remove Application Button
  const handleRemoveApplication = (appIndex) => {
    if (applications.length > 1) {
      setApplications(applications.filter((_, index) => index !== appIndex));
    }
  };

  // App Title Change
  const handleApplicationTitleChange = (appIndex, event) => {
    const newApplications = [...applications];
    newApplications[appIndex].name = event.target.value;
    if(selectedRow.original.qcstatus === "in review") console.log("in review")
    setApplications(newApplications);
  };

  // Add item Button
  const handleAddItem = (appIndex) => {
    const newApplications = [...applications];
    newApplications[appIndex].items.push({ stockid: '', price: 0, quantity: 0, description: '' });
    setApplications(newApplications);
  };


  // Remove item Button
  const handleRemoveItem = (appIndex, itemIndex) => {
    if (applications[appIndex].items.length > 1) {
      const newApplications = [...applications];
      newApplications[appIndex].items = newApplications[appIndex].items.filter((_, index) => index !== itemIndex);
      setApplications(newApplications);
    }
  };

  // Item data Change
  const handleItemChange = (appIndex, itemIndex, field, event) => {
    const newApplications = [...applications];
    newApplications[appIndex].items[itemIndex][field] = event.target.value;
    setApplications(newApplications);
    calculateTotals();
    console.log(applications);
    if(selectedRow.original.qcstatus === "in review") console.log("in review")
    console.log(applications);
    setQuotationObj({...quotationObj, qc: applications});
  };

  // First Reject Button Clicked
  const handleReject = (row) => {
    setSelectedRow(row);
    setIsRejectModalOpen(true);
  };

  const handleSeconedReject = (row) => {
    setSelectedRow(row);
    setIsInReviewModalOpen(true);
  }

  const columns = useMemo(() => [
    { accessorKey: 'id', header: '#' },
    { accessorKey: 'sales_crm.client.name', header: 'Client Name' },
    { accessorKey: `user.name`, header: 'Assigned To', Cell: ({ cell }) => (<Typography>{cell.getValue() || "N/A"}</Typography>) },
    { accessorKey: 'sales_crm.location', header: 'Location' },
    { accessorKey: 'sales_crm.description', header: 'Description' },
    {
      accessorKey: 'qcstatus',
      header: 'Status',
      Cell: ({ cell }) => (
        <Chip variant='outlined' label={cell.getValue()} sx={{
          fontSize: '14px', width: '150px'
        }} color={cell.getValue() === 'completed' ? "info" : cell.getValue() === "rejected" ? "error" : "warning"} />
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", justifyContent: "start", alignItems: "center", fontSize: "10px !important" }}>
          <Tooltip
            TransitionComponent={Zoom}
            // arrow 
            title="Preview Inquery Data"
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
            <Link
              to={`https://erpsystem.darakoutlet.com/public/${row.original.sales_crm.tasbuilt}`}
              target="_blank"
              onClick={() => { console.log(`https://erpsystem.darakoutlet.com/api/v1${row.original.sales_crm.tasbuilt}`) }}>
              <IconButton color="info" sx={{ m: '4px' }}>
                <DocumentScanner sx={{ fontSize: '26px' }}>
                </DocumentScanner>
              </IconButton>
            </Link>
          </Tooltip>


          {/* First statue pending assign */}
          {row.original.qcstatus === 'pending assign' && (
            <>
              <Tooltip
                TransitionComponent={Zoom}
                // arrow 
                title="Assign QS"
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
                <IconButton color='secondary' sx={{ m: "4px" }} onClick={() => handleAssignModal(row)}>
                  <AssignmentIndOutlinedIcon sx={{ fontSize: '26px' }} />
                </IconButton>
              </Tooltip>
              {/* Rejection */}
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
                <IconButton color="error" sx={{ ml: '4px' }} onClick={() => handleReject(row)}>
                  <ThumbDownIcon sx={{ fontSize: '26px' }} />
                </IconButton>
              </Tooltip>
            </>
          )}
          {/* {console.log(row)} */}
          {/* seconed state pending */}
          {row.original.qcstatus === 'pending' && row.original.asign_for_user == user?.id && (
            <>
            
              {/* when clicked change the status that hides the submit QS button and shows the start button */}
              <Tooltip
                TransitionComponent={Zoom}
                // arrow 
                title="Start QS"
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
                <IconButton color='secondary' sx={{ m: "4px" }} onClick={() => handleStartQS(row)}>
                  <PlayCircleFilledWhiteOutlinedIcon sx={{ fontSize: '26px' }} />
                </IconButton>
              </Tooltip>
            </>
          )}

          {row.original.qcstatus === 'in progress'  &&
          row.original?.user.name === user?.name && (
       
              <Tooltip
                TransitionComponent={Zoom}
                // arrow 
                title="Submit QS"
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
                {/* if the start request fulfilled show this button */}
                <IconButton color="success" sx={{ m: '4px' }} onClick={() => handleSubmitQS(row)}>
                  <CheckCircleOutlined sx={{ fontSize: '26px' }} />
                </IconButton>
              </Tooltip>
            
          )}
        {(row.original.qcstatus === 'Qutation Back' && (user?.Supervisor === "1" || user?.Supervisor === null)) && (
            <>
              {/* Acception In Review*/}
              <Tooltip
                title="Submit"
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
                <IconButton aria-hidden={true} color="success" sx={{ ml: '4px' }} onClick={() => handleSupervisorAccept(row)}>
                <CheckCircleOutlined sx={{ fontSize: '26px' }} />
                </IconButton>
              </Tooltip>


              {/* Rejection In Review*/}
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
                <IconButton color="error" sx={{ ml: '4px' }} onClick={() => handleSeconedReject(row)}>
                  <ThumbDownIcon sx={{ fontSize: '26px' }} />
                </IconButton>
              </Tooltip>
            </>
          )}
          {/* third state in review */}
          {(row.original.qcstatus === 'in review' && (user?.Supervisor === "1" || user?.Supervisor === null)) && (
            <>
              {/* Acception In Review*/}
              <Tooltip
                title="Accept"
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
                <IconButton aria-hidden={true} color="success" sx={{ ml: '4px' }} onClick={() => handleSupervisorAccept(row)}>
                  <ThumbUpAlt sx={{ fontSize: '26px' }} />
                </IconButton>
              </Tooltip>


              {/* Rejection In Review*/}
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
                <IconButton color="error" sx={{ ml: '4px' }} onClick={() => handleSeconedReject(row)}>
                  <ThumbDownIcon sx={{ fontSize: '26px' }} />
                </IconButton>
              </Tooltip>
            </>
          )}
          {/* {console.log(row.original.qcstatus === 'reject back' && user?.Supervisor !== "1" && user?.Supervior != null)} */}
          {row.original.qcstatus === 'reject back' && row.original.asign_for_user == user?.id  && (
            <>
              {/* when clicked change the status that hides the submit QS button and shows the start button */}
              <Tooltip
                TransitionComponent={Zoom}
                // arrow 
                title="Start QS"
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
                <IconButton color='secondary' sx={{ m: "4px" }} onClick={() => handleStartQS(row)}>
                  <PlayCircleFilledWhiteOutlinedIcon sx={{ fontSize: '26px' }} />
                </IconButton>
              </Tooltip>
            </>

          )}
          {/* {console.log(selectedRow)} */}
          {row.original.qcstatus === 'Re-calculation' && (user?.Supervior === "1" || user?.Supervior == null) && (
                          <Tooltip
                          title="Accept"
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
                          <IconButton aria-hidden={true} color="success" sx={{ ml: '4px' }} onClick={() => handleSupervisorAccept(row)}>
                          <CheckCircleOutlined sx={{ fontSize: '26px' }} />
                          </IconButton>
                        </Tooltip>
          ) }


          {/* fourth state completed */}
          {row.original.qcstatus === 'completed' && (
            <Tooltip
              title="QS Data"
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
              <Link
                to={`https://erpsystem.darakoutlet.com/public/${row.original.qcdata}`}
                target="_blank"
              >
                <IconButton sx={{ m: '4px' }}>
                  <VisibilityOutlined sx={{ fontSize: '26px' }} />
                </IconButton>
              </Link>
            </Tooltip>
          )}
        </Box>
      ),
    },
  ], [data]);

  return (
    <Box m="20px">
      <MaterialReactTable
        columns={columns}
        data={data}
        initialState={{
          showColumnFilters: true,
          showGlobalFilter: true,
        }}
        paginationDisplayMode="pages"
        positionToolbarAlertBanner="bottom"
        muiSkeletonProps={{
          animation: 'wave',
        }}
        state={{ isLoading: loading }}

        muiLinearProgressProps={{
          color: 'secondary',
        }}
        muiCircularProgressProps={{
          color: 'secondary',
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
        muiBottomToolbarProps={({ table }) => ({
          sx: { backgroundColor: colors.primary[400] },
        })}
        muiTablePaperProps={{
          elevation: 2,
          sx: {
            borderRadius: '20px',
          },
        }}
        muiTableContainerProps={{
          sx: {
            backgroundColor: colors.primary[400],
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: colors.primary[400],
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            backgroundColor: colors.primary[400],
          },
        }}
        muiTableBodyProps={{
          sx: {
            backgroundColor: colors.primary[400],
          },
        }}
      />
      {/* Assign QS dialog */}
      <AssignQS
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        deptEmployees={deptEmployees}
        assignedEmployee={assignedEmployee}
        onAssignChange={handleAssignedEmplyeeChange}
        onSubmit={() => handleSubmitAssignedEmployee(assignedEmployee)}

      />

      <RejectInReviewModal 
          isOpen={isInReviewModalOpen}
          onClose={() => setIsInReviewModalOpen(false)}
          onSubmit={() => handleSeconedRejectSubmit()} //here change
          seconedRejectReason={seconedRejectReason}
          handleSeconedRejectReasonChange={handleSeconedRejectReasonChange}
      />

      <AcceptQSModal 
      accceptedModalOpen = {accceptedModalOpen}
      setAccceptModalOpen= {setAccceptModalOpen}
      user= {user}
      totalCost ={totalCost}
      totalProjectSellingPrice = {totalProjectSellingPrice}
      totalGrossMargin = {totalGrossMargin}
      applications = {applications}
      handleApplicationTitleChange ={handleApplicationTitleChange}
      handleGrossMarginChange = {handleGrossMarginChange}
      handleAddItem = {handleAddItem}
      handleItemChange = {handleItemChange} 
      handleRemoveItem = {handleRemoveItem}
      handleAddApplication = {handleAddApplication}
      handleRemoveApplication = {handleRemoveApplication}
      // setFile ={setFile}
      quotationObj = {quotationObj}
      setQuotationObj = {setQuotationObj}
      handleSubmitQSToComplete={handleSubmitQSToComplete}
      selectedRow={selectedRow}
      
  />
      {/* Preview QS Data (completed) */}
      <Dialog maxWidth="lg" open={isQSModalOpen} onClose={() => setIsQSModalOpen(false)}>
        <DialogTitle>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
            QS Data
          </Box>

        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography>{JSON.stringify(qsData, null, 2)}</Typography>



        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => setIsQSModalOpen(false)} color="secondary" variant="outlined">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Reject Data  (pending assign)*/}
      <Dialog maxWidth="lg" open={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)}>
        <DialogTitle>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
            Rejection
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ minWidth: '700px' }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Reason</InputLabel>
            <Select
              value={rejectReason}
              onChange={handleRejectReasonChange}
            >
              <MenuItem value="out of scope">Out of Scope</MenuItem>
              <MenuItem value="request for information">Request for Information</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Description"
            value={rejectDescription}
            onChange={handleRejectDescriptionChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => setIsRejectModalOpen(false)} color="secondary" variant="outlined">Cancel</Button>
          <Button onClick={handleRejectRow} color="error" variant="outlined">Reject</Button>
        </DialogActions>
      </Dialog>
      {/* Quantity Survay Modal (in progress)*/}
      <Dialog maxWidth="lg" open={isTechnicalRFQModalOpen} onClose={() => setIsTechnicalRFQModalOpen(false)}>
        <DialogTitle>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
            <Lottie style={{ width: '40px', display: 'flex' }} animationData={Basket} />
            Quantity Survey Submit :
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ minWidth: '700px' }}>

          {/* The total cost */}
          {(user?.Supervisor === "1" || user?.Supervior == null) &&
            <>
              <Stack spacing={2}>
                <Item sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" sx={{ padding: '10px' }}>Total Cost: ${totalCost}</Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="h6" sx={{ paddingBlock: '10px' }}>Total Selling Price: ${totalProjectSellingPrice}</Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="h6" sx={{ padding: '10px' }}>Total Gross Margin: %{totalGrossMargin}</Typography>
                </Item>

              </Stack>
            </>
          }

          {/* Map through applications */}
          {applications.map((app, appIndex) => (
            <Box key={appIndex} mb={2} mt={2} sx={{ background: colors.grey[800], padding: '20px', boxShadow: "2px 3px 5px rgba(0,0,0,0.6)", borderRadius: '20px' }}>
              {/* Application */}
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: '10px', textTransform: "uppercase" }}>
                <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                <Typography variant='h5' mt={2} sx={{ textTransform: "uppercase" }}>
                  Application {appIndex + 1}:
                </Typography>          </Box>
              <Box>

                <TextField
                  variant="filled"
                  label="Application Title"
                  value={app.name}
                  onChange={(e) => handleApplicationTitleChange(appIndex, e)}
                  fullWidth
                  margin="normal"
                />
                {(user?.Supervisor === "1" || user?.Supervisor == null) &&

                  <TextField
                    variant='filled'
                    label='Gross Margin (%)'
                    value={app.grossmargen}
                    fullWidth
                    type='number'
                    onChange={(e) =>
                      handleGrossMarginChange(appIndex, e.target.value)
                    }
                    margin='normal'
                  />
                }
              </Box>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleAddItem(appIndex)}
              >
                Add Item
              </Button>
              <List>
                <TransitionGroup>
                  {app.items.map((item, itemIndex) => (
                    <Collapse key={itemIndex}>
                      <Box 
                      display="flex" 
                      flexDirection="column" 
                      mt={2} 
                      sx={{ 
                        background: colors.grey[800], 
                        padding: '10px', 
                        borderRadius: '10px', 
                        boxShadow: "2px 3px 6px rgba(0,0,0,0.6)" }}>
                          {/* Item Title */}
                        <Typography 
                        variant='h5'
                        mt={2} 
                        sx={{ textTransform: "uppercase" }}>
                          <Box 
                          sx={{ 
                            display: "flex", 
                            flexDirection: "row", 
                            alignItems: "center", 
                            gap: "10px", 
                            textTransform: "uppercase" }}>

                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Book} />
                            Item {itemIndex + 1}:
                          </Box>

                        </Typography>
                        <TextField
                          label="Stock Code"
                          variant="filled"
                          value={item.stockid}
                          onChange={(e) => handleItemChange(appIndex, itemIndex, 'stockid', e)}
                          fullWidth
                          margin="normal"
                        />

                        {
                          (user?.Supervisor === "1" || user?.Supervior == null) &&
                          <TextField
                            label="Price"
                            variant="filled"

                            type="number"
                            value={item.price}
                            onChange={(e) => handleItemChange(appIndex, itemIndex, 'price', e)}
                            fullWidth
                            margin="normal"
                          />
                        }

                        <TextField
                          label="Quantity"
                          variant="filled"

                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(appIndex, itemIndex, 'quantity', e)}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Description"
                          variant="filled"

                          value={item.description}
                          onChange={(e) => handleItemChange(appIndex, itemIndex, 'description', e)}
                          fullWidth
                          margin="normal"
                          multiline
                          rows={3}
                        />
                        <Box display="flex" justifyContent="flex-end" mt={1}>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            title="Delete Item"
                            onClick={() => handleRemoveItem(appIndex, itemIndex)}
                            sx={{ width: 'auto' }}
                            color='error'
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>
              {applications.length > 1 && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveApplication(appIndex)}
                  sx={{ mt: 2 }}
                >
                  Remove Application
                </Button>
              )}
            </Box>
          ))}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleAddApplication}
            sx={{ mt: 2 }}
          >
            Add Application
          </Button>
          <Box mt={2}>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              color="secondary"
              tabIndex={-1}
              sx={{ margin: 'auto', width: "300px" }}
              startIcon={<CloudUploadIcon />}
            >
              Upload Additional Data (optional)
              <VisuallyHiddenInput type="file" onChange={(e) => {
                setFile(e.target.files[0]);
                const quotWithFile = { ...quotationObj, qcdata: e.target.files[0] }
                setQuotationObj(quotWithFile);
                console.log(quotationObj);
              }} />
            </Button>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => setIsTechnicalRFQModalOpen(false)} color="error" variant="outlined">Close</Button>
          <Button onClick={handleSubmitQSToComplete} color="secondary" variant="outlined">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuotationGenerationFramework;
