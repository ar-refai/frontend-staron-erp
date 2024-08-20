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
    Select,
    FormControl,
} from "@mui/material";
import { CreateEmployee, ShowAllEmployee } from "../../../apis/Employee";
import { CloudUploadOutlined } from "@mui/icons-material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
// import moment from "moment";
import { geDepartmentSupervisors } from "apis/HumanRecourse/Employee";

const Create = ({ onSubmit, onClose ,fetchData}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [supervisors, setSupervisors] = useState([]);
    const [supervisorStatus, setSupervisorStatus] = useState(200);
    const [deptSelect, setDeptSelect] = React.useState('');

    const handleDeptSelect = (event,) => {
        setDeptSelect(event.target.value);
        fetchDeptSupervisors(event.target.value);

    };

    const steps = ["Personal Info", "Job Details", "Other Details", "Files"];

    useEffect(() => {
        ShowAllEmployee();
    }, []);


    const fetchDeptSupervisors = async (dept) => {
        console.log(dept);

        const formData = {
            "department": dept,
        }
        try {
            const response = await geDepartmentSupervisors(JSON.stringify(formData, null, 2));
            setSupervisors(response?.data);
            setSupervisorStatus(response?.status);
            console.log(response.data);


        } catch (error) {
            console.log(error, "Error fetching....");
        }
    }



    const initialValues = {
        name: "",
        email: "",
        password: "",
        password_confirm: "",
        hr_code: "",
        address: "",
        profileimage: null,
        salary: "",
        Trancportation: "",
        kpi: "",
        tax: "",
        Supervisor: "",
        MedicalInsurance: "",
        SocialInsurance: "",
        phone: "",
        department: "",
        job_role: "",
        job_tybe: "",
        pdf: null,
        TimeStamp: "",
        grade: "",
        segment: "",
        startwork: "",
        endwork: "",

    };
    const dateCorrector = (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;

    }
    const TimeCorrector = (timeString) => {
        const date = new Date(timeString);

        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');

        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return formattedTime;
    }
    const validationSchema = [
        Yup.object().shape({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
            password_confirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Password confirmation is required"),
            date: Yup.date().required("Date is required"),
            hr_code: Yup.string().required("HR code is required"),
            address: Yup.string().required("Address is required"),
            phone: Yup.string().required("Phone number is required"),
        }),
        Yup.object().shape({
            department: Yup.string(),
            job_role: Yup.string().required("Job role is required"),
            job_tybe: Yup.string().required("Job type is required"),
            salary: Yup.number().required("Salary is required"),
            Trancportation: Yup.number().required("Transportation is required"),
            kpi: Yup.number().required("KPI is required"),
            tax: Yup.number().required("Tax is required"),
            Supervisor: Yup.string(),
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
            clockin: Yup.string().required("Clock-in time is required"),
            clockout: Yup.string().required("Clock-out time is required"),
        }),
        Yup.object().shape({
            profileimage: Yup.mixed().required("Profile image is required"),
            pdf: Yup.mixed().required("PDF is required"),
        }),
    ];

    const handleSubmit = (values, { setSubmitting }) => {
        console.log("-".repeat(22));
        console.log(values);
        console.log("-".repeat(22));
        const newValues = {
            ...values,
            EmploymentDate: dateCorrector(values.EmploymentDate),
            date: dateCorrector(values.date), // Corrected field name
            clockin: TimeCorrector(values.clockin), // Corrected field name
            clockout: TimeCorrector(values.clockout), // Corrected field name
        };
        console.log(newValues);
        console.log("-".repeat(22));

        const formData = new FormData();
        Object.keys(newValues).forEach((key) => {
            if(key === "department") 
                formData.append(key,deptSelect)
            else
                formData.append(key, newValues[key]);
        });

        CreateEmployee(formData)
            .then((response) => {
                console.log("Employee created successfully:", response);
                onSubmit(formData);
                fetchData();
                onClose();
            })
            .catch((error) => {
                console.error("Error creating employee:", error);
                setSubmitting(false);
            });
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

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography component="h1" variant="h5" align="center">
                    Create Employee
                </Typography>
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
                                                <Grid item xs={12}>
                                                    {/* <Field name="date" as={TextField} label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} helperText={<ErrorMessage name="date" />} /> */}
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer
                                                            components={[
                                                                'DesktopDatePicker',
                                                            ]}
                                                        >
                                                            <DesktopDatePicker
                                                                name="date"
                                                                label="Date"
                                                                views={["year", "month", "day"]}
                                                                format="YYYY-MM-DD"
                                                                slotProps={{ textField: { fullWidth: true } }}
                                                                value={dayjs(formikProps.values.date)}
                                                                onChange={(value) => formikProps.setFieldValue("date", value)}
                                                                renderInput={(params) => <TextField {...params} fullWidth/>}
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
                                                    native
                                                            name="department"
                                                            label="Department"
                                                            as={TextField}
                                                            select
                                                            value={deptSelect}
                                                            fullWidth
                                                            onChange={(e)=> handleDeptSelect(e)}
                                                                >                                                    
                                                        <MenuItem  value="Administration">Administration</MenuItem>
                                                        <MenuItem  value="Executive">Executive</MenuItem>
                                                        <MenuItem value="Human Resources">Human Resources</MenuItem>
                                                        <MenuItem  value="Technical Office">Technical Office</MenuItem>
                                                        <MenuItem  value="Sales Office">Sales Office</MenuItem>
                                                        <MenuItem  value="Operation Office">Operation Office</MenuItem>
                                                        <MenuItem  value="Control Office">Control Office</MenuItem>
                                                        <MenuItem  value="Supply Chain">Supply Chain</MenuItem>
                                                        <MenuItem  value="Marketing">Marketing</MenuItem>
                                                        <MenuItem  value="Research & Development">Research & Development</MenuItem>
                                                        <MenuItem  value="Finance">Finance</MenuItem>

                                                        </Field>
                                                    {/* </Field> */}
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="job_role" as={TextField} label="Job Role" fullWidth helperText={<ErrorMessage name="job_role" />}>

                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="job_tybe" as={TextField} label="Job Type" fullWidth select helperText={<ErrorMessage name="job_tybe" />}>
                                                        <MenuItem value="Full-Time">Full-Time</MenuItem>
                                                        <MenuItem value="Part-Time">Part-Time</MenuItem>
                                                        <MenuItem value="Internship">Internship</MenuItem>
                                                        <MenuItem value="Contractor">Contractor</MenuItem>
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="salary" as={TextField} label="Salary" type="number" fullWidth helperText={<ErrorMessage name="salary" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="Trancportation" as={TextField} label="Transportation" type="number" fullWidth helperText={<ErrorMessage name="Trancportation" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="kpi" as={TextField} label="KPI" type="number" fullWidth helperText={<ErrorMessage name="kpi" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="tax" as={TextField} label="Tax" type="number" fullWidth helperText={<ErrorMessage name="tax" />} />
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
                                                <Grid item xs={12}>
                                                    {/* <Field name="EmploymentDate" as={TextField} label="Employment Date" type="date" fullWidth InputLabelProps={{ shrink: true }} helperText={<ErrorMessage name="EmploymentDate" />} /> */}
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
                                                                slotProps={{ textField: { fullWidth: true } }}
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
                                                    <Field name="MedicalInsurance" as={TextField} label="Medical Insurance" type="number" fullWidth helperText={<ErrorMessage name="MedicalInsurance" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="SocialInsurance" as={TextField} label="Social Insurance" type="number" fullWidth helperText={<ErrorMessage name="SocialInsurance" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    {/* <Field name="TimeStamp" as={TextField} label="Timestamp" fullWidth helperText={<ErrorMessage name="TimeStamp" />} /> */}
                                                    <Field name="TimeStamp" as={TextField} label="TimeStamp" fullWidth select helperText={<ErrorMessage name="TimeStamp" />}>
                                                        <MenuItem value="G & A">Office</MenuItem>
                                                        <MenuItem value="COR">Whats App</MenuItem>
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="grade" as={TextField} select label="Grade" fullWidth helperText={<ErrorMessage name="grade" />} >
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
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="segment" as={TextField} label="Segment" fullWidth select helperText={<ErrorMessage name="segment" />}>
                                                        <MenuItem value="G & A">G & A</MenuItem>
                                                        <MenuItem value="COR">COR</MenuItem>
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="startwork" as={TextField} label="Start Work" fullWidth select helperText={<ErrorMessage name="startwork" />}>
                                                        <MenuItem value="Saturday">Saturday</MenuItem>
                                                        <MenuItem value="Sunday">Sunday</MenuItem>
                                                        <MenuItem value="Monday">Monday</MenuItem>
                                                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                                                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                                                        <MenuItem value="Thursday">Thursday</MenuItem>
                                                        <MenuItem value="Friday">Friday</MenuItem>
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="endwork" as={TextField} label="End Work" fullWidth select helperText={<ErrorMessage name="endwork" />}>
                                                        <MenuItem value="Saturday">Saturday</MenuItem>
                                                        <MenuItem value="Sunday">Sunday</MenuItem>
                                                        <MenuItem value="Monday">Monday</MenuItem>
                                                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                                                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                                                        <MenuItem value="Thursday">Thursday</MenuItem>
                                                        <MenuItem value="Friday">Friday</MenuItem>
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    {/* <Field name="clockin" as={TextField} label="Clock-in Time" fullWidth helperText={<ErrorMessage name="clockin" />} /> */}
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <TimePicker
                                                            label="Clock In"
                                                            name="clockin"
                                                        
                                                            slotProps={{ textField: { fullWidth: true } }}
                                                            value={dayjs(formikProps.values.clockin)}

                                                            onChange={(value) => formikProps.setFieldValue("clockin", value)}
                                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                                        />
                                                    </LocalizationProvider>

                                                </Grid>
                                                <Grid item xs={12} >
                                                    {/* <Field name="clockout" as={TextField} label="Clock-out Time" fullWidth helperText={<ErrorMessage name="clockout" />} /> */}
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <TimePicker
                                                            label="Clock Out"
                                                            name="clockout"
                                                            value={dayjs(formikProps.values.clockout)}

                                                        
                                                            slotProps={{ textField: { fullWidth: true } }}
                                                            onChange={(value) => formikProps.setFieldValue("clockout", value)}
                                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                                        />
                                                    </LocalizationProvider>

                                                </Grid>
                                            </Grid>
                                        )}
                                        {activeStep === 3 && (
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Button
                                                        variant="outlined"
                                                        component="label"
                                                        fullWidth
                                                        startIcon={<CloudUploadOutlined />}
                                                        color="secondary"
                                                    >
                                                        Upload Profile Image
                                                        <input
                                                            type="file"
                                                            hidden
                                                            onChange={(event) => {
                                                                formikProps.setFieldValue("profileimage", event.currentTarget.files[0]);
                                                            }}
                                                        />
                                                    </Button>
                                                    <ErrorMessage name="profileimage" component="div" style={{ color: 'red' }} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Button
                                                        variant="outlined"
                                                        component="label"
                                                        fullWidth
                                                        startIcon={<CloudUploadOutlined />}
                                                        color="secondary"
                                                    >
                                                        Upload PDF
                                                        <input
                                                            type="file"
                                                            hidden
                                                            onChange={(event) => {
                                                                formikProps.setFieldValue("pdf", event.currentTarget.files[0]);
                                                            }}
                                                        />
                                                    </Button>
                                                    <ErrorMessage name="pdf" component="div" style={{ color: 'red' }} />
                                                </Grid>
                                            </Grid>
                                        )}
                                    </>
                                )}
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant="outlined"
                                    color="secondary"
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleNext(formikProps)}
                                >
                                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                                </Button>
                            </Box>
                        </Form>
                    )}
            </Formik>
        </Paper>
        </Container >
    );
};

export default Create;
