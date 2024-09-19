import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material'
import Lottie from 'lottie-react';
import Document from "../../../assets/lottie/document.json"
import { ThemeColor } from 'components/ThemeColor';

const PayrollReviewModal = ({
    showReviewModal,
    handleCloseReviewModal,
    filteredData
}) => {
    const colors = ThemeColor();
    console.log(filteredData);
    return (
        <Dialog
            open={showReviewModal}
            onClose={handleCloseReviewModal}
            aria-labelledby="description-dialog-title"
        >
            <Box
                sx={{
                    bgcolor: colors.grey[800]
                }}
            >
                {/* ---------------------------- */}
                <DialogTitle id="description-dialog-title">
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                        <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                        Payroll Review
                    </Box>
                </DialogTitle>
                {/* ---------------------------- */}
                <Divider />
                <DialogContent sx={{ padding: "30px 80px" }}>
                    <DialogContentText sx={{ textAlign: 'start' }}>Some Employee</DialogContentText>
                </DialogContent>
                <Divider />
                {/* ---------------------------- */}
                <DialogActions>
                    <Button
                        onClick={handleCloseReviewModal}
                        variant='outlined'
                        color='error'
                    >
                        Close
                    </Button>
                </DialogActions>
                {/* --------------------------- */}
            </Box>
        </Dialog>
    )
}

export default PayrollReviewModal