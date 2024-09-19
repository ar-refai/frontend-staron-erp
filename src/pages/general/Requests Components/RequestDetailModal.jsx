import React from 'react';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import Lottie from 'lottie-react';
import Document from "../../../assets/lottie/document.json";
import { useTheme } from '@mui/system';
import { tokens } from '../../../theme';

const RequestDetailsModal = ({
    open,
    handleClose,
    request,
    handleChange,
    handleUpdate,
    isEditable,
    requestTypes,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    // Function to format the date as 'yyyy-MM-dd'
const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Function to format the time as 'HH:mm'
const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

    if (!request) return null;
    console.log(request);
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
                    Update Request
                </Box>
                <Divider />

                {/* Request Type */}
                <FormControl fullWidth variant="filled">
                    <InputLabel>Request Type</InputLabel>
                    <Select
                        name="request_type"
                        value={request.request_type}
                        onChange={handleChange}
                        color="secondary"
                        disabled={!isEditable}
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
                    value={request.description}
                    onChange={handleChange}
                    fullWidth
                    color="secondary"
                    disabled={!isEditable}
                />

                {/* Conditional fields */}
                {['Errands', 'Clock In Excuse', 'Clock Out Excuse'].includes(request.request_type) && (
                    <>
                        {/* Date, Clock-In and Clock-Out */}
                        <TextField
                            label="Day Date"
                            type="date"
                            name="date"
                            variant="filled"
                            value={formatDate(request.date)}  // format the date correctly
                            onChange={handleChange}
                            fullWidth
                            color="secondary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={!isEditable}
                        />
                        <TextField
                            label="Clock In"
                            type="time"
                            name="from_ci"
                            variant="filled"
                            value={formatTime(request.from_ci)}
                            onChange={handleChange}
                            fullWidth
                            color="secondary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={!isEditable}
                        />
                        <TextField
                            label="Clock Out"
                            type="time"
                            name="to_co"
                            variant="filled"
                            value={formatTime(request.to_co)}
                            onChange={handleChange}
                            fullWidth
                            color="secondary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={!isEditable}
                        />
                    </>
                )}

                {['Sick Leave', 'Annual Vacation', 'Absent'].includes(request.request_type) && (
                    <>
                        <TextField
                            label="From"
                            type="date"
                            name="from_date"
                            variant="filled"
                            value={formatDate(request.from_date)}
                            onChange={handleChange}
                            fullWidth
                            color="secondary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={!isEditable}
                        />
                        <TextField
                            label="To"
                            type="date"
                            name="date"
                            variant="filled"
                            value={formatDate(request.date)}
                            onChange={handleChange}
                            fullWidth
                            color="secondary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={!isEditable}
                        />
                    </>
                )}

                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button
                        variant="outlined"
                        color='secondary'
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    {isEditable && (
                        <Button
                            variant="outlined"
                            color='secondary'
                            onClick={handleUpdate}
                        >
                            Update Request
                        </Button>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default RequestDetailsModal;
