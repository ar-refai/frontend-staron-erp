import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Paper, useTheme } from '@mui/material';
import { ShowGLRecords, AllAccountsFlatted ,ShowTBRecords } from '../../../../apis/FainanceApi/FinanceRequests'; // Adjust the import path
import { MaterialReactTable } from 'material-react-table';
import { tokens } from 'theme';

const GeneralLedger = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [glRecords, setGlRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountsData = await AllAccountsFlatted();
        if (Array.isArray(accountsData.data)) {
          setAccounts(accountsData.data);
        } else {
          console.error('Fetched accounts data is not an array:', accountsData);
          setAccounts([]); // Safeguard against non-array data
        }
      } catch (error) {
        console.error('Failed to fetch accounts', error);
        setAccounts([]); // Fallback to an empty array on error
      }
    };
    fetchAccounts();
  }, []);

  const handleAccountChange = async (event, newValue) => {
    if (newValue) {
      setLoading(true);
      setSelectedAccount(newValue);

      try {
        const recordsData = await ShowGLRecords(newValue.id);  // Make sure `newValue.id` is the correct identifier
        setGlRecords(recordsData.data);
      } catch (error) {
        console.error('Failed to fetch GL records', error);
      } finally {
        setLoading(false);
      }
    } else {
      setGlRecords([]);
    }
  };

  // Define the columns for MaterialReactTable
  const columns = [
    {
      header: 'Date',
      accessorKey: 'date', // Assuming 'date' exists in your data
    },
    {
      header: 'Description',
      accessorKey: 'description', // Assuming 'description' exists in your data
    },
    {
      header: 'Debit',
      accessorKey: 'debit', // Assuming 'debit' exists in your data
    },
    {
      header: 'Credit',
      accessorKey: 'credit', // Assuming 'credit' exists in your data
    },
    {
      header: 'Balance',
      accessorKey: 'balance', // Assuming 'balance' exists in your data
    },
  ];

  return (
    <>
      <Autocomplete
        id="account-select"
        sx={{bgcolor:colors.primary[400]}}
        options={accounts || []} // Fallback to an empty array if accounts is not yet loaded
        getOptionLabel={(option) => `${option.code} - ${option.name}`}
        renderInput={(params) => (
          <TextField {...params} label="Search Account" variant="outlined" color='info'  fullWidth />
        )}
        value={selectedAccount}
        onChange={handleAccountChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />

      <div style={{ marginTop: '20px' }}>
        <MaterialReactTable
          columns={columns}
          data={glRecords}
          enablePagination={true}
          enableSorting={true}
          state={{
            isLoading: loading,
            showSkeletons: loading,
          }}
          paginationDisplayMode="pages"
        positionToolbarAlertBanner="bottom"
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
      </div>
    </>
  );
};

export default GeneralLedger;
