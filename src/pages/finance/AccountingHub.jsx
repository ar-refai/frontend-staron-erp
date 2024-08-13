import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { tokens } from 'theme';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ChartOfAccounts from './components/accounting hub/ChartOfAccounts';
import TrialBalance from './components/accounting hub/TrialBalance';
import MainJournal from './components/accounting hub/MainJournal';
import GeneralLedger from './components/accounting hub/GeneralLedger';


const AccountingHub = () => {
  
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
    <Box sx={{ width: '100%', minHeight: 393 }}>
    <Masonry columns={2} spacing={2}>
      
        {/* Chart Of Accounts */}
        <Item sx={{ height:320 }}>
          <ChartOfAccounts />
        </Item>

        {/* Trial Balance */}
        <Item sx={{height: 420}}>
          <TrialBalance />
        </Item>

        {/* Main Journal */}
        <Item sx={{height: 420}}>
          <MainJournal />
        </Item>

        {/* General Ledeger */}
        <Item sx={{height: 320}}>
          
        <GeneralLedger />
        </Item>
    </Masonry>
  </Box>
  )
}

export default AccountingHub