import styled from '@emotion/styled';
import { Box, Paper, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from 'theme';
import PayrollPanel from './oraganizational panel pages/PayrollPanel';
import InsurancePanel from './oraganizational panel pages/InsurancePanel';

const HrOrganizationalPanel = () => {
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
            gridTemplateRows: 'repeat(2, 350px) 1fr',
            gridAutoRows: 'minmax(250px, auto)',
            width: '100%',
            minHeight: '750px',
        }}
    >
        {/* Payroll */}
        <Item sx={{ gridColumn: 'span 4', gridRow: 'span 1' }}>
            <PayrollPanel />
        </Item>
        {/* Insurance */}
        <Item sx={{ gridColumn: 'span 4', gridRow: 'span 1' }}>
            <InsurancePanel />
        </Item>
        
    </Box>
    )
}

export default HrOrganizationalPanel