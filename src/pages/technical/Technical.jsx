import * as React from 'react';
import { Box, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TagIcon from '@mui/icons-material/Tag';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';

export default function Tech() {
 
    
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const url = useLocation();
    // console.log(url.pathname);
    const getPageTitle = () => {
        switch (url.pathname) {
            case '/technical/quotation-generation-framework':
                return 'Quotation Generation Framework';
            default:
                return '';
        }
    };
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    // If the user is not authenticated or authorized, redirect to the login page
    if (!(user.technicalaccess === 1 || user.department === 'admin')) 
        return navigate('/');
    // console.log(user)
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
                    <Typography variant='h2' sx={{
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
}
