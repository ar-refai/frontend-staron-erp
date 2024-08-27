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
        '/finance/finance-treasury': 'Liquidity Pivot',
        '/finance/finance-treasury-ap': 'Account Payable',
        '/finance/finance-treasury-ar': 'Account Recivable',
        '/finance/finance-treasury-cashflow': 'Cashflow',
        '/finance/finance-treasury-cashflow-mapping': 'Cashflow Mapping',
        '/finance/finance-treasury-cashflow-history': 'Cashflow History',
        '/finance/finance-treasury-banks-checks': 'Bank Accounts',
        '/finance/finance-treasury-collection': 'Collection',
        '/finance/finance-ar-requests': 'Liuidity Requests',
        '/finance/finance-treasury-tab': 'Treasury Log',
    };

    const currentTitle = titles[url.pathname];
    console.log(url.pathname.includes("collection-detail"));
    console.log(url.pathname.includes("finance/banks/profile"));

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
                            {/* {console.log(url.pathname.includes("collection-detail"))} */}
                        </Typography>
                            )}
                            {url.pathname.includes("finance/banks/profile") && 
                            (
                                <Typography variant='h3' sx={{
                                    color: colors.primary[200],
                                    marginLeft: '10px',
                                    padding: '10px 12px'
                                }}>
                                Bank Profile
                                </Typography>
                            )}
                </Typography>
            </Box>
            <Outlet />
        </>
    );
}
