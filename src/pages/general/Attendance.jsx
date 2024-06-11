import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button, Typography, Modal, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';
import UserImage from '../../assets/user.jpg';
import TagIcon from '@mui/icons-material/Tag';

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

const Attendance = () => {
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(dayjs().subtract(1, 'month'));
    const [endDate, setEndDate] = useState(dayjs());
    const [specificDate, setSpecificDate] = useState(dayjs());
    const [filteredData, setFilteredData] = useState(data);
    const [filterOption, setFilterOption] = useState('specificDate');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
                Cell: ({ cell }) => dayjs(cell.getValue()).format('YYYY-MM-DD'),
                size: 75,
            },
            {
                accessorKey: 'Absent',
                header: 'Absent',
                Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
                size: 100,
            },
            {
                accessorKey: 'clockin',
                header: 'Clock In',
                size: 100,
            },
            {
                accessorKey: 'clockout',
                header: 'Clock Out',
                size: 100,
            },
            {
                accessorKey: 'Must_C_In',
                header: 'Must Clock In',
                Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
                size: 100,
            },
            {
                accessorKey: 'Clock_In',
                header: 'Actual Clock In',
                size: 100,
            },
            {
                accessorKey: 'Must_C_Out',
                header: 'Must Clock Out',
                Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
                size: 100,
            },
            {
                accessorKey: 'Clock_Out',
                header: 'Actual Clock Out',
                size: 100,
            },
            {
                accessorKey: 'Work_Time',
                header: 'Working Duration',
                size: 100,
            },
            {
                accessorKey: 'note',
                header: 'Note',
                size: 100,
            },
            {
                accessorKey: 'addetion',
                header: 'Additions (Days)',
                size: 100,
            },
            {
                accessorKey: 'deduction',
                header: 'Deductions (Days)',
                size: 100,
            },
            {
                accessorKey: 'isemploee',
                header: 'Status',
                Cell: ({ cell }) => (cell.getValue() === 1 ? 'Active' : 'NOT Active'),
                size: 100,
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
                return entryDate.isSame(startDate, 'day') || entryDate.isSame(endDate, 'day') || (entryDate.isAfter(startDate) && entryDate.isBefore(endDate));
            });
            setFilteredData(filtered);
        }
    }, [filterOption, startDate, endDate, specificDate]);

    const table = useMaterialReactTable({
        columns,
        data: filteredData, // data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        defaultColumn: {
            minSize: 20, //allow columns to get smaller than default
            maxSize: 9001, //allow columns to get larger than default
            size: 260, //make columns wider by default
        },
        muiPaginationProps: {
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30],
            shape: 'rounded',
            variant: 'outlined',
       },
        paginationDisplayMode: 'pages',

        enableDensityToggle: true,
        enableRowVirtualization: true,
        muiSkeletonProps: {
            animation: 'wave',
        },
         
        initialState: { columnVisibility: { isemploee: false , note: false , Must_C_In:false ,Must_C_Out:false,profileimage:false } }, //hide firstName column by default
        muiTablePaperProps: {
            elevation: 2, //change the mui box shadow
            //customize paper styles
            sx: {
                borderRadius: '20px',
            }
        },    
        muiTableContainerProps: { sx: { maxHeight: '600px', backgroundColor: colors.primary[400] } },
        muiTableHeadCellProps: { sx: { backgroundColor: colors.primary[400] } },
        muiTableBodyCellProps: { sx: { backgroundColor: colors.primary[400] } },
        muiTableBodyProps: {sx: { backgroundColor: colors.primary[400] } },
        muiBottomToolbarProps: ({table}) => ({
            sx: { backgroundColor: colors.primary[400]}
        })
    });

    return (
        <>
            <Box
                sx={{
                    backgroundColor: colors.primary[400],
                    padding: '12px 40px',
                    margin: '20px ',
                    borderRadius: '10px',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <TagIcon sx={{ color: colors.redAccent[500], fontSize: '40px' }} />
                    <Typography
                        variant="h2"
                        sx={{
                            color: colors.primary[200],
                            marginLeft: '10px',
                            padding: '10px 12px',
                        }}
                    >
                        Attendance Table
                    </Typography>
                </Box>
            </Box>

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

                <MaterialReactTable table={table} />
            </Box>

            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography variant="h6" component="h2">
                        Upload Attendance
                    </Typography>
                    <TextField label="Attendance Data" multiline rows={4} />
                    <Button variant="contained" onClick={() => setShowModal(false)}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default Attendance;
