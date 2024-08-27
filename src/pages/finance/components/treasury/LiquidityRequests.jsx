import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { styled } from '@mui/system';
import Document from '../../../../assets/lottie/document.json'; 
import { Link, useParams } from 'react-router-dom';
import TagIcon from '@mui/icons-material/Tag';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { tokens } from 'theme';
import { AccountApprove, AccountsRepresentativeApprove, BankApprove, ChecksCollection, RejectChecksCollection, ShowAllRequests, ToInProgress, TreasuryApprove } from 'apis/FainanceApi/TreasuryRequests';
import Lottie from 'lottie-react';
import { ShowAllChildrenAccounts } from 'apis/FainanceApi/FinanceRequests';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';


const LiquidityRequests = () => {
  const [collectionData, setCollectionData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    collection_date: '',
    check_collect: '',
    collection_type: 'Cash',
    debit_id: ''

  });
  const [accounts, setAccounts] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  // The item inside the validation 
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? colors.grey[700] : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
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

  const fetchLiquidity = async () => {
    try {
      const response = await ShowAllRequests();
      // console.log("************");
      // console.log(response.data);
      // console.log("************");


      if (response.status === 200) {
        const data = response.data.filter((item) => (item.type === 'outcome'));
        setCollectionData(data);
        console.log(collectionData)
      }
    } catch (error) {
      console.log('Failed to load data', error);
    }
  };

  useEffect(() => {
    fetchAllAccounts();
    fetchLiquidity();
  }, []);

  const handleDialogOpen = (item) => {
    setSelectedRequest(item);
    // console.log(item.debit_id);
    // console.log(selectedRequest);
    // console.log(item);

    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRequest(null);
    setFormData({
      collection_date: '',
      check_collect: '',
      collection_type: 'Cash',
      debit_id: ''
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirm = async () => {
    const dataToSend = {
      collection_date: formData.collection_date,
      check_collect: formData.collection_type === 'Bank Check' ? formData.check_collect : null,
      collection_type: formData.collection_type,
      debit_id: formData.debit_id
    };
    if (selectedRequest.status === "in progress")
      {
        if(selectedRequest.collection_type === "Bank Transfer"){
          try {
            // Bank Approval
            console.log("Bank Approval");
            await BankApprove(selectedRequest.id);
            handleDialogClose();
            fetchLiquidity(); // Refresh the collection data
          } catch (error) {
            console.log("There Was An Error:",error);
          }
        }
        else {
          try {
            console.log('Representative approval');
            // Account Representative approval
            await AccountsRepresentativeApprove(selectedRequest.id);
            handleDialogClose();
            fetchLiquidity(); // Refresh the collection data
      
          } catch (error) {
            console.log("There Was An Error:",error);
          }
        }
      }
      else if (selectedRequest.status === "pending tresury Approve") {
          try {
            await TreasuryApprove(selectedRequest.id);
            handleDialogClose();
            fetchLiquidity(); // Refresh the collection data
          }
          catch (error) {
            console.log("There was an error: ",error);
          }
      }
      else if (selectedRequest.status === 'pending Account Approve') {
        try{
          await AccountApprove(selectedRequest.id);
          handleDialogClose();
          fetchLiquidity(); // Refresh the collection data
  
        }catch (error) {
          console.log("There was an error: ",error);
        }
      }
      else if(selectedRequest.status === 'pending check collection'){
        // await CheckCollection(selectedRequest.id);
        await ChecksCollection(selectedRequest.id);
        handleDialogClose();
        fetchLiquidity(); // Refresh the collection data
  
      }
      else if(selectedRequest.status === 'pending'){
        try {
          console.log("Data To Be Sent: ");
          console.log(dataToSend);
          await ToInProgress(selectedRequest.id, dataToSend);
          handleDialogClose();
          fetchLiquidity(); // Refresh the collection data
        } catch (error) {
          console.log('Failed to update request', error);
        }
      }
      else {
        try {
          console.log("Data To Be Sent: ");
          console.log(dataToSend);
          await ToInProgress(selectedRequest.id, dataToSend);
          handleDialogClose();
          fetchLiquidity(); // Refresh the collection data
        } catch (error) {
          console.log('Failed to update request', error);
        }
      }
  }
    
  // when check is rejected it is treated as pending 
  const handleRejectCheck = async () => {
    try {
      await RejectChecksCollection(selectedRequest.id)
      handleDialogClose();
      fetchLiquidity(); // Refresh the collection data
    } catch (error) {
      console.log('Failed to update request', error);
    } 
  }

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: colors.primary[400],
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }));

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box component="div" sx={{ p: 1, px: 2, textAlign: "center", bgcolor: colors.primary[600] }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
            <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }} />
            <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
              Liquidity Requests
            </Typography>
          </Box>
          <Link to='/finance/finance-ar-requests'>
            <IconButton color="secondary" aria-label="add to shopping cart">
              <ArrowCircleRightOutlinedIcon sx={{ fontSize: '25px' }} />
            </IconButton>
          </Link>
        </Box>
      </Box>

      {/* The list of collection requests */}
      <Grid item xs={12} md={6} sx={{ paddingTop: 0, paddingBottom: 0, overflow: 'scroll' }}>
        <Demo >
          <List dense={false} sx={{ display: 'flex', flexDirection: 'column', paddingTop: 0, paddingBottom: 0 }}>
            {collectionData.length > 0 ? collectionData.map((item) => (
              <>
                <ListItem
                  key={item.id} // Assuming 'id' is a unique identifier
                  secondaryAction={
                    <IconButton edge="end" aria-label="view details" onClick={() => handleDialogOpen(item)}>
                      <ArrowCircleRightOutlinedIcon  sx={{fontSize:'25px'}} color='success'/>
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                    <DonutLargeOutlinedIcon  sx={{fontSize:'25px'}} color='info'/>

                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${item.description}`} />
                  <Box sx={{display:"flex",flexDirection:"column" ,mr:'10px'}}>

                  <ListItemText primary={`${item.type}`} />
                  <ListItemText primary={`${item.value} EGP`} />
                  </Box>
                  <Chip label={item.status? item.status : (<></>)} sx={{width:'100px' , fontSize:'14px'}} color="info" variant="outlined" />
                </ListItem>
                <Divider />
              </>
            )) :
              <>
              <Typography sx={{ textAlign: 'center', p: 2 }}>No Data Available</Typography>
              </>
            }
          </List>
        </Demo>
      </Grid>

      {/* Dialog for Request Details */}
      {selectedRequest && (
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
      
        <Chip label= {selectedRequest.status? selectedRequest.status : (<>No Data</>)} sx={{fontSize:'15px', width:'150px'}} color="info" variant="outlined" />

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
        {selectedRequest.id? selectedRequest.id : <>No Data</>}
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
        {selectedRequest.description?selectedRequest.description : (<>No Data</>)}
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
      {selectedRequest.credit_id ? selectedRequest.credit_id : <>No Data</>}
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
        {selectedRequest.credit_account_description ? selectedRequest.credit_account_description : <>No Data</>}
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
        {selectedRequest.debit_id? selectedRequest.debit_id : <>No Data</>}
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
      {selectedRequest.debit_account_description? selectedRequest.debit_account_description : <>No Data</>}
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
        {selectedRequest.value? (<>
          {selectedRequest.value } EGP
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
        {selectedRequest.collection_type? selectedRequest.collection_type : <>No Data</>}
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
        {selectedRequest.type? selectedRequest.type : <>No Data</>}
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
        {selectedRequest.collection_date? selectedRequest.collection_date : <>No Data</>}
      </Typography>
    </Box>
  </Item>
</Grid>


</Grid>

            {(selectedRequest.status === "pending" || selectedRequest === "check reject") && (<>
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
              name="debit_id"
              label="Select Account"
              select
              fullWidth
              sx={{ mt: 2 }}
              value={formData.debit_id}
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
            {selectedRequest.status === 'pending check collection' && (
              <>
              <Button variant='outlined' onClick={handleRejectCheck} color="error">
              Reject
            </Button>
              </>
            )}
            {selectedRequest.status !== 'complete' && (
            <Button variant='outlined' onClick={handleConfirm} color="secondary">
              {selectedRequest.status === 'in progress' || 'pending tresury Approve' ? <>Approve Request</> : <>Confirm</> }
            </Button>
            )}

          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default LiquidityRequests;
