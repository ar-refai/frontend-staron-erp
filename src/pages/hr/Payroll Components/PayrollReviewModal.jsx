import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid } from '@mui/material'
import Lottie from 'lottie-react';
import Document from "../../../assets/lottie/document.json"
import { ThemeColor } from 'components/ThemeColor';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const steps = [
    {
        "id": 1,
        "user_id": "232",
        "Date": "2024-09-01",
        "workdays": "21",
        "holidays": "10",
        "attendance": "21",
        "excuses": "0.00",
        "additions": "0.00",
        "deductions": "1.00",
        "dailyrate": "433.33",
        "paiddays": "30.00",
        "SocialInsurance": "0.00",
        "MedicalInsurance": "0.00",
        "tax": "0.00",
        "TotalPay": "13000.00",
        "TotalLiquidPay": "13000.00",
        "user": {
            "id": 232,
            "name": "Amany Youssef",
            "hr_code": "20338",
            "salary": "12000",
            "department": "Human Resources",
            "profileimage": "/uploads/profileimages/1709045242.jpeg",
            "job_role": "HR Administrator",
            "Supervisor": null,
            "MedicalInsurance": "0",
            "SocialInsurance": "0",
            "Trancportation": "0",
            "kpi": "1000",
            "tax": "0"
        }
    },
    {
        "id": 2,
        "user_id": "232",
        "Date": "2024-09-01",
        "workdays": "21",
        "holidays": "10",
        "attendance": "21",
        "excuses": "0.00",
        "additions": "2-.00",
        "deductions": "1.00",
        "dailyrate": "433.33",
        "paiddays": "30.00",
        "SocialInsurance": "0.00",
        "MedicalInsurance": "0.00",
        "tax": "0.00",
        "TotalPay": "13000.00",
        "TotalLiquidPay": "13000.00",
        "user": {
            "id": 232,
            "name": "Amany Youssef",
            "hr_code": "20338",
            "salary": "12000",
            "department": "Human Resources",
            "profileimage": "/uploads/profileimages/1709045242.jpeg",
            "job_role": "HR Administrator",
            "Supervisor": null,
            "MedicalInsurance": "0",
            "SocialInsurance": "0",
            "Trancportation": "0",
            "kpi": "1000",
            "tax": "0"
        }
    },
];

const PayrollReviewModal = ({
    showReviewModal,
    handleCloseReviewModal,
    filteredData
}) => {
    const colors = ThemeColor();
    const theme = useTheme();

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const currentData = steps[activeStep];  // Current employee's data

    return (
        <Dialog
            open={showReviewModal}
            onClose={handleCloseReviewModal}
            aria-labelledby="description-dialog-title"
            fullWidth={true}
        >
            <Box
                sx={{
                    bgcolor: colors.grey[800]
                }}
            >
                <DialogTitle id="description-dialog-title">
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                        <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                        Payroll Review
                    </Box>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ padding: 0 }}>
                    <DialogContentText sx={{ textAlign: 'start' }}>
                        <Box>
                            <Paper
                                square
                                elevation={0}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: 50,
                                    pl: 2,
                                    bgColor: colors.grey[800],
                                }}
                            >
                                <Typography>Payroll of : {currentData?.user?.name}</Typography>
                            </Paper>
                            <Box sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    {/** Employee Information */}
                                    <Grid item xs={6}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Employee ID:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">
                                            {currentData?.user?.hr_code}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Department:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">
                                            {currentData?.user?.department}
                                        </Typography>
                                    </Grid>
                                    {/** Payroll Details */}
                                    <Grid item xs={6}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Total Pay:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">
                                            {Number(currentData?.TotalPay).toLocaleString()} EGP
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Total Liquid Pay:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">
                                            {Number(currentData?.TotalLiquidPay).toLocaleString()} EGP
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Tax:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">
                                            {Number(currentData?.tax).toLocaleString()} EGP
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Additions:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">
                                            {Number(currentData?.additions).toLocaleString()} EGP
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Deductions:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">
                                            {Number(currentData?.deductions).toLocaleString()} EGP
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Paid Days:
                                        </Typography>
                                    </Grid>
                                
                                    <Grid item xs={6}>
                                        <Typography variant="body1">
                                            {currentData?.paiddays} days
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            {/** Mobile Stepper for navigating employees */}
                            <MobileStepper
                                variant="progress"
                                steps={maxSteps}
                                position="static"
                                activeStep={activeStep}
                                sx={{ flexGrow: 1, bgcolor: colors.primary[400] }}
                                nextButton={
                                    <Button size="small" color='success' onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                        Next
                                        {theme.direction === 'rtl' ? (
                                            <KeyboardArrowLeft />
                                        ) : (
                                            <KeyboardArrowRight />
                                        )}
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" color='warning' onClick={handleBack} disabled={activeStep === 0}>
                                        {theme.direction === 'rtl' ? (
                                            <KeyboardArrowRight />
                                        ) : (
                                            <KeyboardArrowLeft />
                                        )}
                                        Back
                                    </Button>
                                }
                            />
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={handleCloseReviewModal} variant='outlined' color='error'>
                        Close
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default PayrollReviewModal;
