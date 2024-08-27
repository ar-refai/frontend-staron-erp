import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { tokens } from 'theme';
import TagIcon from '@mui/icons-material/Tag';
import { Link, useParams } from 'react-router-dom';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { AccountApprove, AccountsRepresentativeApprove, BankApprove, ChecksCollection, RejectChecksCollection, ShowAllCollection, ToInProgress, TreasuryApprove } from 'apis/FainanceApi/TreasuryRequests';
import Document from '../../../../assets/lottie/document.json'; 
import Lottie from 'lottie-react';
import { ShowAllChildrenAccounts } from 'apis/FainanceApi/FinanceRequests';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';



const Collection = () => {
  const [collectionData, setCollectionData] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [accounts, setAccounts] = React.useState([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    collection_date: '',
    check_collect: '',
    collection_type: 'Cash',
    credit_id: ''

  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Mui Item
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? colors.grey[700] : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  // Mui Item
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: colors.primary[400],
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }));

  // Get All the accounts
  const fetchAllAccounts = async() => {
    try {
      const response = await ShowAllChildrenAccounts();
      if(response.status === 200 || response.status === 201 || response.status === 204){
        setAccounts(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log("There was an error fetching" , error);
    }
  }

  // fetch all the collection requests 
  const fetchCollection = async () => {
    try {
      const response = await ShowAllCollection();
      console.log(response);
      if (response.status === 200) {
        const data = response.data.filter(
          (item) => item.type === 'income'
        );
        setCollectionData(data);
      }
    } catch (error) {
      console.log('Failed to load data', error);
    }
  };

  React.useEffect(() => {
    fetchAllAccounts();
    fetchCollection();
  }, []);

  // Open Dialog
  const handleDialogOpen = (item) => {
    setSelectedItem(item);
    // console.log(item.debit_id);
    // console.log(selectedRequest);
    // console.log(item);

    setDialogOpen(true);
  };

  // Close Dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedItem(null);
    setFormData({
      collection_date: '',
      check_collect: '',
      collection_type: 'Cash',
      credit_id: ''
    });
  };

  // Form Change 
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

// Submit the form 
  const handleConfirm = async () => {
    const dataToSend = {
      collection_date: formData.collection_date,
      check_collect: formData.collection_type === 'Bank Check' ? formData.check_collect : null,
      collection_type: formData.collection_type,
      credit_id: formData.credit_id
    };
    if (selectedItem.status === "in progress")
    {
      if(selectedItem.collection_type === "Bank Transfer"){
        try {
          // Bank Approval
          console.log("Bank Approval");
          await BankApprove(selectedItem.id);
          handleDialogClose();
          fetchCollection(); // Refresh the collection data
        } catch (error) {
          console.log("There Was An Error:",error);
        }
      }
      else {
        try {
          console.log('Representative approval');
          // Account Representative approval
          await AccountsRepresentativeApprove(selectedItem.id);
          handleDialogClose();
          fetchCollection(); // Refresh the collection data
    
        } catch (error) {
          console.log("There Was An Error:",error);
        }
      }
    }
    else if (selectedItem.status === "pending tresury Approve") {
        try {
          await TreasuryApprove(selectedItem.id);
          handleDialogClose();
          fetchCollection(); // Refresh the collection data
        }
        catch (error) {
          console.log("There was an error: ",error);
        }
    }
    else if (selectedItem.status === 'pending Account Approve') {
      try{
        await AccountApprove(selectedItem.id);
        handleDialogClose();
        fetchCollection(); // Refresh the collection data

      }catch (error) {
        console.log("There was an error: ",error);
      }
    }
    else if(selectedItem.status === 'pending check collection'){
      // await CheckCollection(selectedItem.id);
      await ChecksCollection(selectedItem.id);
      handleDialogClose();
      fetchCollection(); // Refresh the collection data

    }
    else {
      try {
        console.log(dataToSend);
      await ToInProgress(selectedItem.id, dataToSend);
      handleDialogClose();
      fetchCollection(); // Refresh the collection data
    } catch (error) {
      console.log('Failed to update request', error);
    }
  }
  };

  // when check is rejected it is treated as pending 
  const handleRejectCheck = async () => {
    try {
      await RejectChecksCollection(selectedItem.id)
      handleDialogClose();
      fetchCollection(); // Refresh the collection data
    } catch (error) {
      console.log('Failed to update request', error);
    } 
  }


  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <Box component="div" sx={{ p: 1, px: 2, textAlign: 'center', bgcolor: colors.primary[600] }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }} />
            <Typography variant="h5" sx={{ textTransform: 'uppercase', color: colors.grey[100] }}>
              Collection
            </Typography>
          </Box>
          <Link to="/finance/finance-treasury-collection">
            <IconButton color="secondary" aria-label="go to collection page">
              <ArrowCircleRightOutlinedIcon sx={{ fontSize: '25px' }} />
            </IconButton>
          </Link>
        </Box>
      </Box>

      {/* The list of collection requests */}
      <Grid item xs={12} md={6} sx={{ paddingTop: 0, paddingBottom: 0, overflow: 'scroll' }}>
        <Demo>
          <List dense={false} sx={{ display: 'flex', flexDirection: 'column', paddingTop: 0, paddingBottom: 0 }}>
            {collectionData.length > 0 ? (
              collectionData.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" color='success'  aria-label="view details" onClick={() => handleDialogOpen(item)}>
                        <ArrowCircleRightOutlinedIcon sx={{fontSize:'25px'}}/>
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                      <DonutLargeOutlinedIcon  sx={{fontSize:'25px'}} color='info'/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${item.description} - ${item.value} EGP`} />
                    <Chip
                      label={item.status ? item.status : ''}
                      sx={{ width: '200px', fontSize: '14px' }}
                      color="info"
                      variant="outlined"
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Typography sx={{ textAlign: 'center', p: 2 }}>No Data Available</Typography>
            )}
          </List>
        </Demo>
      </Grid>

      {/* Dialog for moving to In Progress */}
      {selectedItem && (
        <Dialog fullWidth="lg" open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
              <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
              Request Details
            </Box>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>

              {/* Item 1 */}
              <Grid item xs={12}>
                <Item>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center " }}>
                    <Typography variant="body1">
                      Status
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography>
                    
                      <Chip label= {selectedItem.status? selectedItem.status : (<>No Data</>)} sx={{fontSize:'15px', width:'150px'}} color="info" variant="outlined" />

                    </Typography>
                  </Box>
                </Item>
              </Grid>

              {/* Item 1 */}
              <Grid item xs={12}>
                <Item>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center " }}>
                    <Typography variant="body1">
                      ID
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography>
                      {selectedItem.id? selectedItem.id : <>No Data</>}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
              
              {/* Item 1 */}
              <Grid item xs={12}>
                <Item>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center " }}>
                    <Typography variant="body1">
                      Description
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography>
                      {selectedItem.description?selectedItem.description : (<>No Data</>)}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
              
              {/* Item 1 */}
              <Grid item xs={12}>
                <Item>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center " }}>
                    <Typography variant="body1">
                      Credit ID
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography>
                    {selectedItem.credit_id ? selectedItem.credit_id : <>No Data</>}
                    </Typography>
                  </Box>
                </Item>
              </Grid>

              {/* Item 1 */}
              <Grid item xs={12}>
                <Item>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center " }}>
                    <Typography variant="body1">
                      Credit Account Description
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography>
                      {selectedItem.credit_account_description ? selectedItem.credit_account_description : <>No Data</>}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
              
              {/* Item 1 */}
              <Grid item xs={12}>
                <Item>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center " }}>
                    <Typography variant="body1">
                      Dredit ID
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography>
                      {selectedItem.debit_id? selectedItem.debit_id : <>No Data</>}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
              
              {/* Item 1 */}
              <Grid item xs={12}>
                <Item>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center " }}>
                    <Typography variant="body1">
                      Debit Account Description
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography>
                    {selectedItem.debit_account_description? selectedItem.debit_account_description : <>No Data</>}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
              
              {/* Item 1 */}
              <Grid item xs={12}>
                <Item>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center " }}>
                    <Typography variant="body1">
                      Value
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography>
                      {selectedItem.value? (<>
                        {selectedItem.value } EGP
                      </>)
                        : (<>No Data</>)}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
              
              {/* Item 1 */}
              <Grid item xs={12}>
                <Item>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center " }}>
                    <Typography variant="body1">
                      Collection Type
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography>
                      {selectedItem.collection_type? selectedItem.collection_type : <>No Data</>}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
              

               {/* Item 1 */}
               <Grid item xs={12}>
                <Item>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center " }}>
                    <Typography variant="body1">
                      Type
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography>
                      {selectedItem.type? selectedItem.type : <>No Data</>}
                    </Typography>
                  </Box>
                </Item>
              </Grid>
                {/* Item 1 */}
                <Grid item xs={12}>
                <Item>
                  <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center " }}>
                    <Typography variant="body1">
                      Collection Date
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography>
                      {selectedItem.collection_date? selectedItem.collection_date : <>No Data</>}
                    </Typography>
                  </Box>
                </Item>
              </Grid>


            </Grid>

            {(selectedItem.status === "pending" || selectedItem.status === "check reject") && (<>
            
            <TextField
              name="collection_date"
              label="Collection Date"
              type="date"
              fullWidth
              sx={{ mt: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.collection_date}
              onChange={handleFormChange}
            />
            {formData.collection_type === 'Bank Check' && (
              <TextField
                name="check_collect"
                label="Check Collection Date"
                type="date"
                fullWidth
                sx={{ mt: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.check_collect}
                onChange={handleFormChange}
              />
            )}
            <TextField
              name="collection_type"
              label="Collection Type"
              select
              fullWidth
              sx={{ mt: 2 }}
              value={formData.collection_type}
              onChange={handleFormChange}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              <MenuItem value="Bank Check">Bank Check</MenuItem>
            </TextField>
             {/* New Select Input for Accounts */}
            <TextField
              name="credit_id"
              label="Select Account"
              select
              fullWidth
              sx={{ mt: 2 }}
              value={formData.credit_id}
              onChange={handleFormChange}
              >
              {accounts.map((account) => (
                <MenuItem key={account.id} value={account.id}>
                  {account.name}
                </MenuItem>
              ))}
            </TextField>
            </>)}
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button variant='outlined' onClick={handleDialogClose} color="error">
              Cancel
            </Button>
            {selectedItem.status === 'pending check collection' && (
              <>
              <Button variant='outlined' onClick={handleRejectCheck} color="error">
              Reject
            </Button>
              </>
            )}
            {selectedItem.status !== 'complete' && (
            <Button variant='outlined' onClick={handleConfirm} color="secondary">
              {selectedItem.status === 'in progress' || 'pending tresury Approve' ? <>Approve Request</> : <>Confirm</> }
            </Button>
            )}

          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Collection;
