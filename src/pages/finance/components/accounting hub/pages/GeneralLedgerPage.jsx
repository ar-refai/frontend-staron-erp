import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Paper, Checkbox, useTheme, Box, Typography } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ShowGLRecords, AllAccountsFlatted, ShowAllChildrenAccounts } from '../../../../../apis/FainanceApi/FinanceRequests'; // Adjust the import path
import { MaterialReactTable } from 'material-react-table';
import { tokens } from 'theme';
import TagIcon from '@mui/icons-material/Tag';
import Masonry from '@mui/lab/Masonry';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const GeneralLedger = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [glRecords, setGlRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountsData = await ShowAllChildrenAccounts();
        if (Array.isArray(accountsData.data)) {
          setAccounts(accountsData.data);
        } else {
          console.error('Fetched accounts data is not an array:', accountsData);
          setAccounts([]);
        }
      } catch (error) {
        console.error('Failed to fetch accounts', error);
        setAccounts([]);
      }
    };
    fetchAccounts();
  }, []);

  const handleAccountChange = async (event, newValue) => {
    setSelectedAccounts(newValue);
    
    if (newValue.length > 0) {
      setLoading(true);

      try {
        const selectedAccountIds = newValue.map((account) => ({ id: account.id }));
        const recordsData = await ShowGLRecords({ accounts: selectedAccountIds });
        setGlRecords(recordsData.all_lager || []);
      } catch (error) {
        console.error('Failed to fetch GL records', error);
      } finally {
        setLoading(false);
      }
    } else {
      setGlRecords([]);
    }
  };

  const columns = [
    {
      header: 'Date',
      accessorKey: 'date',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Debit',
      accessorKey: 'debit',
    },
    {
      header: 'Credit',
      accessorKey: 'credit',
    },
    {
      header: 'Balance',
      accessorKey: 'balance',
    },
  ];

  return (
    <>
      <Autocomplete
        multiple
        id="account-select"
        options={accounts || []}
        disableCloseOnSelect
        getOptionLabel={(option) => `${option.code} - ${option.name}`}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {`${option.code} - ${option.name}`}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Search Accounts" variant="outlined" color="info" fullWidth />
        )}
        value={selectedAccounts}
        onChange={handleAccountChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ bgcolor: colors.primary[400] }}
      />

      <Box sx={{ marginTop: '20px' }}>
        <Masonry
          columns={{ xs: 1, sm: 2}}
          spacing={2}
        >
          {glRecords.map((account, index) => (
            <Paper 
              key={index} 
              sx={{
                padding: '10px', 
                borderRadius: '10px', 
                backgroundColor: colors.primary[400], 
                display: 'flex', 
                flexDirection: 'column'
              }}
            >
              <Box 
                sx={{
                  width: '100%', 
                  bgcolor: colors.primary[400], 
                  padding: '20px', 
                  borderRadius: '10px', 
                  mb: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: "center" }}>
                  <TagIcon sx={{ color: colors.redAccent[500], fontSize: '40px' }} />
                  <Typography variant='h3'>{account.account_name}</Typography>
                </Box>
              </Box>

              <MaterialReactTable
                columns={columns}
                data={account.general_leger || []}
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
            </Paper>
          ))}
        </Masonry>
      </Box>
    </>
  );
};

export default GeneralLedger;
