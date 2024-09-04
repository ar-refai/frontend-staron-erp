import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, Typography, Modal, TextField, Radio, RadioGroup, FormControlLabel, FormControl, Divider, Tabs, Tab, InputAdornment, FilledInput, Alert, } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { styled, useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json"
import { ShowAllAttendance } from "../../apis/HumanRecourse/Attendance"
import EmployeeTimesheetInfo from "../../components/EmployeeTimesheetInfo";
import { addetionEmployee, deductionEmployee, CreateAttendanceExel } from "../../apis/HumanRecourse/Attendance";
import Snackbar from '@mui/material/Snackbar';
import { LoadingButton } from "@mui/lab";




let data = [];
const TimeSheet = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
    const [endDate, setEndDate] = useState(dayjs());
    const [specificDate, setSpecificDate] = useState(dayjs());
    const [initData, setInitData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [descriptionOpen, setDescriptionOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState("");
    const [value, setValue] = useState(0);
    const [filterOption, setFilterOption] = useState("specificDate");
    const [editValue, setEditValue] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loadingUpload,setLoadingUpload] = useState(false);
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fetchData = async () => {
        try {
            const response = await ShowAllAttendance();
            data = Array.isArray(response?.data) ? response.data : [];
            setInitData(data);
            // setFilteredData(data);         
            // console.log(filteredData);
        } catch (err) {
            console.error('Error Fetching Data', err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleEditOpen = (rowData) => {
        // console.log(rowData);
        setModalData(rowData);
        setShowModal(true);
    };
    const handleEditSave = async () => {
        let formData = {}; // Initialize formData here

        try {
            if (value === 0) {
                // console.log("Adding Days");
                formData = { "addetion": editValue }; // Update formData for addition
                await addetionEmployee(modalData?.id, formData);
            } else if (value === 1) {
                // console.log("Deducting Days");
                formData = { "deduction": editValue }; // Update formData for deduction
                await deductionEmployee(modalData?.id, formData);
            }
            setShowModal(false);
            setEditValue("");

            // Fetch and update the data again after saving
            const updatedData = await ShowAllAttendance();
            setFilteredData(updatedData?.data);
            // console.log(filteredData);
        } catch (error) {
            console.error('Error saving data', error);
        }
    };


    const columns = useMemo(
        () => [
            {
                accessorKey: "user.profileimage",
                header: "Profile Image",
                Cell: ({ cell }) => {
                    // console.log("#".repeat(55))
                    // console.log(cell.row.original.user)
                    // console.log(cell.getValue())

                    return (<img
                        src={`https://erpsystem.darakoutlet.com/${cell.getValue()}`}
                        alt="profile"
                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                    )
                },
                size: 140,
                enableEditing: false,
            },
            {
                accessorKey: "user.name",
                header: "Full Name",
                size: 120,
                enableEditing: false,
            },
            {
                accessorKey: "user.hr_code",   // this needs to be changed
                header: "HR Code",
                size: 120,
                enableEditing: false,
            },
            {
                accessorKey: "user.department",
                header: "Department",
                size: 120,
                enableEditing: false,
            },
            {
                accessorKey: "Clock_In",
                header: "Clock In",
                Cell: ({ cell }) => cell.getValue(),
                size: 120,
                enableEditing: false,
            },
            {
                accessorKey: "Clock_Out",
                header: "Clock Out",
                Cell: ({ cell }) => cell.getValue(),
                size: 120,
                enableEditing: false,
            },
            {
                accessorKey: "Date",
                header: "Date",
                enableEditing: false,

                Cell: ({ cell }) => (
                    <div>{dayjs(cell.getValue()).format("YYYY-MM-DD")}</div>
                ),
                size: 150,
            },
            {
                accessorKey: "Absent",
                header: "Absent",
                enableEditing: false,

                Cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
                size: 120,
            },
            {
                accessorKey: "addetion",
                header: "Addition",
                enableEditing: true,

                Cell: ({ cell }) => cell.getValue(),
                size: 120,
            },
            {
                accessorKey: "deduction",
                header: "Deduction",
                enableEditing: true,

                Cell: ({ cell }) => cell.getValue(),
                size: 120,
            },
            // {
            //     accessorKey: "edit",
            //     header: "Edit Addition & Deduction",
            //     enableEditing: false,

            //     size: 220,
            //     Cell: ({ row }) => (
            //         <Button
            //             variant="outlined"
            //             color="secondary"
            //             onClick={() => handleEditOpen(row.original)}
            //         >
            //             Edit Add & Deduct
            //         </Button>
            //     ),
            // },
            {
                accessorKey: "description",
                header: "Description",
                enableEditing: false,

                size: 200,
                Cell: ({ row }) => (
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDescriptionOpen(row.original)}
                    >
                        More Info
                    </Button>
                ),
            },
        ],
        []
    );

    const handleDescriptionOpen = (row) => {
        // setModalData(row)
        setSelectedRow(row);
        setDescriptionOpen(true);
    };

    const handleDescriptionClose = () => setDescriptionOpen(false);

    useEffect(() => {
        if (filterOption === "specificDate") {
            const selectedDate = specificDate.format("YYYY-MM-DD");
            setFilteredData(data?.filter((entry) => {
                return dayjs(entry.Date).format("YYYY-MM-DD") === selectedDate;
            }));
            console.log(filteredData);
        } else {
            const filtered = data?.filter((entry) => {
                const entryDate = dayjs(entry.Date);
                console.log("Entry : ", entryDate.format("YYYY-MM-DD"));
                console.log("Start Date : ", startDate.format("YYYY-MM-DD"));
                console.log("End Date: ", endDate.format("YYYY-MM-DD"));
                console.log(entryDate.isAfter(startDate) && entryDate.isBefore(endDate));
                return entryDate.isAfter(startDate) && entryDate.isBefore(endDate);
            });
            setFilteredData(filtered);
        }
    }, [filterOption, startDate, endDate, specificDate, data]);



    const handleFileChange = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        setLoadingUpload(true)
        if (!selectedFile) {
            console.error("No file selected");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            setSnackbarMessage('Upload has failed , no file selected!');
            setLoadingUpload(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            await CreateAttendanceExel(formData);
            setSnackbarSeverity('success');
            setSnackbarOpen(true)
            setSnackbarMessage('File has been Uploaded Successfully!');
            setLoadingUpload(false);

            console.log("File uploaded successfully");
            setSelectedFile(null);

            // Fetch and update the data again after uploading
            const updatedData = await ShowAllAttendance();
            setFilteredData(updatedData.data);
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            setSnackbarMessage('Upload has failed , not a correct file , please upload xlsx file!');
            setLoadingUpload(false);

            console.error("Error uploading file", error);
        }
    };


    return (
        <Box>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
                <RadioGroup
                    name="filter-option"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                    row
                >
                    <FormControlLabel
                        value="specificDate"
                        control={
                            <Radio
                                sx={{
                                    color: colors.redAccent[300],
                                    "&.Mui-checked": { color: colors.redAccent[200] },
                                }}
                            />
                        }
                        label="Specific Day"
                        sx={{ color: colors.primary[200] }}
                    />
                    <FormControlLabel
                        value="dateRange"
                        control={
                            <Radio
                                sx={{
                                    color: colors.redAccent[300],
                                    "&.Mui-checked": { color: colors.redAccent[300] },
                                }}
                            />
                        }
                        label="Date Range"
                        sx={{ color: colors.primary[200] }}
                    />
                </RadioGroup>
            </FormControl>
            <CustomizedSnackbars
                open={snackbarOpen}
                handleClose={handleSnackbarClose}
                severity={snackbarSeverity}
                message={snackbarMessage}
            />
            {filterOption === "dateRange" && (
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            format="YYYY/MM/DD"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            slots={{
                                textField: (params) => {
                                    // console.log("Start Date: ", params  )
                                    return <TextField variant="filled" {...params} />
                                }
                                ,
                            }}
                            sx={{
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: colors.primary[200],
                                },
                                "& .MuiOutlinedInput-root": {
                                    "&:hover > fieldset": {
                                        borderColor: colors.primary[200],
                                    },
                                },
                                "& .MuiSvgIcon-root": {
                                    color: colors.redAccent[400],
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
                                textField: (params) => (
                                    <TextField variant="filled" {...params} />
                                ),
                            }}
                            sx={{
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: colors.primary[200],
                                },
                                "& .MuiOutlinedInput-root": {
                                    "&:hover > fieldset": {
                                        borderColor: colors.primary[200],
                                    },
                                },
                                "& .MuiSvgIcon-root": {
                                    color: colors.redAccent[400],
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
            {filterOption === "specificDate" && (
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Select Date"
                            format="YYYY/MM/DD"
                            value={specificDate}
                            onChange={(newValue) => {
                                // console.log("Select:" ,specificDate);
                                return setSpecificDate(newValue)
                            }}
                            slots={{
                                textField: (params) => (
                                    <TextField variant="filled" {...params} />
                                ),
                            }}
                            sx={{
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: colors.primary[200],
                                },
                                "& .MuiOutlinedInput-root": {
                                    "&:hover > fieldset": {
                                        borderColor: colors.primary[200],
                                    },
                                },
                                "& .MuiSvgIcon-root": {
                                    color: colors.redAccent[400],
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
            {/* OUR TABLE */}
            <MaterialReactTable
                columns={columns}
                data={filteredData}
                layoutMode="grid"
                enableColumnFilterModes={true}
                enableColumnOrdering={true}
                enableGrouping={true}
                enableColumnPinning={true}
                enableGlobalFilterModes={true}
                enableFacetedValues={true}
                enableStickyHeader={true}
                initialState={{
                    showColumnFilters: true,
                    showGlobalFilter: true,
                    columnPinning: {
                        left: ['mrt-row-expand', 'mrt-row-select'],
                        right: ['mrt-row-actions'],
                    },
                }}
                muiSearchTextFieldProps={{
                    size: 'small',
                    variant: 'outlined',
                }}
                muiTableHeadCellProps={{
                    sx: {
                        fontWeight: 'normal',
                        fontSize: '20px', // Increased font size
                    },
                }}
                muiTableFooterCellProps={{
                    sx: {
                        fontWeight: 'normal',
                        fontSize: '20px', // Increased font size
                    },
                }}
                muiTableBodyCellProps={{
                    sx: {
                        fontSize: '18px', // Adjusted font size for table body cells
                    },
                }}
                globalFilterModeOptions={['fuzzy', 'startsWith']}
                renderTopToolbar={({ table }) => (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                m: 3,
                            }}
                        >
                            <Typography variant="h4"></Typography>
                            <Button variant="outlined" component="label" color="secondary">
                                Upload Attendance
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    hidden
                                    onChange={handleFileChange}
                                />
                            </Button>
                        </Box>
                        <Divider sx={{ marginBottom: 2 }} />
                        {selectedFile && (
                            <>
                                <Box sx={{ mb: 3, ml: 3, display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 2 }}>
                                    <LoadingButton loading={loadingUpload} variant="outlined" color="secondary" onClick={handleUpload}>
                                        Submit Uploaded File
                                    </LoadingButton>
                                    <Typography variant="body2" color={colors.primary[200]}>
                                        {selectedFile.name}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </>
                )}
                paginationDisplayMode="pages"
                muiPaginationProps={{
                    color: 'secondary',
                    rowsPerPageOptions: [10, 20, 30, 40, 50, 60],
                    shape: 'rounded',
                    variant: 'outlined',
                }}
                muiTablePaperProps={{
                    elevation: 2,
                    sx: {
                        borderRadius: '20px',
                    },
                }}
                muiTableContainerProps={{
                    sx: { maxHeight: '600px', backgroundColor: colors.primary[400] },
                }}
                muiTableHeadCellProps={{
                    sx: { backgroundColor: colors.primary[400], fontSize: '20px' }, // Increased font size
                }}
                muiTableBodyCellProps={{
                    sx: { backgroundColor: colors.primary[400], fontSize: '18px' }, // Increased font size
                }}
                muiTableBodyProps={{ sx: { backgroundColor: colors.primary[400] } }}
                muiBottomToolbarProps={({ table }) => ({
                    sx: { backgroundColor: colors.primary[400] },
                })}
            />


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
            {selectedRow && (
                <EmployeeTimesheetInfo
                    selectedRow={selectedRow}
                    descriptionOpen={descriptionOpen}
                    handleDescriptionClose={handleDescriptionClose} />
            )}
        </Box>
    );
};
const CustomizedSnackbars = ({ open, handleClose, severity, message }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};
export default TimeSheet;
