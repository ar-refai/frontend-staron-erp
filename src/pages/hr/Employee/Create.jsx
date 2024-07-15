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
} from "@mui/material";
import { CreateEmployee, ShowAllEmployee } from "../../../apis/Employee";
import { CloudUploadOutlined } from "@mui/icons-material";

const Create = ({ onSubmit, onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [supervisors, setSupervisors] = useState([]);

    const steps = ["Personal Info", "Job Details", "Other Details", "Files"];

    useEffect(() => {
        ShowAllEmployee().then((response) => {
            setSupervisors(response.data);
        });
    }, []);

    const initialValues = {
        name: "",
        email: "",
        password: "",
        password_confirm: "",
        date: "",
        hr_code: "",
        address: "",
        profileimage: null,
        salary: "",
        Trancportation: "",
        kpi: "",
        tax: "",
        Supervisor: "",
        EmploymentDate: "",
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
        clockin: "",
        clockout: "",
    };

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
            department: Yup.string().required("Department is required"),
            job_role: Yup.string().required("Job role is required"),
            job_tybe: Yup.string().required("Job type is required"),
            salary: Yup.number().required("Salary is required"),
            Trancportation: Yup.number().required("Transportation is required"),
            kpi: Yup.number().required("KPI is required"),
            tax: Yup.number().required("Tax is required"),
            Supervisor: Yup.string().required("Supervisor is required"),
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
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        CreateEmployee(formData)
            .then((response) => {
                console.log("Employee created successfully:", response);
                onSubmit();
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
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="date" as={TextField} label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} helperText={<ErrorMessage name="date" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="hr_code" as={TextField} label="HR Code" fullWidth helperText={<ErrorMessage name="hr_code" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="address" as={TextField} label="Address" fullWidth helperText={<ErrorMessage name="address" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="phone" as={TextField} label="Phone Number" fullWidth helperText={<ErrorMessage name="phone" />} />
                                                </Grid>
                                            </Grid>
                                        )}
                                        {activeStep === 1 && (
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="department" as={TextField} label="Department" fullWidth select helperText={<ErrorMessage name="department" />}>
                                                        <MenuItem value="Technical Office">Technical Office</MenuItem>
                                                        <MenuItem value="Financial Department">Financial Department</MenuItem>
                                                        <MenuItem value="Operation">Operation</MenuItem>
                                                        <MenuItem value="Warehouse">Warehouse</MenuItem>
                                                        <MenuItem value="Administration">Administration</MenuItem>
                                                        <MenuItem value="Human Resource">Human Resource</MenuItem>
                                                        <MenuItem value="IT">IT</MenuItem>
                                                        <MenuItem value="Buffet">Buffet</MenuItem>
                                                        <MenuItem value="Head Office">Head Office</MenuItem>
                                                        <MenuItem value="Software">Software</MenuItem>
                                                        <MenuItem value="Store">Store</MenuItem>
                                                        <MenuItem value="Control Office">Control Office</MenuItem>
                                                        <MenuItem value="Supply Chain">Supply Chain</MenuItem>
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="job_role" as={TextField} label="Job Role" fullWidth select helperText={<ErrorMessage name="job_role" />}>
                                                        <MenuItem value="Engineer">Engineer</MenuItem>
                                                        <MenuItem value="Manager">Manager</MenuItem>
                                                        <MenuItem value="Supervisor">Supervisor</MenuItem>
                                                        <MenuItem value="Worker">Worker</MenuItem>
                                                        <MenuItem value="Technician">Technician</MenuItem>
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
                                                        {supervisors.map((supervisor) => (
                                                            <MenuItem key={supervisor.id} value={supervisor.id}>
                                                                {supervisor.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="EmploymentDate" as={TextField} label="Employment Date" type="date" fullWidth InputLabelProps={{ shrink: true }} helperText={<ErrorMessage name="EmploymentDate" />} />
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
                                                    <Field name="grade" as={TextField} label="Grade" fullWidth helperText={<ErrorMessage name="grade" />} />
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
                                                    <Field name="clockin" as={TextField} label="Clock-in Time" fullWidth helperText={<ErrorMessage name="clockin" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="clockout" as={TextField} label="Clock-out Time" fullWidth helperText={<ErrorMessage name="clockout" />} />
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
        </Container>
    );
};

export default Create;
