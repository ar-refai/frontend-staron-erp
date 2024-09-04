import styled from '@emotion/styled';
import { Box, Paper, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from 'theme';
import FinanceAdministrationPanel from './departments/Administration/FinanceAdministrationPanel';
import FinanceHrPanel from './departments/hr/FinanceHrPanel';
import FinanceOperationPanel from './departments/Operation/FinanceOperationPanel';
import FinanceSalesPanel from './departments/Sales/FinanceSalesPanel';
import FinanceSupplyChainPanel from './departments/supply chain/FinanceSupplyChainPanel';
import FinanceMarketingPanel from './departments/Marketing/FinanceMarketingPanel';

const FinanceOrganizationalPanel = () => {
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
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            gridTemplateRows: 'repeat(2, 360px) 1fr',
            gridAutoRows: 'minmax(250px, auto)',
            width: '100%',
            minHeight: '750px',
        }}
    >
        <Item sx={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
            <FinanceAdministrationPanel /> 
        </Item>
        <Item sx={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
            <FinanceHrPanel />
        </Item>
        <Item sx={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
            <FinanceSupplyChainPanel />
        </Item>
        <Item sx={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
            <FinanceOperationPanel />
        </Item>
        <Item sx={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
            <FinanceSalesPanel />
        </Item>
        <Item sx={{ gridColumn: 'span 1', gridRow: 'span 1' }}>
            <FinanceMarketingPanel />
        </Item>
        
    </Box>
    )
}

export default FinanceOrganizationalPanel