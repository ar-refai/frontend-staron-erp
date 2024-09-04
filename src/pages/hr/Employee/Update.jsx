import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
    TextField,
    Button,
    Grid,
    MenuItem,
    Stepper,
    Step,
    StepLabel,
    Box,
    Typography,
    Container,
    Paper,
    CircularProgress,
    Avatar,
} from "@mui/material";
import { UpdateEmployees, showEmployee } from "../../../apis/Employee";
import { CloudUploadOutlined } from "@mui/icons-material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";
import { geDepartmentSupervisors } from "apis/HumanRecourse/Employee";
let clockinObj = {};
let clockoutObj = {};
const Update = ({ onClose, selectedRow ,onUpdateSuccess , fetchData}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [supervisors, setSupervisors] = useState([]);
    const [initialValues, setInitialValues] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [supervisorStatus, setSupervisorStatus] = useState(200);
    const [deptSelect, setDeptSelect] = React.useState('');

    const steps = ["Personal Info", "Job Details", "Other Details", "Files"];

    useEffect(() => {
        // Fetch selected employee data
        const getEmployeeData = async () => {
            const response = await showEmployee(selectedRow.id);
            try {
                if ([200, 201, 202].includes(response.status)) {      
                    const clockin = response.data.clockin;
                    clockinObj = dayjs(`1970-01-01T${clockin}`);
                    console.log(clockinObj);
                    const clockout = response.data.clockout;
                    clockoutObj = dayjs(`1970-01-01T${clockout}`);
                    console.log(clockoutObj)
                    setInitialValues({
                        ...response.data,
                        password:'',
                        confirmPassword:'',
                        department:response.data.department ? response.data.department: null,
                        date: response.data.date ? new Date(response.data.date) : null,
                        EmploymentDate: response.data.EmploymentDate ? new Date(response.data.EmploymentDate) : null,
                        clockin: clockinObj,
                        clockout: clockoutObj,
                        profileimage: response.data.profileimage ? response.data.profileimage : null,
                        pdf: response.data.pdf ? response.data.pdf : null,
                        tax: response.data.tax ? response.data.tax : null,
                        kpi: response.data.kpi ? response.data.kpi: null,
                        transportation: response.data.transportation ? response.data.transportation: null,
                        salary: response.data.salary ? response.data.salary: null,
                        // put the rest of the data here
                    });
                    // console.log("This is the initial values",initialValues); // here prints empty object values
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
                setError("Failed to fetch employee data.");
                setLoading(false);
            }
        }
        getEmployeeData();
    }, [selectedRow]);

    const validationSchema = [
        Yup.object().shape({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(8, "Password must be at least 8 characters").required(),
            password_confirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required(),
            date: Yup.date().required("Date is required"),
            hr_code: Yup.string().required("HR code is required"),
            address: Yup.string().required("Address is required"),
            phone: Yup.string().required("Phone number is required"),
        }),
        Yup.object().shape({
            department: Yup.string().required("Department is required"),
            job_role: Yup.string().required("Job role is required"),
            job_tybe: Yup.string().required("Job type is required"),
            salary: Yup.number().required("Salary is required"),
            Trancportation: Yup.number().required("Transportation is required"),
            kpi: Yup.number().required("KPI is required"),
            tax: Yup.number().required("Tax is required"),
            Supervisor: Yup.string().nullable(),
            EmploymentDate: Yup.date().required("Employment date is required"),
        }),
        Yup.object().shape({
            MedicalInsurance: Yup.number().required("Medical insurance is required"),
            SocialInsurance: Yup.number().required("Social insurance is required"),
            TimeStamp: Yup.string().required("Timestamp is required"),
            grade: Yup.string().required("Grade is required"),
            segment: Yup.string().required("Segment is required"),
            startwork: Yup.string().required("Start work time is required"),
            endwork: Yup.string().required("End work time is required"),
            clockin: Yup.date().required("Clock In is required"),
            clockout: Yup.date().required("Clock Out is required"),
        }),
        Yup.object().shape({
            profileimage: Yup.mixed(),
            pdf: Yup.mixed(),
        }),
    ];
    const handleDeptSelect = (event,) => {
        setDeptSelect(event.target.value);
        fetchDeptSupervisors(event.target.value);
    };

    const fetchDeptSupervisors = async (dept) => {
        console.log(dept);

        const formData = {
            "department": dept,
        }
        try {
            const response = await geDepartmentSupervisors(JSON.stringify(formData, null, 2));
            setSupervisors(response?.data);
            console.log(supervisors);
            setSupervisorStatus(response?.status);
            console.log(response.data);
        } catch (error) {
            console.log(error, "Error fetching....");
        }
    }

    const handleSubmit = (values, { setSubmitting }) => {
        const newValues = {
            ...values,
            EmploymentDate:moment(values.EmploymentDate).format("YYYY-MM-DD"),
            date:moment(values.Date).format("YYYY-MM-DD"),
            clockin:moment(values.clockin).format("HH:mm:ss"),
            clockout:moment(values.clockout).format("HH:mm:ss"),
        }
        
        // console.log(".........." , newValues);
        
        const formData = new FormData();
        Object.keys(newValues).forEach((key) => {
            if (newValues[key]) {
                formData.append(key, newValues[key]);
            }
        });
        
        UpdateEmployees(formData, selectedRow.id)
            .then((response) => {
                fetchData();
                onClose(); // Close the modal
            })
            .catch((error) => {
                console.error("Error updating employee:", error);
                setSubmitting(false);
            });
            onUpdateSuccess(formData);

    };

    const handleNext = (formikProps) => {
        formikProps.validateForm().then((errors) => {
            if (Object.keys(errors).length === 0) {
                if (activeStep === steps.length - 1) {
                    formikProps.submitForm();
                } else {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
            } else {
                formikProps.setTouched(errors);
                console.log(errors);
            }
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    if (loading) {
        return (
            <Container component="main" maxWidth="md">
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container component="main" maxWidth="md">
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} sx={{ p: 3 }}>

                <Grid container justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
                    {initialValues.profileimage && (
                        <Avatar alt="Profile Image" src={`https://erpsystem.darakoutlet.com/${initialValues.profileimage}`} sx={{ width: 100, height: 100, mb: 2 }} />
                    )}
                </Grid>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema[activeStep]}
                    onSubmit={handleSubmit}
                >
                    {(formikProps) => (
                        <Form>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <Box sx={{ mt: 3, mb: 2 }}>
                                {activeStep === steps.length ? (
                                    <Typography variant="h6" gutterBottom>
                                        All steps completed - form submitted
                                    </Typography>
                                ) : (
                                    <>
                                        {activeStep === 0 && (
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="name" as={TextField} label="Name" fullWidth helperText={<ErrorMessage name="name" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="email" as={TextField} label="Email" type="email" fullWidth helperText={<ErrorMessage name="email" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="password" as={TextField} label="Password" type="password" fullWidth helperText={<ErrorMessage name="password" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="password_confirm" as={TextField} label="Confirm Password" type="password" fullWidth helperText={<ErrorMessage name="password_confirm" />} />
                                                </Grid>
                                                <Grid item xs={12} >
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer
                                                    components={[
                                                    'DesktopDatePicker',
                                                    ]}
                                                >
                                                    <DesktopDatePicker
                                                    name="date"
                                                    label="Date Of Birth"
                                                    views={["year", "month", "day"]}
                                                    format="YYYY-MM-DD"

                                                    value={dayjs(formikProps.values.date)} 
                                                    onChange={(value) => formikProps.setFieldValue("date", value)}
                                                    renderInput={(params) => <TextField {...params} fullWidth />}

                                                    />
                                                    
                                                </DemoContainer>
                                                </LocalizationProvider>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="hr_code" as={TextField} label="HR Code" fullWidth helperText={<ErrorMessage name="hr_code" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="address" as={TextField} label="Address" fullWidth helperText={<ErrorMessage name="address" />} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field name="phone" as={TextField} label="Phone Number" fullWidth helperText={<ErrorMessage name="phone" />} />
                                                </Grid>
                                            </Grid>
                                        )}
                                        {activeStep === 1 && (
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Field 
                                                    name="department" 
                                                    as={TextField} 
                                                    DefaultValue={formikProps.values.department} 
                                                    label="Department" 
                                                    onClick={(e)=> handleDeptSelect(e)}
                                                    fullWidth 
                                                    select 
                                                    helperText={<ErrorMessage name="department" />}
                                                    >
                                                    {/* {console.log(initialValues.department)} */}
                                                    <MenuItem key="Administration" value="Administration">Administration</MenuItem>
                                                    <MenuItem key="Executive" value="Executive">Executive</MenuItem>
                                                    <MenuItem key="Human Resources" value="Human Resources">Human Resources</MenuItem>
                                                    <MenuItem key="Technical Office" value="Technical Office">Technical Office</MenuItem>
                                                    <MenuItem key="Sales Office" value="Sales Office">Sales Office</MenuItem>
                                                    <MenuItem key="Operation Office" value="Operation Office">Operation Office</MenuItem>
                                                    <MenuItem key="Control Office" value="Control Office">Control Office</MenuItem>
                                                    <MenuItem key="Supply Chain" value="Supply Chain">Supply Chain</MenuItem>
                                                    <MenuItem key="Marketing" value="Marketing">Marketing</MenuItem>
                                                    <MenuItem key="Research & Development" value="Research & Development">Research & Development</MenuItem>
                                                    <MenuItem key="Finance" value="Finance">Finance</MenuItem>

                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="job_role" as={TextField} label="Job Role" fullWidth helperText={<ErrorMessage name="job_role" />}>
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="job_tybe" as={TextField} label="Job Tybe" fullWidth helperText={<ErrorMessage name="job_tybe" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                <Field name="salary" as={TextField} label="Salary" fullWidth helperText={<ErrorMessage name="salary" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="Trancportation" as={TextField} label="Trancportation" fullWidth helperText={<ErrorMessage name="Trancportation" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="kpi" as={TextField} label="KPI" fullWidth helperText={<ErrorMessage name="kpi" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="tax" as={TextField} label="Tax" fullWidth helperText={<ErrorMessage name="tax" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="Supervisor" as={TextField} label="Supervisor" fullWidth select helperText={<ErrorMessage name="Supervisor" />}>
                                                        <MenuItem value="" >No Supervisor</MenuItem>
                                                        {supervisorStatus === 200 && supervisors?.map((supervisor) => (
                                                            <MenuItem key={supervisor?.id} value={supervisor?.id}>
                                                                {supervisor?.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer
                                                    components={[
                                                    'DesktopDatePicker',
                                                    ]}
                                                >
                                                    <DesktopDatePicker
                                                    name="EmploymentDate"
                                                    label="Employment Date"
                                                    views={["year", "month", "day"]}
                                                    format="YYYY-MM-DD"
                                                    value={dayjs(formikProps.values.EmploymentDate)} 
                                                    onChange={(value) => formikProps.setFieldValue("EmploymentDate", value)}
                                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                                    />
                                                    
                                                </DemoContainer>
                                                </LocalizationProvider>
                                                </Grid>
                                            </Grid>
                                        )}
                                        {activeStep === 2 && (
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="MedicalInsurance" as={TextField} label="Medical Insurance" fullWidth helperText={<ErrorMessage name="MedicalInsurance" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="SocialInsurance" as={TextField} label="Social Insurance" fullWidth helperText={<ErrorMessage name="SocialInsurance" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="TimeStamp" as={TextField} label="Time Stamp" fullWidth helperText={<ErrorMessage name="TimeStamp" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="grade" as={TextField} label="Grade" select fullWidth helperText={<ErrorMessage name="grade" />} >
                                                    <MenuItem value="Executive">Executive</MenuItem>
                                                    <MenuItem value="Manager">Manager</MenuItem>
                                                    <MenuItem value="First Staff">First Staff</MenuItem>
                                                    <MenuItem value="Seconed Staff">Seconed Staff</MenuItem>
                                                    <MenuItem value="Third Staff">Third Staff</MenuItem>
                                                    <MenuItem value="Fourth Staff">Fourth Staff</MenuItem>
                                                    <MenuItem value="Craftsman">Craftsman</MenuItem>
                                                    <MenuItem value="Steward">Steward</MenuItem>     
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field name="segment" as={TextField} label="Segment" fullWidth helperText={<ErrorMessage name="segment" />} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field name="startwork" as={TextField} label="Start Work" fullWidth select helperText={<ErrorMessage name="startwork" />} >
                                                    <MenuItem value="Saturday">Saturday</MenuItem>
                                                        <MenuItem value="Sunday">Sunday</MenuItem>
                                                        <MenuItem value="Monday">Monday</MenuItem>
                                                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                                                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                                                        <MenuItem value="Thursday">Thursday</MenuItem>
                                                        <MenuItem value="Friday">Friday</MenuItem>
                                                        </Field>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field name="endwork" as={TextField} label="End Work" fullWidth select helperText={<ErrorMessage name="endwork" />} >
                                                    <MenuItem value="Saturday">Saturday</MenuItem>
                                                        <MenuItem value="Sunday">Sunday</MenuItem>
                                                        <MenuItem value="Monday">Monday</MenuItem>
                                                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                                                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                                                        <MenuItem value="Thursday">Thursday</MenuItem>
                                                        <MenuItem value="Friday">Friday</MenuItem>
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={12}>
                                                
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <TimePicker
                                                            label="Clock In"
                                                            name="clockin"
                                                            slotProps={{ textField: { fullWidth: true } }}
                                                            value={formikProps.values.clockin ? dayjs(formikProps.values.clockin) : null}
                                                            onChange={(value) => formikProps.setFieldValue("clockin", value)}
                                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                                        />
                                                    </LocalizationProvider>
                                                {/* {console.log(formikProps.values.clockin)} */}
                                                </Grid>
                                                <Grid item xs={12} sm={12}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <TimePicker
                                                            label="Clock Out"
                                                            name="clockout" 
                                                            slotProps={{ textField: { fullWidth: true } }}
                                                            value={formikProps.values.clockout ? dayjs(formikProps.values.clockout) : null}
                                                            onChange={(value) => formikProps.setFieldValue("clockout", value)}
                                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                                        />
                                                    </LocalizationProvider>
                                                    {/* {console.log(formikProps.values.clockout)} */}

                                                </Grid>
                                            </Grid>
                                        )}
                                        {activeStep === 3 && (
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", gap: "10px" }}>
                                                    <input
                                                        accept="image/*"
                                                        style={{ display: "none" }}
                                                        id="profileimage"
                                                        multiple
                                                        
                                                        onChange={(event) => formikProps.setFieldValue("profileimage", event.currentTarget.files[0])}
                                                        type="file"
                                                    />
                                                    <label htmlFor="profileimage" style={{width:'100%'}}>
                                                        <Button
                                                            variant="outlined"
                                                            color="secondary"
                                                            component="span"
                                                            fullWidth
                                                        >
                                                            Upload Profile Image
                                                        </Button>
                                                    </label>
                                                    </Grid>
                                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", gap: "10px" }}>

                                                    <input
                                                        accept=".pdf"
                                                        style={{ display: "none" }}
                                                        id="pdf"
                                                        multiple
                                                        type="file"
                                                        onChange={(event) => formikProps.setFieldValue("pdf", event.currentTarget.files[0])}
                                                    />
                                                    <label htmlFor="pdf" style={{width:'100%'}}>
                                                        <Button
                                                            variant="outlined"
                                                            color="secondary"
                                                            component="span"
                                                            fullWidth

                                                        >
                                                            Upload PDF
                                                        </Button>
                                                    </label>
                                                </Grid>
                                            </Grid>
                                        )}
                                        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                                variant="outlined"
                                                color="secondary"
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => handleNext(formikProps)}
                                                endIcon={activeStep === steps.length - 1 ? <CloudUploadOutlined /> : null}
                                            >
                                                {activeStep === steps.length - 1 ? "Submit" : "Next"}
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
};

export default Update;
