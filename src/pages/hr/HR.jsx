import * as React from 'react';
import { Avatar, Box, Card, Chip, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import TagIcon from '@mui/icons-material/Tag';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';

export default function HR() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const url = useLocation();
  console.log(url.pathname);

  return (
    <>
      <Box sx={{
        backgroundColor: colors.primary[400],
        padding: '12px 40px',
        margin: '20px 20px 10px 10px',
        borderRadius: '10px',
      }}>
        <Typography variant='h2' sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <TagIcon sx={{ color: colors.redAccent[500], fontSize: '40px' }} />
          {url.pathname === '/hr/timesheet' && (
            <Typography variant='h2' sx=
              {{
                color: colors.primary[200],
                marginLeft: '10px',
                padding: '10px 12px'

              }}
            >Attendence Timesheet</Typography>
          )}

          {url.pathname === '/hr/employees-list' && (
            <Typography variant='h2' sx=
              {{
                color: colors.primary[200],
                marginLeft: '10px',
                padding: '10px 12px'

              }}
            >Employees Repository</Typography>
          )}

          {url.pathname === '/hr/requests-approval' && (
            <Typography variant='h2' sx=
              {{
                color: colors.primary[200],
                marginLeft: '10px',
                padding: '10px 12px'

              }}
            >Requests Approval</Typography>
          )}

          {url.pathname === '/hr/requirments-approval' && (
            <Typography variant='h2' sx=
              {{
                color: colors.primary[200],
                marginLeft: '10px',
                padding: '10px 12px'

              }}
            >Requirments Approval</Typography>
          )}

          {url.pathname === '/hr/payroll' && (
            <Typography variant='h2' sx=
              {{
                color: colors.primary[200],
                marginLeft: '10px',
                padding: '10px 12px'

              }}
            > Payroll</Typography>
          )}

          {url.pathname === '/hr/incentive-remuneration' && (
            <Typography variant='h2' sx=
              {{
                color: colors.primary[200],
                marginLeft: '10px',
                padding: '10px 12px'

              }}
            >Incentive Remuneration</Typography>
          )}

          {url.pathname === '/hr/leave-balance' && (
            <Typography variant='h2' sx=
              {{
                color: colors.primary[200],
                marginLeft: '10px',
                padding: '10px 12px'

              }}
            >Leave Balance</Typography>
          )}

          {url.pathname === '/hr/warning-log' && (
            <Typography variant='h2' sx=
              {{
                color: colors.primary[200],
                marginLeft: '10px',
                padding: '10px 12px'

              }}
            >Monthly Warning Log</Typography>
          )}

        </Typography>


      </Box>
      <Outlet />
    </>
  );
}
