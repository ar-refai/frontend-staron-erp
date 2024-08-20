import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, useTheme, Chip } from '@mui/material';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { tokens } from 'theme';
import { ShowAPCollection } from 'apis/FainanceApi/TreasuryRequests';

const ApPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [arData, setArData] = useState([]);

  // Fetch the AR collection data from the API
  useEffect(() => {
    const fetchArData = async () => {
      try {
        const response = await ShowAPCollection();
        if (response.status === 200) {
          setArData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch AR collection data:', error);
      }
    };

    fetchArData();
  }, []);

  // Define the columns for the table
  const columns: MRT_ColumnDef[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'debit_id',
      header: 'Debit ID',
    },
    {
      accessorKey: 'debit_account_description',
      header: 'Debit Account Description',
    },
    {
      accessorKey: 'credit_id',
      header: 'Credit ID',
    },
    {
      accessorKey: 'credit_account_description',
      header: 'Credit Account Description',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'value',
      header: 'Value',
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
    {
      accessorKey: 'collection_date',
      header: 'Collection Date',
    },
    {
      accessorKey: 'collection_type',
      header: 'Collection Type',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ cell }) => (
        <Chip
          label={cell.getValue()}
          variant="outlined"
          color={cell.getValue() === 'in progress' ? 'warning' : 'success'}
        />
      ),
    },
  ];

  return (
    <Grid item xs={12}>
      <Box
        component="div"
        sx={{
          display: 'inline-block',
          p: 1,
          textAlign: 'center',
          width: '100%',
          borderRadius: '5px',
        }}
      >
        <MaterialReactTable
          columns={columns}
          data={arData}
          muiSkeletonProps={{
            animation: 'wave',
          }}
          muiSearchTextFieldProps={{
            size: 'small',
            variant: 'outlined',
          }}
          muiPaginationProps={{
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30, 40],
            shape: 'rounded',
            variant: 'outlined',
          }}
          muiBottomToolbarProps={({ table }) => ({
            sx: { backgroundColor: colors.primary[400] },
          })}
          muiTablePaperProps={{
            elevation: 2,
            sx: {
              borderRadius: '20px',
            },
          }}
          muiTableContainerProps={{
            sx: {
              backgroundColor: colors.primary[400],
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              backgroundColor: colors.primary[400],
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              backgroundColor: colors.primary[400],
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
  );
};

export default ApPage;
