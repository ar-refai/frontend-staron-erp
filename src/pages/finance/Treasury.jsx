import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { tokens } from 'theme';
import { useTheme } from '@mui/material/styles';
import AP from './components/treasury/AP';
import AR from './components/treasury/AR';
import Collection from './components/treasury/Collection';
import TreasuryRequests from './components/treasury/LiquidityRequests';
import CashFlow from './components/treasury/CashFlow';
import BanksChecks from './components/treasury/BankAccounts';
import TreasuryTab from './components/treasury/TreasuryTab';

const Treasury = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(0.5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 2,
                gridTemplateRows: 'repeat(2, 250px) 1fr',
                gridAutoRows: 'minmax(250px, auto)',
                width: '100%',
                minHeight: '750px',
            }}
        >
            {/* AP */}
            <Item sx={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
                <AP />
            </Item>
            {/* AR */}
            <Item sx={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
                <AR/>
            </Item>
            {/* Collection */}
            <Item sx={{ gridColumn: 'span 1', gridRow: 'span 3' }}>
                <Collection/>
            </Item>
            {/* Requests */}
            <Item sx={{ gridColumn: 'span 1', gridRow: 'span 3' }}>
                <TreasuryRequests />
            </Item>
            {/* CashFlow */}
            <Item sx={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
                <CashFlow/>
            </Item>
            {/* BanksChecks (First one, spans two columns) */}
            <Item sx={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
                <BanksChecks/>
            </Item>
            {/* Treasury (Second one, spans two columns) */}
            <Item sx={{ gridColumn: 'span 2', gridRow: 'span 1' }}>
                <TreasuryTab/>
            </Item>
        </Box>
    );
}

export default Treasury;
