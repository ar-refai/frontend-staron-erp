import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, MenuItem, Select, TextField, InputLabel } from '@mui/material';
import Lottie from 'lottie-react';
import Document from '../../../../../../../../assets/lottie/document.json';
import { ShowAllFactories } from 'apis/AdministrationApi/OrganiazationalPanel';

const AddSuppliesDialog = ({
  openAddDialog,
  setOpenAddDialog,
  formData,
  setFormData,
  handleAdd,
}) => {
  const [factories, setFactories] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState('');

  // Fetch factories from the API
  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const response = await ShowAllFactories();
        if (response.status === 200) {
          setFactories(response.data);
        }
      } catch (error) {
        console.error("Error fetching factories: ", error);
      }
    };

    fetchFactories();
  }, []);

  // Handle factory select change
  const handleFactoryChange = (event) => {
    setSelectedFactory(event.target.value);
    setFormData({ ...formData, factories_id: event.target.value });
  };

  return (
    <Dialog fullWidth='lg' open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
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
          Add A New Supplies Account
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {/* Facility Select Input */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-facility-label">Select Facility</InputLabel>
          <Select
            labelId="select-facility-label"
            value={selectedFactory}
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

        {/* Supplies Title Input */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Supplies Title"
            name="name"
            fullWidth
            margin="dense"
            value={formData?.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FormControl>

        {/* Supplies Amount Input */}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Supplies Amount"
            name="amount"
            fullWidth
            type="number"
            margin="dense"
            value={formData?.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </FormControl>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setOpenAddDialog(false)}
        >
          Cancel
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSuppliesDialog;
