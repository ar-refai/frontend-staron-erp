import React, { useMemo, useState, useEffect } from 'react';
import { Box, Typography, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField, Chip, useTheme, Divider, List, Collapse, Tooltip, Zoom } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import DocumentScanner from '@mui/icons-material/DocumentScanner';
import { Link } from 'react-router-dom';
import { tokens } from 'theme';
import Document from '../../assets/lottie/document.json';
import Lottie from 'lottie-react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { TransitionGroup } from 'react-transition-group';
import Basket from '../../assets/lottie/busket.json';
import Book from '../../assets/lottie/book.json';
import { ShowAllRequests, startQS, sendQS, rejectQS, showDeptEmployees, assignEmployee } from 'apis/TechnicalApi/QuantitySurvayApi';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { CheckCircleOutlined, ThumbUp, ThumbUpAlt, VisibilityOutlined } from '@mui/icons-material';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';



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
  const [deptEmployees , setDeptEmployees] = useState([]);
  const [assignedEmployee, setAssignedEmployee] = useState(false);
  const [assignData, setAssignData] = useState({});
  // QS Modal statuses
  const [isQSModalOpen, setIsQSModalOpen] = useState(false);
  const [qsData, setQsData] = useState(null); // to hold QS data from TechnicalRFQ
  const [applications, setApplications] = useState([{ title: '', items: [{ name: '', stockCode: '', price: '', quantity: '', description: '' }] }]);
  const [totalCost, setTotalCost] = useState(0);
  // Reject Modal Statuses
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectDescription, setRejectDescription] = useState('');
  // other
  const [selectedRow, setSelectedRow] = useState(null);
  const [isTechnicalRFQModalOpen, setIsTechnicalRFQModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  const fetchDeptEmployees = async() =>{
    try{
      const response = await showDeptEmployees();
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        // console.log('Works');
        setDeptEmployees(response.data);
        console.log(deptEmployees);
      }
    }
    catch(error){
      console.error("Error Fetching data.", error);
    }
  }

  const fetchAllRequests = async () => {

    try {
      const response = await ShowAllRequests();
      console.log("#".repeat(11))
      // console.log("----Response: ", response);
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        // console.log('Works');
        setData(response.data);
        console.log(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleAssignModal = (row) => {
    setIsAssignModalOpen(true);
    setAssignData(row.original);
  }

  const handleSubmitAssignedEmployee = async (assignedEmployeeID) => {
    // console.log(assignedEmployeeID);
    // console.log(assignData);
    try{
      const formData = {
        "asign_for_user":assignedEmployeeID,
    }
      const response = await assignEmployee(assignData?.id,JSON.stringify(formData,null,2));
      console.log(response);
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        console.log("success assigning employee");
        fetchAllRequests();
        setIsAssignModalOpen(false);
        
      }
    }catch(err){
      console.error("Error Assigning",err);
    }

  };

  
  const handleStartQS = async (row) => {
    try{
      const response = await startQS(row?.original?.id);
      console.log(response);
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        console.log("success start task");
        fetchAllRequests();
        setIsAssignModalOpen(false);
        
      }
    }catch(err){
      console.error("Error starting",err);
    }
  }

  const handlePreviewQSData = (row) => {
    setQsData(row.original.qsData); // assuming each row has a qsData property
    setIsQSModalOpen(true);
  };

  const handleRejectRow = () => {
    setData(data.filter((row) => row !== selectedRow));
    setIsRejectModalOpen(false);
  };

  const handleAssignedEmplyeeChange = (event) => {
    setAssignedEmployee(event.target.value);
  }

  const handleRejectReasonChange = (event) => {
    setRejectReason(event.target.value);
  };

  const handleRejectDescriptionChange = (event) => {
    setRejectDescription(event.target.value);
  };

  

  const handleSubmitQS = (row) => {
    setSelectedRow(row);
    setIsTechnicalRFQModalOpen(true);
  };

  const handleSubmitQSToComplete = () => {
    if (applications.some(app => !app.title || app.items.some(item => !item.name || !item.stockCode || !item.price || !item.quantity || !item.description))) {
      alert('Please fill in all required fields.');
      return;
    }
    const newData = data.map(row => {
      if (row === selectedRow) {
        return { ...row, qcstatus: 'completed', qsData: applications };
      }
      return row;
    });
    setData(newData);
    setIsTechnicalRFQModalOpen(false);
  };



  const handleAddApplication = () => {
    setApplications([...applications, { title: '', items: [{ name: '', stockCode: '', price: '', quantity: '', description: '' }] }]);
  };

  const handleRemoveApplication = (appIndex) => {
    if (applications.length > 1) {
      setApplications(applications.filter((_, index) => index !== appIndex));
    }
  };

  const handleApplicationTitleChange = (appIndex, event) => {
    const newApplications = [...applications];
    newApplications[appIndex].title = event.target.value;
    setApplications(newApplications);
  };

  const handleAddItem = (appIndex) => {
    const newApplications = [...applications];
    newApplications[appIndex].items.push({ name: '', stockCode: '', price: '', quantity: '', description: '' });
    setApplications(newApplications);
  };

  const handleRemoveItem = (appIndex, itemIndex) => {
    if (applications[appIndex].items.length > 1) {
      const newApplications = [...applications];
      newApplications[appIndex].items = newApplications[appIndex].items.filter((_, index) => index !== itemIndex);
      setApplications(newApplications);
    }
  };

  const handleItemChange = (appIndex, itemIndex, field, event) => {
    const newApplications = [...applications];
    newApplications[appIndex].items[itemIndex][field] = event.target.value;
    setApplications(newApplications);
  };

  const handleReject = (row) => {
    setSelectedRow(row);
    setIsRejectModalOpen(true);
  };

  const handleFileUpload = (event) => {
    // Handle file upload logic here
  };


  /*
  List of statuses: 
  1- pending assign: inquerydata , assign QS (dialog to choose the employee) ,reject QS
  2- pending: inquerydata , start QS 
  3- inprogress: inquerydata ,submit QS , 
  4- in review: inquiry data , accept QS , Reject QS (this reject is another endpoint)
  5.1- completed: inquery data , qs preview , 
  5.2- rejected: inquery data
  */


  const columns = useMemo(() => [
    { accessorKey: 'id', header: '#' },
    { accessorKey: 'sales_crm.client.name', header: 'Client Name' },
    { accessorKey: `user.name`, header: 'Assigned To', Cell: ({ cell }) => (<Typography>{cell.row.original?.user?.name || "N/A"}</Typography>) },
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
              to={`http://api.staronegypt.com.eg/${row.original.sales_crm.tasbuilt}`}
              target="_blank"
              onClick={() => { console.log(`http://api.staronegypt.com.eg/api/v1${row.original.sales_crm.tasbuilt}`) }}>
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
            </>
          )}

          {/* seconed state pending */}
          {row.original.qcstatus === 'pending' && (
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
                <IconButton color='secondary' sx={{ m: "4px" }} onClick={()=>handleStartQS(row)}>
                  <PlayCircleFilledWhiteOutlinedIcon sx={{ fontSize: '26px' }} />
                </IconButton>
              </Tooltip>
            </>
          )}

          {/* third state in progress */}
          {row.original.qcstatus === 'in progress' && (
            <>
              {/* if the start request fulfilled show this button */}
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
                <IconButton color="success" sx={{ m: '4px' }} onClick={() => handleSubmitQS(row)}>
                  <CheckCircleOutlined sx={{ fontSize: '26px' }} />
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

          {/* third state in review */}
          {row.original.qcstatus === 'in review' && (
            <>
              {/* Acception */}
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
                <IconButton color="error" sx={{ ml: '4px' }} onClick={() => handleReject(row)}>
                  <ThumbUpAlt sx={{ fontSize: '26px' }} />
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



          {/* fourth state completed */}
          {row.original.qcstatus === 'completed' && (
            <Tooltip
              title="QS Preview"
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
              <IconButton color="secondary" sx={{ m: '4px' }} onClick={() => handlePreviewQSData(row)}>
                <VisibilityOutlined sx={{ fontSize: '26px' }} />
              </IconButton>
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
      <Dialog maxWidth="lg" open={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)}>
        <DialogTitle>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
            Assign QS
          </Box>

        </DialogTitle>
        <Divider />
        <DialogContent sx={{width:"600px"}}>
        <FormControl fullWidth margin="normal">
            <InputLabel>Assign To:</InputLabel>
            <Select
              value={assignedEmployee}
              onChange={handleAssignedEmplyeeChange}
            >
                {deptEmployees.map(emp =>
                  <MenuItem value={emp.id}>{emp.name}</MenuItem>
                )}
            </Select>
          </FormControl>

          {/* <pre>
          <Typography>{JSON.stringify(assignData, null, 2)}</Typography>
          </pre> */}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={() => setIsAssignModalOpen(false)} color="secondary" variant="outlined">Close</Button>
          <Button onClick={() => handleSubmitAssignedEmployee(assignedEmployee)} color="secondary" variant="outlined">Submit</Button>
        </DialogActions>
      </Dialog>


      {/* QS Data */}
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
              <MenuItem value="Out of Scope">Out of Scope</MenuItem>
              <MenuItem value="Details of the Rejection">Details of the Rejection</MenuItem>
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

      <Dialog maxWidth="lg" open={isTechnicalRFQModalOpen} onClose={() => setIsTechnicalRFQModalOpen(false)}>
        <DialogTitle>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
            <Lottie style={{ width: '40px', display: 'flex' }} animationData={Basket} />
            Quantity Survay Submit :
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ minWidth: '700px' }}>
          <Typography variant="h6">Total Cost: ${totalCost}</Typography>
          {applications.map((app, appIndex) => (
            <Box key={appIndex} mb={2} mt={2} sx={{ background: colors.grey[800], padding: '20px', boxShadow: "2px 3px 5px rgba(0,0,0,0.6)", borderRadius: '20px' }}>
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: '10px', textTransform: "uppercase" }}>
                <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                <Typography variant='h5' mt={2} sx={{ textTransform: "uppercase" }}>
                  Application {appIndex + 1}:
                </Typography>          </Box>

              <TextField
                label="Application Title"
                value={app.title}
                variant="filled"

                onChange={(e) => handleApplicationTitleChange(appIndex, e)}
                fullWidth
                margin="normal"
              />
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
                      <Box display="flex" flexDirection="column" mt={2} sx={{ background: colors.grey[800], padding: '10px', borderRadius: '10px', boxShadow: "2px 3px 6px rgba(0,0,0,0.6)" }}>
                        <Typography variant='h5' mt={2} sx={{ textTransform: "uppercase" }}>
                          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>

                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Book} />
                            Item {itemIndex + 1}:
                          </Box>
                        </Typography>
                        <TextField
                          label="Stock Code"
                          variant="filled"
                          value={item.stockCode}
                          onChange={(e) => handleItemChange(appIndex, itemIndex, 'stockCode', e)}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Price"
                          variant="filled"

                          type="number"
                          value={item.price}
                          onChange={(e) => handleItemChange(appIndex, itemIndex, 'price', e)}
                          fullWidth
                          margin="normal"
                        />
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
              Upload QS Data (optional)
              <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
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
