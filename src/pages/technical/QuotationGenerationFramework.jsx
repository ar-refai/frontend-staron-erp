  import React, { useMemo, useState, useEffect } from 'react';
  import { Box, Typography, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField, Chip, useTheme, Divider, List, Collapse } from '@mui/material';
  import { MaterialReactTable } from 'material-react-table';
  import PreviewIcon from '@mui/icons-material/Preview';
  import { fakeData } from './fakeData'; // assuming you have some fake data
  import { tokens } from 'theme';
  import Document from  '../../assets/lottie/document.json';
  import Lottie from 'lottie-react';
  import CloudUploadIcon from '@mui/icons-material/CloudUpload';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { styled } from '@mui/material/styles';
  import { TransitionGroup } from 'react-transition-group';
  import Basket from '../../assets/lottie/busket.json';
  import Book from '../../assets/lottie/book.json';

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
    const [data, setData] = useState(fakeData);
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [descriptionData, setDescriptionData] = useState({});
    const [isQSModalOpen, setIsQSModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [rejectDescription, setRejectDescription] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [isTechnicalRFQModalOpen, setIsTechnicalRFQModalOpen] = useState(false);
    const [applications, setApplications] = useState([{ title: '', items: [{ name: '', stockCode: '', price: '', quantity: '', description: '' }] }]);
    const [qsData, setQsData] = useState(null); // to hold QS data from TechnicalRFQ
    const [totalCost, setTotalCost] = useState(0);
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

    const handlePreviewQSData = (row) => {
      setQsData(row.original.qsData); // assuming each row has a qsData property
      setIsQSModalOpen(true);
    };

    const handleRejectRow = () => {
      setData(data.filter((row) => row !== selectedRow));
      setIsRejectModalOpen(false);
    };

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
          return { ...row, status: 'completed', qsData: applications };
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

    const handlePreviewInquiryData = (row) => {
      setDescriptionData(row.original);
      setIsDescriptionModalOpen(true);
    };

    const handleReject = (row) => {
      setSelectedRow(row);
      setIsRejectModalOpen(true);
    };

    const handleFileUpload = (event) => {
      // Handle file upload logic here
    };

    const columns = useMemo(() => [
      { accessorKey: 'clientName', header: 'Client Name' },
      { accessorKey: 'type', header: 'Type' },
      { accessorKey: 'location', header: 'Location' },
      { accessorKey: 'description', header: 'Description' },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => (
          <Chip label={cell.getValue()} sx={{
            fontSize:'15px',fontWeight:'bold',color:'white',textShadow:'3px 0px 2px rgba(0,0,0,0.6)'
          }} color={cell.getValue() === 'completed' ? 'success' : 'warning'} />
        ),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <Box sx={{display:"flex", justifyContent:"start", alignItems:"center"}}>
            <Button variant="outlined" color="secondary" sx={{m:'10px'}} onClick={() => handlePreviewInquiryData(row)}>
              Inquiry Data
            </Button>
            {row.original.status === 'in progress' && (
              <>
                <Button variant="outlined" color="secondary" sx={{m:'10px'}} onClick={() => handleSubmitQS(row)}>
                  Submit QS
                </Button>
                <Button variant="outlined" color="error" sx={{ml:'10px'}} onClick={() => handleReject(row)}>
                  Reject
                </Button>
              </>
            )}
            {row.original.status === 'completed' && (
              <Button variant="outlined" color="secondary" sx={{m:'10px'}} onClick={() => handlePreviewQSData(row)}>
                QS Preview
              </Button>
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

        <Dialog maxWidth="lg" open={isDescriptionModalOpen} onClose={() => setIsDescriptionModalOpen(false)}>
          <DialogTitle>
            <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" , gap:'10px' , textTransform:"uppercase"}}>
              <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
              Description
            </Box>
          </DialogTitle>
          <Divider/>
          <DialogContent sx={{ minWidth: '700px' }}>
            <Typography>{descriptionData.description}</Typography>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button onClick={() => setIsDescriptionModalOpen(false)} color="secondary" variant="outlined">Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog maxWidth="lg" open={isQSModalOpen} onClose={() => setIsQSModalOpen(false)}>
          <DialogTitle>
          <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" , gap:"10px" , textTransform:"uppercase"}}>
              <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
              QS Data
            </Box>

          </DialogTitle>
          <Divider/>
          <DialogContent>
            <Typography>{JSON.stringify(qsData, null, 2)}</Typography>
          </DialogContent>
          <Divider/>
          <DialogActions>
            <Button onClick={() => setIsQSModalOpen(false)} color="secondary" variant="outlined">Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog maxWidth="lg" open={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)}>
          <DialogTitle>
            <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
              <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
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
            
          <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" , gap:"10px" , textTransform:"uppercase"}}>
              <Lottie style={{width:'40px',display:'flex' }} animationData={Basket}/>
              Quantity Survay Submit :
            </Box>          
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ minWidth: '700px' }}>
            <Typography variant="h6">Total Cost: ${totalCost}</Typography>
            {applications.map((app, appIndex) => (
              <Box key={appIndex} mb={2} mt={2} sx={{background:colors.grey[800], padding:'20px',boxShadow:"2px 3px 5px rgba(0,0,0,0.6)", borderRadius:'20px'}}>
                <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center", gap:'10px' , textTransform:"uppercase"}}>
              <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
              <Typography variant='h5' mt={2} sx={{textTransform:"uppercase"}}>
                            Application {appIndex+1}:
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
                        <Box display="flex" flexDirection="column" mt={2} sx={{background:colors.grey[800] , padding:'10px', borderRadius:'10px', boxShadow:"2px 3px 6px rgba(0,0,0,0.6)"}}>
                          <Typography variant='h5' mt={2} sx={{textTransform:"uppercase"}}>
                          <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" , gap:"10px" , textTransform:"uppercase"}}>

                          <Lottie style={{width:'30px',display:'flex' }} animationData={Book}/>
                            Item {itemIndex+1}:
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
                sx={{margin:'auto' ,width:"300px"}}
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
