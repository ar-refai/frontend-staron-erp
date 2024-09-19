// PayrollFilters.js
import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const PayrollFilters = ({
    searchQuery,
    onMonthChange,
    data,
    selectedDepartment,
    onDepartmentChange,
}) => {
    const departments = Array.isArray(data)
        ? [...new Set(data.map((row) => row.user.department))]
        : [];

    return (
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'end', gap: '20px' }}>
            <FormControl variant="filled" sx={{ minWidth: 200, marginTop: 2 }}>
                <InputLabel id="department-select-label">Department</InputLabel>
                <Select
                    labelId="department-select-label"
                    value={selectedDepartment}
                    onChange={(e) => onDepartmentChange(e.target.value)}
                    sx={{
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'primary.main',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&:hover > fieldset': {
                                borderColor: 'primary.main',
                            },
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'primary.main',
                        },
                        '& .MuiFilledInput-root:before': {
                            borderBottomColor: 'primary.main',
                        },
                        '& .MuiFilledInput-root:after': {
                            borderBottomColor: 'primary.main',
                        },
                        '& .MuiFilledInput-root:hover:not(.Mui-disabled):before': {
                            borderBottomColor: 'primary.main',
                        },
                    }}
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {departments.map((department) => (
                        <MenuItem key={department} value={department}>
                            {department}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={'Month and Year'}
                    views={['month', 'year']}
                    value={searchQuery}
                    onChange={onMonthChange}
                    slots={{
                        textField: (params) => <TextField {...params} variant='filled' size='medium' />,
                    }}
                    sx={{
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'primary.main',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&:hover > fieldset': {
                                borderColor: 'primary.main',
                            },
                        },
                        '& .MuiSvgIcon-root': {
                            color: 'primary.main',
                        },
                        '& .MuiFilledInput-root:before': {
                            borderBottomColor: 'primary.main',
                        },
                        '& .MuiFilledInput-root:after': {
                            borderBottomColor: 'primary.main',
                        },
                        '& .MuiFilledInput-root:hover:not(.Mui-disabled):before': {
                            borderBottomColor: 'primary.main',
                        },
                    }}
                />
            </LocalizationProvider>
        </Box>
    );
};

export default PayrollFilters;
