import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import {
    Box,
    Button,
    Typography,
    Modal,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    CardContent,
    Collapse,
    Divider,
    Chip,
    Tabs,
    Tab,
    InputAdornment,
    FilledInput,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { styled, useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import UserImage from "../../assets/user.jpg";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";



const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    "& > :not(style) ~ :not(style)": {
        marginTop: theme.spacing(2),
    },
}));

// Dummy data for demonstration
const data = [
    {
        profileimage: UserImage,
        name: "John Doe",
        date: "2024-05-19",
        hr_code: "HR001",
        department: "Sales",
        TimeStamp: "2024-05-19T08:00:00Z",
        startwork: "2024-05-19T09:00:00Z",
        endwork: "2024-05-19T17:00:00Z",
        Absent: false,
        clockin: "08:30",
        Must_C_In: true,
        Clock_In: "08:30",
        clockout: "17:30",
        Must_C_Out: true,
        Clock_Out: "17:30",
        Work_Time: "8h",
        note: "bad Emplyee",
        addetion: 0,
        deduction: 0,
        isemploee: 1,
    },
    {
        profileimage: UserImage,
        name: "Jane Smith",
        date: "2024-05-21",
        hr_code: "HR002",
        department: "Marketing",
        TimeStamp: "2024-05-21T08:00:00Z",
        startwork: "2024-05-21T09:00:00Z",
        endwork: "2024-05-21T17:00:00Z",
        Absent: false,
        clockin: "08:30",
        Must_C_In: true,
        Clock_In: "08:30",
        clockout: "17:30",
        Must_C_Out: true,
        Clock_Out: "17:30",
        Work_Time: "8h",
        note: "good Employee",
        addetion: 0,
        deduction: 0,
        isemploee: 1,
    },
    // Add more dummy data as needed
];

