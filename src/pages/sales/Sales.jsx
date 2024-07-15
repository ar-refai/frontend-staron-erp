import React from 'react';
import { Box, Typography } from "@mui/material";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import TagIcon from '@mui/icons-material/Tag';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';

const Sales = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const url = useLocation();
    
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    // If the user is not authenticated or authorized, redirect to the login page
    if (!(user.salesaccess === 1 || user.department === 'admin')) 
        return navigate('/');
    

    const getPageTitle = () => {
        switch (url.pathname) {
            case '/sales/funnel-workflow':
                return 'Funnel Workflow';
            case '/sales/stakeholders-listing':
                return 'Stakeholders Listing';
            case '/sales/analytics':
                return 'Relations Tracking';
            case '/sales/conversion':
                return 'Conversion';
            case '/sales/activity-log':
                return 'Activity Log';
            default:
                return '';
        }
    };

    return (
        <>
            <Box sx={{
                backgroundColor: colors.primary[400],
                padding: '12px 40px',
                margin: '20px',
                borderRadius: '10px',
            }}>
                <Typography variant='h2' sx={{ display: 'flex', alignItems: 'center' }}>
                    <TagIcon sx={{ color: colors.redAccent[500], fontSize: '40px' }} />
                    <Typography variant='h3' sx={{
                        color: colors.primary[200],
                        marginLeft: '10px',
                        padding: '10px 12px'
                    }}>
                        {getPageTitle()}
                    </Typography>
                </Typography>
            </Box>
            <Outlet />
        </>
    );
};

export default Sales;
