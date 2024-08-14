import { Box, Grid, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material'
import React, { useMemo } from 'react'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { tokens } from 'theme';
import TagIcon from '@mui/icons-material/Tag';
import { MaterialReactTable } from 'material-react-table';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
// This is the Trial Balance Api Fiunction Request To get the data for the table 
import {ShowTBRecords} from "../../../../apis/FainanceApi/FinanceRequests"
// More Comments are always very helpful for the programmer 
const data = [
  {
  account: "Cash and Cash Equivalents - 10001000",
  debit: "10000",
  credit: "10000",
  },
  {
    account: "Cash and Cash Equivalents - 10001000",
    debit: "10000",
    credit: "10000",
  },
  {
    account: "Cash and Cash Equivalents - 10001000",
    debit: "10000",
    credit: "10000",
  },{
    account: "Cash and Cash Equivalents - 10001000",
    debit: "10000",
    credit: "10000",
  },{
    account: "Cash and Cash Equivalents - 10001000",
    debit: "10000",
    credit: "10000",
  }
]







const TrialBalance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? colors.primary[400] : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  const columns = useMemo(() => [
    { accessorKey: 'account', header: 'Account' },
    { accessorKey: 'debit', header: 'Debit' },
    { accessorKey: 'credit', header: 'Credit' },
  ], [data]);


  return (
    <>
      <Grid item >
        <Box
          component="div"
          sx={{
            display: "inline-block",
            p: 1,
            overflow:"hidden",
            textAlign: "center",
            width: "100%",
            bgcolor: colors.primary[600],
            '&:hover': {
              bgcolor: colors.primary[500],
            },
            borderRadius: "5px",
          }}
        >

            {/* Header */}
          <Box component="div" sx={{ p: 1, px:2, textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{display:"flex",justifyContent:'center',alignItems:"center"}}>
                <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }}/>
                <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
                Trial Balance
                </Typography>
              </Box>

              <Link
              to={'/finance/finance-trial-balance'}
              >
              <IconButton 
              color="secondary" 
              aria-label="add to shopping cart">
                <ArrowCircleRightOutlinedIcon  sx={{fontSize:'25px'}}/>
              </IconButton>
                </Link>
            </Box>
          </Box>
        </Box>
          {/* Content */}
          <Box >
            <Box>
            <Stack sx={{display:"flex", flexDirection:"row" , py:'5px', justifyContent:'space-between',alignItems:'center'}}>
              <Item sx={{width:'200px'}}>
                <Typography variant="h5">
                Debit: 155 EGP
                  </Typography>
                  </Item>
              <Item sx={{width:'200px'}}>
                <Typography variant="h5">Credit: 155 EGP</Typography></Item>
              <Item sx={{width:"200px"}}>
                <Typography variant="h5">{1? 'Balanced': "Not Balanced"}</Typography></Item>
            </Stack>
            </Box>
          <MaterialReactTable
        columns={columns}
        data={data}
        initialState={{
          showColumnFilters: false,
          showGlobalFilter: false,
        }}
        muiTableHeadCellProps= {{
          sx: {
            border: '1px solid rgba(81, 81, 81, .5)',
            fontStyle: 'italic',
            fontWeight: 'normal',
            backgroundColor: colors.primary[500],

          },
        }}  
        muiTableBodyCellProps= {{
          sx: {
            border: '1px solid rgba(81, 81, 81, .5)',
            backgroundColor: colors.primary[400],

          },
        }}
        enableBottomToolbar= {false}
        enablePagination = {false}
        // paginationDisplayMode="pages"
        positionToolbarAlertBanner="bottom"
        muiSkeletonProps={{
          animation: 'wave',
        }}
        muiLinearProgressProps={{
          color: 'secondary',
        }}
        muiCircularProgressProps={{
          color: 'secondary',
        }}
        muiSearchTextFieldProps={{
          size: 'small',
          variant: 'outlined',
        }}
        muiPaginationProps={{
          color: 'secondary',
          rowsPerPageOptions: [10, 20, 30],
          shape: 'rounded',
          variant: 'outlined',
        }}
        muiBottomToolbarProps={({ table }) => ({
          sx: { backgroundColor: colors.primary[400] },
        })}
        muiTablePaperProps={{
          elevation: 2,
          sx: {
            borderRadius: '5px',
          },
        }}
        enableStickyHeader= {true}
        enableSorting= {false}
        enableColumnActions= {false}
        enableColumnFilters= {false}
        enableTopToolbar= {false}
    
        muiTableContainerProps={{
          sx: {
            backgroundColor: colors.primary[400],
            maxHeight: '285px',
          },
        }}
      
        muiTableBodyProps={{
          sx: {
            backgroundColor: colors.primary[400],
          },
        }}
      />
          </Box>
      </Grid>
    </>
  )
}

export default TrialBalance