    import React, { useMemo, useState, useEffect } from 'react';
    import { MaterialReactTable } from 'material-react-table';
    import { Box, Button, Typography, Modal, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
    import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
    import { DatePicker } from '@mui/x-date-pickers/DatePicker';
    import dayjs from 'dayjs';
    import { useTheme } from '@mui/material/styles';
    import { tokens } from '../../theme';
    import UserImage from '../../assets/user.jpg';

    // Dummy data for demonstration
    const data = [
        {
            profileimage: UserImage,
            name: 'John Doe',
            date: '2024-05-19',
            hr_code: 'HR001',
            department: 'Sales',
            TimeStamp: '2024-05-19T08:00:00Z',
            startwork: '2024-05-19T09:00:00Z',
            endwork: '2024-05-19T17:00:00Z',
            Absent: false,
            clockin: '08:30',
            Must_C_In: true,
            Clock_In: '08:30',
            clockout: '17:30',
            Must_C_Out: true,
            Clock_Out: '17:30',
            Work_Time: '8h',
            note: '',
            addetion: 0,
            deduction: 0,
            isemploee: 1,
        },
        {
            profileimage: UserImage,
            name: 'Jane Smith',
            date: '2024-05-21',
            hr_code: 'HR002',
            department: 'Marketing',
            TimeStamp: '2024-05-21T08:00:00Z',
            startwork: '2024-05-21T09:00:00Z',
            endwork: '2024-05-21T17:00:00Z',
            Absent: false,
            clockin: '08:30',
            Must_C_In: true,
            Clock_In: '08:30',
            clockout: '17:30',
            Must_C_Out: true,
            Clock_Out: '17:30',
            Work_Time: '8h',
            note: '',
            addetion: 0,
            deduction: 0,
            isemploee: 1,
        },
        // Add more dummy data as needed
    ];

    const TimeSheet = () => {
        const [showModal, setShowModal] = useState(false);
        const [startDate, setStartDate] = useState(dayjs().subtract(1, 'month'));
        const [endDate, setEndDate] = useState(dayjs());
        const [specificDate, setSpecificDate] = useState(dayjs());
        const [filteredData, setFilteredData] = useState(data);
        const [filterOption, setFilterOption] = useState('specificDate');
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);

        const handleAddition = (index) => {
            setFilteredData((prevData) =>
                prevData.map((item, idx) =>
                    idx === index ? { ...item, addetion: item.addetion + 1 } : item
                )
            );
        };

        const handleDeduction = (index) => {
            setFilteredData((prevData) =>
                prevData.map((item, idx) =>
                    idx === index ? { ...item, deduction: item.deduction + 1 } : item
                )
            );
        };

        const columns = useMemo(
            () => [
                {
                    accessorKey: 'profileimage',
                    header: 'Profile Image',
                    Cell: ({ cell }) => <img src={UserImage} alt="profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />,
                    size: 50,
                },
                {
                    accessorKey: 'name',
                    header: 'Full Name',
                    size: 100,
                },
                {
                    accessorKey: 'hr_code',
                    header: 'Employee ID',
                    size: 100,
                },
                {
                    accessorKey: 'department',
                    header: 'Department',
                    size: 100,
                },
                {
                    accessorKey: 'TimeStamp',
                    header: 'Date',
                    Cell: ({ cell }) => (
                        <>
                            <div>{dayjs(cell.getValue()).format('YYYY-MM-DD')}</div>
                        </>
                    ),
                    size: 150,
                },
                {
                    accessorKey: 'Absent',
                    header: 'Absent',
                    Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
                    size: 100,
                },
                {
                    accessorKey: 'addetion',
                    header: 'Additions',
                    size: 100,
                    Cell: ({ cell, row }) => (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>{cell.getValue()}</span>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor:colors.blueAccent[400],
                                    color:colors.blueAccent[400],
                                    "&:hover": {
                                        borderColor:colors.blueAccent[200],
                                        color:colors.blueAccent[200],

                                    }
                                }}
                                size="small"
                                onClick={() => handleAddition(row.index)}
                            >
                                Add
                            </Button>
                        </div>
                    ),
                },
                {
                    accessorKey: 'deduction',
                    header: 'Deductions',
                    size: 100,
                    Cell: ({ cell, row }) => (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>{cell.getValue()}</span>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor:colors.redAccent[400],
                                    color:colors.redAccent[400],
                                    "&:hover": {
                                        borderColor:colors.redAccent[200],
                                        color:colors.redAccent[200],

                                    }
                                }}
                                size="small"
                                onClick={() => handleDeduction(row.index)}
                            >
                                Deduct
                            </Button>
                        </div>
                    ),
                },
            ],
            []
        );

        useEffect(() => {
            if (filterOption === 'specificDate') {
                const selectedDate = specificDate.format('YYYY-MM-DD');
                setFilteredData(data.filter(entry => entry.date === selectedDate));
            } else {
                const filtered = data.filter((entry) => {
                    const entryDate = dayjs(entry.date);
                    return entryDate.isAfter(startDate) && entryDate.isBefore(endDate);
                });
                setFilteredData(filtered);
            }
        }, [filterOption, startDate, endDate, specificDate]);

        return (
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4">
                        
                        
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: colors.primary[400] }}
                        onClick={() => setShowModal(true)}
                    >
                        Upload Attendance
                    </Button>
                </Box>

                <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <RadioGroup
                        name="filter-option"
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                        row
                    >
                        <FormControlLabel
                            value="specificDate"
                            control={<Radio sx={{ color: colors.redAccent[300], '&.Mui-checked': { color: colors.redAccent[200] } }} />}
                            label="Specific Day"
                            sx={{ color: colors.primary[200] }}
                        />
                        <FormControlLabel
                            value="dateRange"
                            control={<Radio sx={{ color: colors.redAccent[300], '&.Mui-checked': { color: colors.redAccent[300] } }} />}
                            label="Date Range"
                            sx={{ color: colors.primary[200] }}
                        />
                    </RadioGroup>
                </FormControl>

                {filterOption === 'dateRange' && (
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Start Date"
                                format="YYYY/MM/DD"
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                slots={{
                                    textField: (params) => <TextField
                                        variant='filled'
                                        {...params} />
                                }}
                                sx={{
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: colors.primary[200],
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&:hover > fieldset": {
                                            borderColor: colors.primary[200]
                                        },
                                    },
                                    "& .MuiSvgIcon-root": {
                                        color: colors.redAccent[400]
                                    },
                                    "& .MuiFilledInput-root:before": {
                                        borderBottomColor: colors.redAccent[300],
                                    },
                                    "& .MuiFilledInput-root:after": {
                                        borderBottomColor: colors.redAccent[300],
                                    },
                                    "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                                        borderBottomColor: colors.redAccent[300],
                                    },
                                }}
                            />
                            <DatePicker
                                label="End Date"
                                format="YYYY/MM/DD"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                slots={{
                                    textField: (params) => <TextField
                                        variant='filled'
                                        {...params} />
                                }}
                                sx={{
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: colors.primary[200],
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&:hover > fieldset": {
                                            borderColor: colors.primary[200]
                                        },
                                    },
                                    "& .MuiSvgIcon-root": {
                                        color: colors.redAccent[400]
                                    },
                                    "& .MuiFilledInput-root:before": {
                                        borderBottomColor: colors.redAccent[300],
                                    },
                                    "& .MuiFilledInput-root:after": {
                                        borderBottomColor: colors.redAccent[300],
                                    },
                                    "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                                        borderBottomColor: colors.redAccent[300],
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                )}
                {filterOption === 'specificDate' && (
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select Date"
                                format="YYYY/MM/DD"
                                value={specificDate}
                                onChange={(newValue) => setSpecificDate(newValue)}
                                slots={{
                                    textField: (params) => <TextField
                                        variant='filled'
                                        {...params} />
                                }}
                                sx={{
                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: colors.primary[200],
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&:hover > fieldset": {
                                            borderColor: colors.primary[200]
                                        },
                                    },
                                    "& .MuiSvgIcon-root": {
                                        color: colors.redAccent[400]
                                    },
                                    "& .MuiFilledInput-root:before": {
                                        borderBottomColor: colors.redAccent[300],
                                    },
                                    "& .MuiFilledInput-root:after": {
                                        borderBottomColor: colors.redAccent[300],
                                    },
                                    "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                                        borderBottomColor: colors.redAccent[300],
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                )}
                <MaterialReactTable
                    columns={columns}
                    data={filteredData}
                    layoutMode="grid"
                    renderDetailPanel={({ row }) => (
                        <div>
                            <div style={{ display: 'grid', gap: '10px', padding: '10px', backgroundColor: colors.primary[400], border: `1px solid ${colors.primary[300]}`, borderRadius: '5px' }}>
                                <span style={{ fontSize: '18px', fontWeight: 'bold', gridColumn: '1 / span 2' }}>Details:</span>
                                <div style={{ display: 'grid', gap: '5px', gridTemplateColumns: 'auto auto' }}>
                                    <span style={{ fontWeight: 'bold' }}>Note:</span>
                                    <span>{row.original.note}</span>
                                    <span style={{ fontWeight: 'bold' }}>Start Work:</span>
                                    <span>{row.original.startwork}</span>
                                    <span style={{ fontWeight: 'bold' }}>End Work:</span>
                                    <span>{row.original.endwork}</span>
                                    <span style={{ fontWeight: 'bold' }}>Time Stamp:</span>
                                    <span>{row.original.TimeStamp}</span>
                                    <span style={{ fontWeight: 'bold' }}>Absent:</span>
                                    <span>{row.original.Absent ? 'Yes' : 'No'}</span>
                                    <span style={{ fontWeight: 'bold' }}>Must Clock In:</span>
                                    <span>{row.original.clockin}</span>
                                    <span style={{ fontWeight: 'bold' }}>Actual Clock In:</span>
                                    <span>{row.original.Clock_In}</span>
                                    <span style={{ fontWeight: 'bold' }}>Must Clock Out:</span>
                                    <span>{row.original.clockout}</span>
                                    <span style={{ fontWeight: 'bold' }}>Actual Clock Out:</span>
                                    <span>{row.original.Clock_Out}</span>
                                    <span style={{ fontWeight: 'bold' }}>Working Duration:</span>
                                    <span>{row.original.Work_Time}</span>
                                    <span style={{ fontWeight: 'bold' }}>Additions:</span>
                                    <span>{row.original.addetion} Day(s)</span>
                                    <span style={{ fontWeight: 'bold' }}>Deductions:</span>
                                    <span>{row.original.deduction} Day(s)</span>
                                    <span style={{ fontWeight: 'bold' }}>Status:</span>
                                    <span>{row.original.isemploee === 1 ? 'Active' : 'NOT Active'}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
                    rowVirtualizerProps={{ overscan: 5 }}
                    columnVirtualizerProps={{ overscan: 2 }}
                />

                <Modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: colors.primary[400],
                            border: `2px solid ${colors.primary[100]}`,
                            borderRadius: '10px',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography id="modal-title" variant="h6" component="h3">
                            Upload Attendance
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            Select an Excel file to upload attendance data.
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                                sx={{
                                    mb: 2,
                                    backgroundColor: colors.blueAccent[200],
                                    color: colors.primary[700],
                                    '&:hover': {
                                        backgroundColor: colors.blueAccent[300],
                                        color: colors.primary[700]
                                    }
                                }}
                            >
                                Choose File
                                <input type="file" hidden />
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="outlined"
                                onClick={() => setShowModal(false)}
                                sx={{
                                    mr: 2,
                                    backgroundColor: colors.redAccent[200],
                                    color: colors.primary[700],
                                    '&:hover': {
                                        backgroundColor: colors.redAccent[300],
                                        color: colors.primary[700]
                                    }

                                }}
                            >
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    backgroundColor: colors.greenAccent[200],
                                    color: colors.primary[700],
                                    '&:hover': {
                                        backgroundColor: colors.greenAccent[300],
                                        color: colors.primary[700]
                                    }

                                }}
                            >
                                Upload
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        );
    };

    export default TimeSheet;
