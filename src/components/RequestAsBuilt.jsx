import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const today = dayjs();

const isInCurrentMonth = (date) => date.get('month') === dayjs().get('month');

const ControlRfASB = () => {
    const [formData, setFormData] = useState({});
    const [formErrorData, setFormErrorData] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDateChange = (date) => {
        setFormData({ ...formData, date });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = {};

        if (!formData?.date || !formData?.location) {
            if (!formData?.date) {
                errors.date = 'The date is required';
            }
            if (!formData?.location) {
                errors.location = 'The location is required';
            }

            // Update the error state with the new errors
            setFormErrorData(errors);
        } else {
            setFormErrorData({});

            // Simulate sending operation (dummy operation)
            simulateSendOperation(formData)
                .then(() => {
                    // Navigate to Sales Request page on success
                    navigate('/Sales-Request');
                })
                .catch(function (error) {
                    // handle error (not implemented for dummy data)
                    console.log(error);
                });
        }
    };

    const simulateSendOperation = (formData) => {
        return new Promise((resolve, reject) => {
            // Simulate API call with timeout (dummy data)
            setTimeout(() => {
                resolve({ status: 200 }); // Simulate success
                // For error simulation, you can use:
                // reject(new Error('Failed to send operation'));
            }, 1000); // Simulate 1 second delay
        });
    };

    // Initialize form data on component mount
    useState(() => {
        setFormData({ ...formData, technecal_requests_id: id });
    }, []);

    return (
        <>
            <Box m="20px">
                <Typography variant="h5" gutterBottom>
                    Asbuild Request
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box mb={5} display="flex" flexDirection="row">
                        <Box flex={1} mr={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    fullWidth
                                    label="Date"
                                    name="date"
                                    value={formData.date || null}
                                    onChange={handleDateChange}
                                    shouldDisableMonth={isInCurrentMonth}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            error={!!formErrorData.date}
                                            helperText={formErrorData.date}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box flex={1} ml={2}>
                            <TextField
                                fullWidth
                                id="location"
                                name="location"
                                label="Location"
                                variant="outlined"
                                onChange={handleInputChange}
                                error={!!formErrorData.location}
                                helperText={formErrorData.location}
                            />
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="center">
                        <Button fullWidth sx={{fontSize:'15px'}} variant="contained" color="secondary" type="submit">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default ControlRfASB;
