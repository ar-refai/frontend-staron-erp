import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, MenuItem, Select, TextField, InputLabel } from '@mui/material';
import Lottie from 'lottie-react';
import Document from '../../../../../../../../assets/lottie/document.json';
import { ShowAllFactories } from 'apis/AdministrationApi/OrganiazationalPanel';

const UpdateSubscriptionDialog = ({
  openUpdateDialog,
  setOpenUpdateDialog,
  formDataUpdate,
  setFormDataUpdate,
  handleUpdate,
}) => {
  const [factories, setFactories] = useState([]);

  // Fetch factories from the API
  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const response = await ShowAllFactories();
        if (response.status === 200) {
          setFactories(response.data);
        }
      } catch (error) {
        console.error('Error fetching factories: ', error);
      }
    };

    fetchFactories();
  }, []);

  // Handle factory selection
  const handleFactoryChange = (event) => {
    setFormDataUpdate({ ...formDataUpdate, factories_id: event.target.value });
  };

  return (
    <Dialog fullWidth='lg' open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            textTransform: 'uppercase',
          }}
        >
          <Lottie
            style={{ width: '30px', display: 'flex' }}
            animationData={Document}
          />
          Update Subscription Account
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {/* Facility Select Input */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-facility-label">Select Facility</InputLabel>
          <Select
            labelId="select-facility-label"
            value={formDataUpdate.factories_id}
            onChange={handleFactoryChange}
            label="Select Facility"
            fullWidth
          >
            {factories.map((factory) => (
              <MenuItem key={factory.id} value={factory.id}>
                {factory.factory_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Subscription Name Input */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Subscription Name"
            name="name"
            fullWidth
            margin="dense"
            value={formDataUpdate.name}
            onChange={(e) => setFormDataUpdate({ ...formDataUpdate, name: e.target.value })}
          />
        </FormControl>

        {/* Subscription Amount Input */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Subscription Amount"
            name="amount"
            type="number"
            fullWidth
            margin="dense"
            value={formDataUpdate.amount}
            onChange={(e) => setFormDataUpdate({ ...formDataUpdate, amount: e.target.value })}
          />
        </FormControl>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setOpenUpdateDialog(false)}
        >
          Cancel
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleUpdate}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateSubscriptionDialog;
