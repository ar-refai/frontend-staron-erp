import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, Autocomplete, useTheme } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { MaterialReactTable } from 'material-react-table';
import { ShowTBRecords, AllAccountsFlatted } from '../../../../../apis/FainanceApi/FinanceRequests'; // Adjust the import path
import { tokens } from 'theme';

const TrialBalance = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [tbRecords, setTbRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // Fetch all accounts for the Autocomplete options
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountsData = await AllAccountsFlatted();
        // console.log(accountsData)
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

  // Handle selection of accounts and fetch TB records
  const handleAccountChange = async (event, newValue) => {
    setSelectedAccounts(newValue);

    if (newValue.length > 0) {
      setLoading(true);

      const selectedAccountsObject = {
        accounts: newValue.map((account) => ({ id: account.id })),
      };

      try {
        // console.log(selectedAccountsObject);
        // @ts-ignore
        const recordsData = await ShowTBRecords(JSON.stringify(selectedAccountsObject,0,2));
        console.log(recordsData);

        if (recordsData && recordsData.trial_balance) {
          setTbRecords(recordsData.trial_balance);
        }
      } catch (error) {
        console.error('Failed to fetch TB records', error);
      } finally {
        setLoading(false);
      }
    } else {
      setTbRecords([]);
    }
  };

  // Define the columns for MaterialReactTable
  const columns = [
    {
      header: 'Account Name',
      accessorKey: 'account_name', // Assuming 'account_name' exists in your data
    },
    {
      header: 'Debit',
      accessorKey: 'debit', // Assuming 'debit' exists in your data
    },
    {
      header: 'Credit',
      accessorKey: 'credit', // Assuming 'credit' exists in your data
    },
  ];

  return (
    <>
      <Autocomplete
        multiple
        id="account-select"
        options={accounts || []} // Fallback to an empty array if accounts is not yet loaded
        disableCloseOnSelect
        getOptionLabel={(option) => `${option.code} - ${option.name}`}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={handleAccountChange}
        value={selectedAccounts}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                color='info'
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {`${option.code} - ${option.name}`}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select Accounts" variant="outlined" color="info" fullWidth />
        )}
      />

      <div style={{ marginTop: '20px' }}>
        <MaterialReactTable
          columns={columns}
          data={tbRecords}
          enablePagination={true}
          enableSorting={true}
          state={{
            isLoading: loading,
            showSkeletons: loading,
          }}
          paginationDisplayMode="pages"
          muiSkeletonProps={{
            animation: 'wave',
          }}
          muiPaginationProps={{
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30, 40],
            shape: 'rounded',
            variant: 'outlined',
          }}
          muiTablePaperProps={{
            elevation: 2,
            sx: { borderRadius: '20px' },
          }}
          muiTableContainerProps={{
            sx: { backgroundColor: colors.primary[400] },
          }}
          muiTableHeadCellProps={{
            sx: { backgroundColor: colors.primary[400] },
          }}
          muiTableBodyCellProps={{
            sx: { backgroundColor: colors.primary[400] },
          }}
        />
      </div>
    </>
  );
};

export default TrialBalance;
