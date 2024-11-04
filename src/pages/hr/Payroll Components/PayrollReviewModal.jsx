import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, TextField } from '@mui/material'
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

// Fake data
const steps = [
    {
        "id": 1,
        "user_id": "232",
        "Date": "2024-09-02",
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
            "job_role": "HR Administrator"
        }
    },
    // additional employee data ...
];

const PayrollReviewModal = ({
    showReviewModal,
    handleCloseReviewModal,
    handleSubmitPayroll
}) => {
    const colors = ThemeColor();
    const theme = useTheme();

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;
    const [stalledEmployees, setStalledEmployees] = React.useState([]);
    const [editableData, setEditableData] = React.useState(steps);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStall = () => {
        setStalledEmployees((prev) => [...prev, editableData[activeStep].user_id]);
        handleNext();
    };

    const handleSubmit = () => {
        const unstalledEmployees = editableData.filter(
            (employee) => !stalledEmployees.includes(employee.user_id)
        );
        handleSubmitPayroll(unstalledEmployees); // Send the unstalled employees for submission
        handleCloseReviewModal();
    };

    const handleInputChange = (e, field) => {
        const updatedData = [...editableData];
        updatedData[activeStep][field] = e.target.value;
        setEditableData(updatedData);
        console.log(editableData);
    };

    const currentData = editableData[activeStep];

    return (
        <Dialog
            open={showReviewModal}
            onClose={handleCloseReviewModal}
            aria-labelledby="description-dialog-title"
            fullWidth={true}
        >
            <Box sx={{ bgcolor: colors.grey[800] }}>
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
                                <Typography>Payroll of: {currentData?.user?.name}</Typography>
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
                                    {/* Add Some more information here if you could  */}
                                    {/* Include Warning logs  */}
                                    {/* Include Employee's Attendance  and highlight the important rows */}

                                    {/** Editable Payroll Details */}
                                    <Grid item xs={6}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Additions:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            value={currentData?.additions}
                                            onChange={(e) => handleInputChange(e, 'additions')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Deductions:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            value={currentData?.deductions}
                                            onChange={(e) => handleInputChange(e, 'deductions')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Holidays:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            type="number"
                                            fullWidth
                                            value={currentData?.holidays}
                                            onChange={(e) => handleInputChange(e, 'holidays')}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            {/** Mobile Stepper */}
                            <MobileStepper
                                variant="progress"
                                steps={maxSteps}
                                position="static"
                                activeStep={activeStep}
                                sx={{ flexGrow: 1, bgcolor: colors.grey[600] }}
                                nextButton={
                                    <Button
                                        size="small"
                                        color='success'
                                        onClick={handleNext}
                                        disabled={activeStep === maxSteps - 1}
                                    >
                                        Next
                                        {theme.direction === 'rtl' ? (
                                            <KeyboardArrowLeft />
                                        ) : (
                                            <KeyboardArrowRight />
                                        )}
                                    </Button>
                                }
                                backButton={
                                    <Button
                                        size="small"
                                        color='warning'
                                        onClick={handleBack}
                                        disabled={activeStep === 0}
                                    >
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
                    {activeStep < maxSteps - 1 ? (
                        <Button onClick={handleStall} variant='outlined' color='secondary'>
                            Stall
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} variant='outlined' color='success'>
                            Submit
                        </Button>
                    )}
                    <Button onClick={handleCloseReviewModal} variant='outlined' color='error'>
                        Close
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default PayrollReviewModal;

// هل يقتات مثلك إلى على قلب كقلبي وما ضرك لو أن تركتني لا علي ولا ليا 
// أما اليوم فلا أملك لنفسي ضرا ولا نفعا. كأني كنت أملكخا سابقا 
// إنما هي أيام ثم تنقضي وما هي إلا غمضة عين فتمر سلمى وتمر صويحباها مرور غيرهم ممن فارقت 
// لا يجمعهم شيء إلا مرارى في القلب موروثة و مرتعا في القلب لا ينضب شجاه ولا ينتهي ألمه 
// فحسبك منك يا سلمى وحسبي 
// لا ألقاك اليوم إلا غير مكترث بجميع النساء وهل أنت إلا إحداهن ناعمة الملمس في أنيابها العطب
// سمني ما شئت فقد اجتمع في الحب والبغض وإن كنت لا أعرف حد الحب على الحقيقة فقد اجتمع في الضدان ولا ريب 
// مرارة تكاد تجرفني وتقلع جذروي اقتلاعا 