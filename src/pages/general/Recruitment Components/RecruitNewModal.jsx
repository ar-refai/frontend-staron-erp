import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography, useTheme } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react'
import Lottie from 'lottie-react';
import Document from "../../../assets/lottie/document.json"
import { tokens } from 'theme';

const RecruitNewModal = ({
    open , 
    handleClose ,
    newRequest ,
    handleChange ,
    handleDateChange ,
    handleAddRequest ,
    roles
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
                    background: colors.grey[800],
                    border: `1px solid ${colors.greenAccent[500]}`,
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderRadius: '10px'
                }}
            >
                <Typography variant="h6" component="h2">

                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                        <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                        Add New Recruitment Request
                    </Box>
                </Typography>
                <Divider />

                <FormControl fullWidth variant="filled">
                    <InputLabel>Role</InputLabel>
                    <Select
                        name="role"
                        value={newRequest.role}
                        onChange={handleChange}
                        label="Role"
                        style={{ color: colors.primary[200] }}
                    >
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                {role}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Description"
                    name="description"
                    value={newRequest.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    variant="filled"
                    rows={4}
                    InputLabelProps={{ style: { color: colors.primary[200] } }}
                    InputProps={{
                        style: { color: colors.primary[200] },
                    }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Start Date"
                        value={newRequest.date}
                        slotProps={{
                            openPickerIcon: { fontSize: 'large' },
                            openPickerButton: { color: 'secondary' },
                            textField: {
                                variant: 'filled',
                                focused: true,
                                color: 'secondary',
                            },
                        }}

                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </LocalizationProvider>
                <Divider />
                <Button variant="outlined" color="secondary" onClick={handleAddRequest}>
                    Add
                </Button>
            </Box>
        </Modal>
    )
}

export default RecruitNewModal