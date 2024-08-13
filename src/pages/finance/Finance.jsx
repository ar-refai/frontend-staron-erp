import * as React from 'react';
import { Box, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TagIcon from '@mui/icons-material/Tag';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';

export default function Finance() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const url = useLocation();
    const user = JSON.parse(localStorage.getItem('staron_user'));
    const navigate = useNavigate();
    // If the user is not authenticated or authorized, redirect to the login page
    // if (!(user.financeaccess === 1 || user.department === 'admin'))
    //     return navigate('/');
    const titles = {
        '/finance/finance-accounting-hub': 'Accounting Hub',
        '/finance/finance-trial-balance': 'Trial Balance',
        '/finance/finance-chart-of-accounts': 'Chart Of Accounts',
        '/finance/finance-main-journal': 'Main Journal',
        '/finance/finance-general-ledger': 'General Ledger',


    };

    const currentTitle = titles[url.pathname];

    return (
        <>
            <Box sx={{
                backgroundColor: colors.primary[400],
                padding: '12px 40px',
                margin: '20px',
                borderRadius: '10px',
            }}>
                <Typography variant='h2' sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <TagIcon sx={{ color: colors.redAccent[500], fontSize: '40px' }} />
                    {currentTitle && (
                        <Typography variant='h3' sx={{
                            color: colors.primary[200],
                            marginLeft: '10px',
                            padding: '10px 12px'
                        }}>
                            {currentTitle}
                        </Typography>
                    )}
                </Typography>
            </Box>
            <Outlet />
        </>
    );
}
