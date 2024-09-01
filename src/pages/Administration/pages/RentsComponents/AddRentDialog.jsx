import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, TextField } from '@mui/material'
import Lottie from 'lottie-react';
import Document from '../../../../assets/lottie/document.json';

const AddRentDialog = ({openAddDialog,setOpenAddDialog,formData,setFormData,handleAdd}) => {
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
        Add A New Rent Account
      </Box>
    </DialogTitle>
    <Divider />
    <DialogContent>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Rent Title"
          name='name'
          fullWidth
          margin="dense"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Rent Amount"
          name='amount'
          fullWidth
          type='number'
          margin="dense"
          value={formData.amount}
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
  )
}

export default AddRentDialog