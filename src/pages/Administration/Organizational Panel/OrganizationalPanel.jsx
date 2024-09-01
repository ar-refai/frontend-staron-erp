import styled from '@emotion/styled';
import { Box, Paper, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from 'theme';
import RentsPage from './Rents/Rents';
import ExtraFees from '../ExtraFees';
import UnPlanned from '../UnPlanned';

const OrganizationalPanel = () => {
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
        {/* Rents */}
        <Item sx={{ gridColumn: 'span 4', gridRow: 'span 1' }}>
            <RentsPage />
        </Item>
        {/* Extra Fees */}
        <Item sx={{ gridColumn: 'span 4', gridRow: 'span 1' }}>
            <ExtraFees />
        </Item>
        {/* Unplanned */}
        <Item sx={{ gridColumn: 'span 4', gridRow: 'span 1' }}>
            <UnPlanned />
        </Item>
    </Box>
    )
}

export default OrganizationalPanel