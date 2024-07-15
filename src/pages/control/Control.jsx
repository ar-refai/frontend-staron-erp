import React from 'react';
import { Box, Typography } from "@mui/material";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import TagIcon from '@mui/icons-material/Tag';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';

const Control = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const url = useLocation();
    
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    // If the user is not authenticated or authorized, redirect to the login page
    if (!(user.controlaccess === 1 || user.department === 'admin')) 
        return navigate('/');
    

    const getPageTitle = () => {
        switch (url.pathname) {
            case '/control/monthly-framework':
                return 'Monthly Framework';
            case '/control/productivity-tracking':
                return 'Productivity Tracking';
            case '/control/procurement-requests':
                return 'Procurement Requests';
            case '/control/package-development':
                return 'Package Development';
            case '/control/warehouse-requests':
                return 'Warehouse Requests';
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

export default Control;
