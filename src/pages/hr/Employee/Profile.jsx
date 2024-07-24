import React, { useState, useEffect } from "react";
import { Container, Paper, Typography, Grid, Avatar,  Divider, Box, useTheme, Link, Button, IconButton } from "@mui/material";
import { showEmployee } from "../../../apis/Employee";
import { tokens } from "theme";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const Profile = (rowData) => {
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    // console.log(rowData)
    // console.log(rowData.employee.id)
    const TimeCorrector =(timeString)=> {
        const date = new Date(timeString);
        
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        
        return formattedTime;    }

        const dateCorrector = (dateString) => {
            const date = new Date(dateString);
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(date.getUTCDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
            
        }

    useEffect(() => {
        setLoading(true);
        showEmployee(rowData.employee.id)
            .then((response) => {
                setEmployeeData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching employee data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [rowData.employee.id]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!employeeData) {
        return <Typography>Error: Employee data not found</Typography>;
    }

    const {
        name,
        email,
        address,
        phone,
        department,
        job_role,
        profileimage,
        EmploymentDate,
        salary,
        MedicalInsurance,
        SocialInsurance,
        clockin,
        clockout,
        Supervisor,
        Trancportation,
        TimeStamp,
        startwork,
        endwork,
        hr_code,
        segment,
        tax,
        pdf,
        job_tybe,
        VacationBalance


        // Add more fields as necessary
    } = employeeData;

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        {/* {console.log(profileimage)} */}
                        <Avatar
                            src={`http://api.staronegypt.com.eg/${profileimage}`}
                            alt={name}
                            sx={{ width: 128, height: 128, mb: 2, mx: "auto" }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h5" gutterBottom>
                            {name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Hr Code: &nbsp;
                            <Box component="div" sx={{ display: 'inline', color:colors.grey[200] }}>
                            {hr_code}
                            </Box>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Email:&nbsp; 
                            <Box component="div" sx={{ display: 'inline', color:colors.grey[200] }}>
                             {email}
                            </Box>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Phone: &nbsp;
                            <Box component="div" sx={{ display: 'inline', color:colors.grey[200] }}>
                            {phone}
                            </Box>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Address: &nbsp;
                            <Box component="div" sx={{ display: 'inline', color:colors.grey[200] }}>
                            {address}
                            </Box>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Department:&nbsp;
                            <Box component="div" sx={{ display: 'inline', color:colors.grey[200] }}>
                            {department}
                            </Box>
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Job Role: &nbsp;
                            <Box component="div" sx={{ display: 'inline', color:colors.grey[200] }}>
                            {job_role}
                            </Box>
                        </Typography>
                        {/* <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<Edit />}
                            // onClick={onEdit}
                        >
                            Edit
                        </Button> */}
                    </Grid>
                </Grid>
                <Divider sx={{ my: 3 }} />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Employment Date
                        </Typography>
                        <Typography variant="body1">
                            {dateCorrector(EmploymentDate)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Salary
                        </Typography>
                        <Typography variant="body1">${salary}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Medical Insurance
                        </Typography>
                        <Typography variant="body1">${MedicalInsurance}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Social Insurance
                        </Typography>
                        <Typography variant="body1">${SocialInsurance}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Clock-in Time
                        </Typography>
                        <Typography variant="body1">{clockin}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Clock-out Time
                        </Typography>
                        <Typography variant="body1">{clockout}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Transportation
                        </Typography>
                        <Typography variant="body1">{Trancportation}$</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Supervisor
                        </Typography>
                        <Typography variant="body1">{Supervisor}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Timestamp
                        </Typography>
                        <Typography variant="body1">{TimeStamp}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Start Work
                        </Typography>
                        <Typography variant="body1">{startwork}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            End Work
                        </Typography>
                        <Typography variant="body1">{endwork}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Job Type
                        </Typography>
                        <Typography variant="body1">{job_tybe}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Segment
                        </Typography>
                        <Typography variant="body1">{segment}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Tax
                        </Typography>
                        <Typography variant="body1">{tax}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            pdf File
                        </Typography>
                        <IconButton variant='text' color="info" sx={{borderRadius:"50%" , width:'30px' , height:'30px'}}>
                        <a href={`http://api.staronegypt.com.eg${pdf}`} target="_blank" download color="inherit" >
                        <FileDownloadOutlinedIcon/>
                        </a>
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Vacation Balance
                        </Typography>
                        <Typography variant="body1">{VacationBalance}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Profile;
