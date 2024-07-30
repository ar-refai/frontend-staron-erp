import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import React from 'react'

const SubmitDrafting = () => {
    return (
        <Dialog
            sx={{ width: '700px', margin: 'auto' }}
            open={isFileUploadModalOpen}
            onClose={() => setIsFileUploadModalOpen(false)}
        >
            <Box sx={{ bgcolor: colors.grey[800], borderRadius: '5px' }}>
                <DialogTitle>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                        <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                        Request Quantity Survey:
                    </Box>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ minWidth: '500px', margin: 'auto' }}>
                    <input
                        style={{ display: 'none' }}
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload">
                        <Button variant="outlined" color="secondary" component="span">
                            Upload File
                        </Button>
                        <Typography
                            sx={{ color: colors.primary[100], display: 'inline', marginLeft: '10px' }}
                        >
                            Upload The Request Quantity Survey Zipped File
                        </Typography>
                    </label>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button
                        variant='outlined'
                        color="secondary"
                        onClick={() => handleUpload(selectedRow, selectedFile)}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant='outlined'
                        color="error"
                        onClick={() => setIsFileUploadModalOpen(false)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default SubmitDrafting