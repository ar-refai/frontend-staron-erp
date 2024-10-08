import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import React from 'react'
import Lottie from 'lottie-react';
import Document from "../../../assets/lottie/document.json"
import { useTheme } from '@mui/system';
import { tokens } from '../../../theme';

const NewRequestModal = ({
    open,
    handleClose,
    newRequest,
    handleChange,
    requestTypes,
    handleAddRequest,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 900,
                    bgcolor: colors.grey[800],
                    border: `1px solid ${colors.greenAccent[400]}`,
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                    <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                    Add New Request
                </Box>
                <Divider />

                {/* Request Type */}
                <FormControl fullWidth variant="filled">
                    <InputLabel>Request Type</InputLabel>
                    <Select
                        name="request_type"
                        value={newRequest.request_type}
                        onChange={handleChange}
                        color="secondary"
                    >
                        {requestTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Request Description */}
                <TextField
                    label="Request Description"
                    name="description"
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="filled"
                    value={newRequest.description}
                    onChange={handleChange}
                    fullWidth
                    color="secondary"
                />

                {['Errands', 'Clock In Excuse', 'Clock Out Excuse'].includes(newRequest.request_type) && (
                    <>
                        {/* Date , Clock-In and Clock-Out*/}
                        <TextField
                            label="Day Date"
                            type="date"
                            name="date"
                            variant="filled"
                            value={newRequest.date}
                            onChange={handleChange}
                            fullWidth
                            color="secondary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Clock In"
                            type="time"
                            name="from_ci"
                            variant="filled"
                            value={newRequest.from_ci}
                            onChange={handleChange}
                            fullWidth
                            color="secondary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Clock Out"
                            type="time"
                            name="to_co"
                            variant="filled"
                            value={newRequest.to_co}
                            onChange={handleChange}
                            fullWidth
                            color="secondary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </>
                )}

                {['Sick Leave', 'Annual Vacation', 'Absent'].includes(newRequest.request_type) && (
                    <>
                        <TextField
                            label="From"
                            type="date"
                            name="from_date"
                            variant="filled"
                            value={newRequest.from_date}
                            onChange={handleChange}
                            fullWidth
                            color="secondary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="To"
                            type="date"
                            name="to_date"
                            variant="filled"
                            value={newRequest.to_date}
                            onChange={handleChange}
                            fullWidth
                            color="secondary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </>
                )}

                <Divider />
                <Button
                    variant="outlined"
                    color='secondary'
                    sx={{
                        paddingBlock: '10px',
                    }}
                    onClick={handleAddRequest}
                >
                    Issue New Request
                </Button>
            </Box>
        </Modal>
    )
}

export default NewRequestModal