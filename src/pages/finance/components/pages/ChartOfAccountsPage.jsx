import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton, useTheme } from '@mui/material';
import { type MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { tokens } from 'theme';
import { ShowAllAccounts, AccountsList } from 'apis/FainanceApi/FinanceRequests';
import AddAccountModal from './components/AddAccount'; // Ensure the correct import path
import UpdateAccountModal from './components/UpdateAccount';
import EditIcon from '@mui/icons-material/Edit';
const ChartOfAccounts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [accountsData, setAccountsData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [accountsList, setAccountsList] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  // Fetch the account data from the API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await ShowAllAccounts();
        if (response.status === 200) {
          setAccountsData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch accounts data:', error);
      }
    };

    const fetchAccountsList = async () => {
      try {
        const response = await AccountsList();
        if (response.status === 200) {
          setAccountsList(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch accounts list:', error);
      }
    };

    fetchAccounts();
    fetchAccountsList();
  }, []);

  const handleAccountUpdate = async () => {
    // Refresh accounts data after update
    const response = await ShowAllAccounts();
    if (response.status === 200) {
      setAccountsData(response.data);
    }
  };

  // Recursively map the accounts to include nested children
  const mapAccountsToRows = (accounts) => {
    return accounts.map((account) => ({
      ...account,
      subRows: mapAccountsToRows(account.children_recursive || [])
    }));
  };

  // Prepare the data for the table
  const tableData = mapAccountsToRows(accountsData);

  // Define the columns for the table
  const columns: MRT_ColumnDef<typeof accountsData[0]>[] = [
    {
      accessorKey: 'name',
      header: 'Account Name'
    },
    {
      accessorKey: 'code',
      header: 'Account Code'
    },
    {
      accessorKey: 'debit',
      header: 'Debit'
    },
    {
      accessorKey: 'credit',
      header: 'Credit'
    },
    {
      accessorKey: 'balance',
      header: 'Balance'
    }
    // Add more columns as needed
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
          borderRadius: '5px'
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setOpenModal(true)}
          sx={{ mb: 2, display: 'flex', justifyContent: 'start' }}
        >
          Add Account
        </Button>
        <MaterialReactTable
          columns={columns}
          data={tableData}
          enableExpanding
          enableEditing
          initialState={{ expanded: false }}
          paginationDisplayMode="pages"
          positionToolbarAlertBanner="bottom"
          muiSkeletonProps={{
            animation: 'wave'
          }}

          renderRowActions={({ row }) => (
            <IconButton
              variant="outlined"
              color="secondary"
              onClick={() => {
                setSelectedAccountId(row.original.id);
                setOpenUpdateModal(true);
              }}
            >
              <EditIcon/>
            </IconButton>
          )}

          muiSearchTextFieldProps={{
            size: 'small',
            variant: 'outlined'
          }}
          muiPaginationProps={{
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30, 40],
            shape: 'rounded',
            variant: 'outlined'
          }}
          muiBottomToolbarProps={({ table }) => ({
            sx: { backgroundColor: colors.primary[400] }
          })}
          muiTablePaperProps={{
            elevation: 2,
            sx: {
              borderRadius: '20px'
            }
          }}
          muiTableContainerProps={{
            sx: {
              backgroundColor: colors.primary[400]
            }
          }}
          muiTableHeadCellProps={{
            sx: {
              backgroundColor: colors.primary[400]
            }
          }}
          muiTableBodyCellProps={{
            sx: {
              backgroundColor: colors.primary[400]
            }
          }}
          muiTableBodyProps={{
            sx: {
              backgroundColor: colors.primary[400]
            }
          }}
        />
      </Box>
      <AddAccountModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
      <UpdateAccountModal
                  isOpen={openUpdateModal}
                  onClose={() => setOpenUpdateModal(false)}
                  accountId={selectedAccountId}
                  onUpdated={handleAccountUpdate}
                />
    </Grid>
  );
};

export default ChartOfAccounts;
