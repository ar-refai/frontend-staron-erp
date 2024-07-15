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

const Update = ({ onSubmit, onClose, selectedRow }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [supervisors, setSupervisors] = useState([]);
    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const steps = ["Personal Info", "Job Details", "Other Details", "Files"];

    useEffect(() => {
        // Fetch selected employee data
        showEmployee(selectedRow.id)
            .then((response) => {
                setInitialValues({
                    ...response.data,
                    profileimage: response.data.profileimage ? response.data.profileimage : null,
                    pdf: response.data.pdf ? response.data.pdf : null,
                });
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching employee data:", error);
                setError("Failed to fetch employee data.");
                setLoading(false);
            });
    }, [selectedRow]);

    const validationSchema = [
        Yup.object().shape({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(8, "Password must be at least 8 characters"),
            password_confirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
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
            clockin: Yup.string()
                .matches(
                    /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/,
                    "Invalid format. Use HH:mm:ss"
                )
                .required("Clock In is required"),
            clockout: Yup.string()
                .matches(
                    /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/,
                    "Invalid format. Use HH:mm:ss"
                )
                .required("Clock Out is required"),
        }),
        Yup.object().shape({
            profileimage: Yup.mixed(),
            pdf: Yup.mixed(),
        }),
    ];

    const handleSubmit = (values, { setSubmitting }) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            if (values[key]) {
                formData.append(key, values[key]);
            }
        });

        UpdateEmployees(formData, selectedRow.id)
            .then((response) => {
                console.log("Employee updated successfully:", response);
                onSubmit(); // Call parent component's onSubmit function
                onClose(); // Close the modal
            })
            .catch((error) => {
                console.error("Error updating employee:", error);
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
                                                    <Field name="password_confirm" as={TextField} label="Confirm Password" type="" fullWidth helperText={<ErrorMessage name="password_confirm" />} />
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
                                                        <MenuItem value="Purchase">Purchase</MenuItem>
                                                        <MenuItem value="HR">HR</MenuItem>
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="job_role" as={TextField} label="Job Role" fullWidth select helperText={<ErrorMessage name="job_role" />}>
                                                        <MenuItem value="CEO">CEO</MenuItem>
                                                        <MenuItem value="Manager">Manager</MenuItem>
                                                        <MenuItem value="Senior Developer">Senior Developer</MenuItem>
                                                        <MenuItem value="Accountant">Accountant</MenuItem>
                                                        <MenuItem value="Supervisor">Supervisor</MenuItem>
                                                        <MenuItem value="Junior Developer">Junior Developer</MenuItem>
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
                                                    <Field name="Supervisor" as={TextField} label="Supervisor" fullWidth helperText={<ErrorMessage name="Supervisor" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="EmploymentDate" as={TextField} label="Employment Date" type="date" fullWidth InputLabelProps={{ shrink: true }} helperText={<ErrorMessage name="EmploymentDate" />} />
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
                                                    <Field name="grade" as={TextField} label="Grade" fullWidth helperText={<ErrorMessage name="grade" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="segment" as={TextField} label="Segment" fullWidth helperText={<ErrorMessage name="segment" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="startwork" as={TextField} label="Start Work" fullWidth helperText={<ErrorMessage name="startwork" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="endwork" as={TextField} label="End Work" fullWidth helperText={<ErrorMessage name="endwork" />} />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="clockin" as={TextField} label="Clock In" fullWidth helperText={<ErrorMessage name="clockin" />} />
                                                    
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field name="clockout" as={TextField} label="Clock Out" fullWidth helperText={<ErrorMessage name="clockout" />} />
                                                </Grid>
                                            </Grid>
                                        )}
                                        {activeStep === 3 && (
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6} sx={{display:'flex', justifyContent:'center' , alignItems:"center", gap:"10px"}}>
                                                    <input
                                                        accept="image/*"
                                                        style={{ display: "none" }}
                                                        id="profileimage"
                                                        multiple
                                                        onChange={(event) => formikProps.setFieldValue("profileimage", event.currentTarget.files[0])}

                                                        type="file"
                                                    />
                                                    <label htmlFor="profileimage">
                                                        <Button
                                                            variant="outlined"
                                                            color="secondary"
                                                            component="span"
                                                        >
                                                            Upload Profile Image
                                                        </Button>
                                                    </label>
                           
                                                    <input
                                                        accept=".pdf"
                                                        style={{ display: "none" }}
                                                        id="pdf"
                                                        multiple
                                                        type="file"
                                                        onChange={(event) => formikProps.setFieldValue("pdf", event.currentTarget.files[0])}


                                                    />

                                                    <label htmlFor="pdf">
                                                        <Button
                                                            variant="outlined"
                                                            color="secondary"
                                                            component="span"
                                                            
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
