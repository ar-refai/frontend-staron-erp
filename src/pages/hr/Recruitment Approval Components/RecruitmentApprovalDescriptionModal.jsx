import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, useTheme } from '@mui/material'
import React from 'react'
import Lottie from 'lottie-react';
import Document from "../../../assets/lottie/document.json"
import { tokens } from 'theme';

const RecruitmentApprovalDescriptionModal = ({
    showDescriptionModal , 
    handleCloseDescriptionModal ,
    selectedDescription , 
}) => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Dialog
        open={showDescriptionModal}
        onClose={handleCloseDescriptionModal}
        aria-labelledby="description-dialog-title"
    >
        <Box
        sx={{
            bgcolor:colors.grey[800]
        }}
        >

        <DialogTitle id="description-dialog-title">
            <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
            <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
            Request Description
            </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ padding: "30px 80px" }}>
            <DialogContentText sx={{ textAlign: 'start' }}>{selectedDescription}</DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
            <Button 
                        onClick={handleCloseDescriptionModal} 
                        variant='outlined'
                        color='error'
                    >
                Close
            </Button>
        </DialogActions>
        </Box>
    </Dialog>

    )
}

export default RecruitmentApprovalDescriptionModal