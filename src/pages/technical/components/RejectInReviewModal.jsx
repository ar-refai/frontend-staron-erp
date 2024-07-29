import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import Lottie from 'lottie-react'
import Document from '../../../assets/lottie/document.json';

const RejectInReviewModal = ({ isOpen, onClose, onSubmit, seconedRejectReason, handleSeconedRejectReasonChange }) => {
    return (
        <Dialog maxWidth="lg" open={isOpen} onClose={onClose}>
            <DialogTitle>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                    <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                    Rejection
                </Box>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ minWidth: '700px' }}>
                <Typography>
                    Reason of rejection:
                </Typography>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="State a reason"
                        value={seconedRejectReason}
                        onChange={handleSeconedRejectReasonChange}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                    />
                </FormControl>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={onClose} color="secondary" variant="outlined">Cancel</Button>
                <Button onClick={onSubmit} color="error" variant="outlined">Reject</Button>
            </DialogActions>
        </Dialog>
    )
}

export default RejectInReviewModal