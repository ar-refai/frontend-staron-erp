import { Box, Button, Divider, FilledInput, FormControl, InputAdornment, Modal, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import Lottie from 'lottie-react';
import Document from "../../../assets/lottie/document.json"
import { tokens } from "../../../theme";
import { useTheme } from '@emotion/react';

const AddDeductModal = ({showModal , setShowModal , value , handleChange , editValue , setEditValue , handleEditSave}) => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: colors.grey[800],
                        borderRadius: "10px",
                        boxShadow: 24,
                        padding: "15px 30px",
                    }}
                >
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                            Edit Addition && Deduction Time :
                        </Box>
                    </Typography>
                    <Divider />

                    {/* Two tabs for addition and deduction */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="edit type tabs"
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="fullWidth"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Tab label="Addition" />
                            <Tab label="Deduction" />
                        </Tabs>
                        {value === 0 && (
                            <Box>
                                {/* Addition input field */}
                                <FormControl sx={{ m: 1 }} variant="filled" fullWidth>
                                    <FilledInput
                                        id="filled-adornment-weight"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">Days</InputAdornment>
                                        }
                                        aria-describedby="filled-weight-helper-text"
                                        inputProps={{
                                            "aria-label": "Addition",
                                        }}
                                    />
                                </FormControl>
                            </Box>
                        )}
                        {value === 1 && (
                            <Box>
                                {/* Deduction input field */}
                                <FormControl sx={{ m: 1 }} variant="filled" fullWidth>
                                    <FilledInput
                                        id="filled-adornment-weight"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">Days</InputAdornment>
                                        }
                                        aria-describedby="filled-weight-helper-text"
                                        inputProps={{
                                            "aria-label": "Deduction",
                                        }}
                                    />
                                </FormControl>
                            </Box>
                        )}
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ mb: 2 }}
                            onClick={handleEditSave}
                        >
                            Save
                        </Button>
                    </Box>
                    <Divider />
                    <Box
                        sx={{
                            mt: 2,
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            marginTop: "20px",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => setShowModal(false)}
                            color="error"
                        >
                            Close
                        </Button>

                    </Box>
                </Box>
            </Modal>
  )
}

export default AddDeductModal