const TimeSheet = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
    const [endDate, setEndDate] = useState(dayjs());
    const [specificDate, setSpecificDate] = useState(dayjs());
    const [filteredData, setFilteredData] = useState(data);
    const [descriptionOpen, setDescriptionOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState("");
    const [value, setValue] = useState(0);
    const [filterOption, setFilterOption] = useState("specificDate");

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    const handleEditOpen = (rowData) => {
        // console.log(rowData);
        setModalData(rowData);
        setShowModal(true);
    };

    const handleEditClose = () => {
        setShowModal(false);
    };

    const handleEditSave = () => {
        // Save edited data
        setShowModal(false);
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "profileimage",
                header: "Profile Image",
                Cell: ({ cell }) => (
                    <img
                        src={UserImage}
                        alt="profile"
                        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                ),
                size: 140,
                enableEditing: false,
            },
            {
                accessorKey: "name",
                header: "Full Name",
                size: 120,
                enableEditing: false,
            },
            {
                accessorKey: "hr_code",
                header: "Employee ID",
                size: 120,
                enableEditing: false,
            },
            {
                accessorKey: "department",
                header: "Department",
                size: 120,
                enableEditing: false,
            },
            {
                accessorKey: "clockin",
                header: "Clock In",
                Cell: ({ cell }) => cell.getValue(),
                size: 120,
                enableEditing: false,
            },
            {
                accessorKey: "clockout",
                header: "Clock Out",
                Cell: ({ cell }) => cell.getValue(),
                size: 120,
                enableEditing: false,
            },
            {
                accessorKey: "TimeStamp",
                header: "Date",
                enableEditing: false,

                Cell: ({ cell }) => (
                    <>
                        <div>{dayjs(cell.getValue()).format("YYYY-MM-DD")}</div>
                    </>
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
            {
                accessorKey: "edit",
                header: "Edit Addition & Deduction",
                enableEditing: false,

                size: 220,
                Cell: ({ row }) => (
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleEditOpen(row.original)}
                    >
                        Edit Add & Deduct
                    </Button>
                ),
            },
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
        setSelectedRow(row);
        setDescriptionOpen(true);
    };

    const handleDescriptionClose = () => setDescriptionOpen(false);

    useEffect(() => {
        if (filterOption === "specificDate") {
            const selectedDate = specificDate.format("YYYY-MM-DD");
            setFilteredData(data.filter((entry) => entry.date === selectedDate));
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

            {filterOption === "dateRange" && (
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            format="YYYY/MM/DD"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
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
                            onChange={(newValue) => setSpecificDate(newValue)}
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
                muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
                enableColumnFilterModes
                enableColumnOrdering
                enableGrouping
                enableColumnPinning
                enableGlobalFilterModes = {true}
                globalFilterModeOptions =  {['fuzzy', 'startsWith']} 
                enableFacetedValues
                renderTopToolbar={({ table }) => {
                    return (
                <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    m: 3,
                                }}
                            >
                                <Typography variant="h4"></Typography>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ backgroundColor: colors.primary[400] }}
                                    onClick={() => setShowModal(true)}
                                >
                                    Upload Attendance
                                </Button>
                            </Box>
                    )}}
                // enableEditing
                paginationDisplayMode="pages"
                muiPaginationProps={{
                    color: "secondary",
                    rowsPerPageOptions: [10, 20, 30],
                    shape: "rounded",
                    variant: "outlined",
                }}
                muiTablePaperProps={{
                    elevation: 2,
                    sx: {
                        borderRadius: "20px",
                    },
                }}
                muiTableContainerProps={{
                    sx: { maxHeight: "600px", backgroundColor: colors.primary[400] },
                }}
                muiTableHeadCellProps={{ sx: { backgroundColor: colors.primary[400] } }}
                muiTableBodyCellProps={{ sx: { backgroundColor: colors.primary[400] } }}
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
                        bgcolor: colors.primary[400],
                        border: `2px solid ${colors.primary[100]}`,
                        borderRadius: "10px",
                        boxShadow: 24,
                        padding: "15px 30px",
                    }}
                >
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Edit Addition && Deduction Time :
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
                            aria-label="full width"
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
                                        endAdornment={
                                            <InputAdornment position="end">hours</InputAdornment>
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
                                        endAdornment={
                                            <InputAdornment position="end">hours</InputAdornment>
                                        }
                                        aria-describedby="filled-weight-helper-text"
                                        inputProps={{
                                            "aria-label": "Deduction",
                                        }}
                                    />
                                </FormControl>
                            </Box>
                        )}
                    </Box>
                    <Divider />

                    <Box
                        sx={{ mt: 2 }}
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            marginTop: "20px",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => setShowModal(false)}
                            sx={{
                                mr: 2,
                                color: colors.redAccent[400],
                                borderColor: colors.redAccent[400],
                                "&:hover": {
                                    color: colors.redAccent[400],
                                    borderColor: colors.redAccent[400],
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleEditSave}
                            sx={{
                                color: colors.greenAccent[400],
                                borderColor: colors.greenAccent[400],
                                "&:hover": {
                                    color: colors.greenAccent[400],
                                    borderColor: colors.greenAccent[400],
                                },
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
            {selectedRow && (
                <Modal open={descriptionOpen} onClose={handleDescriptionClose}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 900,
                            maxHeight: "100%",
                            overflow: "scroll",
                            bgcolor: colors.primary[700],
                            color: colors.primary[200],
                            border: `3px solid ${colors.greenAccent[300]}`,
                            boxShadow: 24,
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            borderRadius: "10px",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                            }}
                            component="h2"
                        >
                            Employee Profile:
                        </Typography>
                        <Divider />
                        <Box>
                            <Card
                                sx={{
                                    maxWidth: "100%",
                                    p: "10px",
                                    backgroundColor: colors.primary[700],
                                }}
                            >
                                <Box
                                    sx={{
                                        diplay: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: colors.greenAccent[500],
                                            display: "flex",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                            margin: "auto",
                                            marginBottom: "10px",
                                        }}
                                        aria-label="recipe"
                                    >
                                        {selectedRow.name.slice(0, 1)}
                                    </Avatar>
                                    <Typography variant="h5">{selectedRow.name}</Typography>
                                    <Typography
                                        sx={{
                                            opacity: "75%",
                                        }}
                                    >
                                        {selectedRow.isemploee === 1 ? "Active" : "NOT Active"}
                                    </Typography>
                                </Box>

                                <Collapse in={true} timeout="auto" unmountOnExit>
                                    <CardContent
                                        sx={{
                                            display: "flex",
                                        }}
                                    >
                                        {/* Employee Information */}
                                        <Root>
                                            <Divider>
                                                <Chip label="Employee Id:" size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.note ? selectedRow.hr_code : "ـــــ"}
                                            </Typography>

                                            <Divider>
                                                <Chip label="Note:" size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.note ? selectedRow.note : "ـــــ"}
                                            </Typography>

                                            <Divider>
                                                <Chip label="Start Work: " size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.startwork}
                                            </Typography>

                                            <Divider>
                                                <Chip label="End Work: " size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.endwork}
                                            </Typography>

                                            <Divider>
                                                <Chip label="Timestamp: " size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.TimeStamp}
                                            </Typography>

                                            <Divider>
                                                <Chip label="Absent: " size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.Absent === 1 ? "Absent " : "Not Appsent"}
                                            </Typography>

                                            <Divider>
                                                <Chip label="Clock In: " size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.clockin}
                                            </Typography>
                                        </Root>

                                        <Divider orientation="vertical" flexItem />

                                        <Root>
                                            <Divider>
                                                <Chip label="Clock Out: " size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.clockout}
                                            </Typography>

                                            <Divider>
                                                <Chip label="Clock_IN: " size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.Clock_In}
                                            </Typography>

                                            <Divider>
                                                <Chip label="Clock_Out: " size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.Clock_Out}
                                            </Typography>

                                            <Divider>
                                                <Chip label="Working Duration: " size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.Work_Time}
                                            </Typography>

                                            <Divider>
                                                <Chip label="Addition: " size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.addetion}
                                            </Typography>

                                            <Divider>
                                                <Chip label="Deduction: " size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.deduction}
                                            </Typography>

                                            <Divider>
                                                <Chip label="Is Employee: " size="small" />
                                            </Divider>
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {selectedRow.isemploee === 1 ? "Active" : "NOT Active"}
                                            </Typography>
                                        </Root>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Box>
                        <Divider />
                        <Button
                            variant="outlined"
                            onClick={handleDescriptionClose}
                            sx={{
                                color:colors.redAccent[400],
                                border:`1px solid ${colors.redAccent[400]}`,
                                width:'100px',
                                marginInline:'auto',
                                "&:hover" : {
                                    color:colors.redAccent[500],
                                    border:`1px solid ${colors.redAccent[500]}`,
                                }
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </Modal>
            )}
        </Box>
    );
};

export default TimeSheet;
