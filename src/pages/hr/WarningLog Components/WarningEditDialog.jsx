import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem, Select, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from 'theme';
import Lottie from 'lottie-react';
import Document from "../../../assets/lottie/document.json";

const WarningEditDialog = ({editDialogOpen , handleClose , selectedEmployee ,warningLevel ,setWarningLevel ,reason , setReason , reasons , handleStoreWarning}) => {


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
    <Dialog open={editDialogOpen} onClose={handleClose}>
                <Box
                    sx={{
                        bgcolor: colors.grey[800],
                        borderRadius: '5px'
                    }}>
                    <DialogTitle>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                            Edit Warning Level for {selectedEmployee?.name}
                        </Box>
                    </DialogTitle>
                    <Divider />

                    <DialogContent>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                mt: 2,
                                width: '450px',
                            }}>
                            <Select
                                value={warningLevel}
                                onChange={(e) => setWarningLevel(e.target.value)}
                                displayEmpty
                                fullWidth
                                sx={{
                                    "&.Mui-focused": {
                                        borderColor: colors.blueAccent[300],
                                    }
                                }}
                            >
                                <MenuItem value="" disabled>Select Warning Level</MenuItem>
                                <MenuItem value={1}>Level 1</MenuItem>
                                <MenuItem value={2}>Level 2</MenuItem>
                                <MenuItem value={3}>Level 3</MenuItem>
                                <MenuItem value={4}>Level 4</MenuItem>
                            </Select>
                            <Select
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                defaultValue=""
                                displayEmpty
                                fullWidth
                            >
                                <MenuItem value="" disabled>Select Reason</MenuItem>
                                {reasons.map((reason) => (
                                    <MenuItem key={reason} value={reason}>
                                        {reason}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </DialogContent>
                    <Divider />

                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleStoreWarning}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
  )
}

export default WarningEditDialog