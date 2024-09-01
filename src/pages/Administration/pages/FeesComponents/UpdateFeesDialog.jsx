import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, TextField } from '@mui/material'
import Lottie from 'lottie-react';
import Document from '../../../../assets/lottie/document.json';

const UpdateFeesDialog = ({ openUpdateDialog, setOpenUpdateDialog, formDataUpdate, setFormDataUpdate, handleUpdate }) => {
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
                    Update Fee Account
                </Box>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Fee Amount"
                        name='amount'
                        type='number'
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
    )
}

export default UpdateFeesDialog