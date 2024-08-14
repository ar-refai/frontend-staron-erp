import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Box,
  Divider,
  useTheme,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  MainJournalAccounts,
  AddMainJournalRecord,
  UpdateMainJournalRecord,
  ShowAllChildrenAccounts,
  getSingleMainJournalRecord,
} from 'apis/FainanceApi/FinanceRequests'; // Import your API functions
import { MaterialReactTable } from 'material-react-table';
import Lottie from 'lottie-react';
import Document from '../../../../assets/lottie/document.json';
import { tokens } from 'theme';

const MainJournal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [childAccounts, setChildAccounts] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [selectedRow , setSelectedRow] = useState({});
  const [newRecord, setNewRecord] = useState({
    debit_id: '',
    credit_id: '',
    value: '',
    description: '',
  });

  useEffect(() => {
    // Fetch all main journal accounts data
    fetchData();

    // Fetch all child accounts for select inputs
    showAllChildren();
  }, []);

  const showAllChildren = async () => {
    try{
      const response = await ShowAllChildrenAccounts();
      setChildAccounts(response.data);
      // console.log("########");
      // console.log(response);
      // console.log("#######")
    }catch(e){console.log("There Was an Error : ",e);}
  }

  function flattenData(input) {
    let result = [];

    // Ensure input is an array and iterate over it
    if (Array.isArray(input)) {
        input.forEach(group => {
            if (group.data && Array.isArray(group.data)) {
                group.data.forEach(item => {
                    result.push({
                        invoice_group_id: group.invoice_group_id,
                        start_of_week: group.start_of_week,
                        end_of_week: group.end_of_week,
                        ...item
                    });
                });
            }
        });
    }

    return result;
}



  const fetchData = async() => {
    try{
      const response = await MainJournalAccounts();
      console.log(response.data);
      
      setData(flattenData(response.data));
      console.log(data);
      // console.log("########");
      // console.log(response);
      // console.log("#######")
    }catch(e){console.log("There Was an Error : ",e);}
  }

  const handleAdd = async () => {
    try{
      const response = await AddMainJournalRecord(newRecord); 
      // console.log("########");
      // console.log(response);
      // console.log(newRecord);
      // console.log("#######")
      setNewRecord({
            debit_id: '',
            credit_id: '',
            value: '',
            description: '',
          
          })
      setOpenAddDialog(false);
      fetchData();

    }catch(e){console.log("There Was an Error : ",e);}
  };

  const handleEdit = async (id,data) => {
    // console.log("########");
    // console.log(data);

    // console.log(formData);
    try {
    const formData = 
    {
      debit_id: data.debit_account.id,
      credit_id: data.credit_account.id,
      value: data.value,
      description:data.description
  }
    const response = await UpdateMainJournalRecord(id, formData);
    setOpenEditDialog(false);
    fetchData();
    }
    catch(e){console.log("There Was an Error : ",e);
  };
}

  const handleOpenEditDialog = (row) => {
      getSingleMainJournalRecord(row.original.id).then((response) => {
      setCurrentRecord(response.data);
      setSelectedRow(row);
      // console.log(row)
      // console.log(selectedRow)
      setOpenEditDialog(true);
    });
  };

  const columns = [
    {
      accessorKey: 'invoice_group_id',
      header: 'Invoice Grouping ID',
    },
    {
      accessorKey: 'start_of_week',
      header: 'Week Start',
    },
    {
      accessorKey: 'end_of_week',
      header: 'Week End',
    },
    {
      // accessorFn: (row) => `${row?.data.map((item => item.date))}`,
      accessorKey: 'date',
      header: 'Date',
    },
    {
      // accessorFn: (row) => `${row?.data[0].debit_account_description}`,
      accessorKey: 'debit_account_description',
      header: 'Debit Account',
    },
    {
      // accessorFn: (row) => `${row?.data[0].debit_id}`,
      accessorKey: 'debit_id',
      header: 'Debit Account ID',
    },
    {
      // accessorFn: (row) => `${row?.data[0].credit_account_description}`,
      accessorKey: 'credit_account_description',
      header: 'Credit Account',
    },
    {
      // accessorFn: (row) => `${row?.data[0].credit_id}`,
      accessorKey: 'credit_id',
      header: 'Credit Account ID',
    },
    {
      // accessorFn: (row) => `${row?.data[0].value} EGP`,
      accessorKey: 'value',
      header: 'Value',
    },
    {
      // accessorFn: (row) => `${row?.data[0].description}`,
      accessorKey: 'description',
      header: 'Description',
    },
    {
      // accessorFn: (row) => `${row?.data[0].invoice_id}`,
      accessorKey: 'invoice_id',
      header: 'Invoice ID',
    },
    {
      header: 'Actions',
      Cell: ({ row }) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleOpenEditDialog(row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ mb: 2 }}
        onClick={() => setOpenAddDialog(true)}
      >
        Add Record
      </Button>
      <MaterialReactTable
        columns={columns}
        data={data}
        
        enableRowActions={false}
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

      {/* Add Record Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px',
              textTransform: 'uppercase',
            }}
          >
            <Lottie
              style={{ width: '30px', display: 'flex' }}
              animationData={Document}
            />
            Add A Record
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
        <FormControl fullWidth margin="normal">
        <InputLabel>Debit Account</InputLabel>
          <Select
            labelId="debit-select-label"
            id="depit-select"
            label="Debit Account"
            sx={{mb:-1}}
            value={newRecord.debit_id}
            onChange={(e) =>
              setNewRecord({ ...newRecord, debit_id: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            {childAccounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.name}
              </MenuItem>
            ))}
          </Select>

          </FormControl>
          <FormControl fullWidth margin="normal">
        <InputLabel>Credit Account</InputLabel>

          <Select
          labelId="credit-select-label"
            id="credit-select"
            label="Credit Account"
            value={newRecord.credit_id}
            onChange={(e) =>
              setNewRecord({ ...newRecord, credit_id: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            {childAccounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          <TextField
            label="Value"
            value={newRecord.value}
            onChange={(e) =>
              setNewRecord({ ...newRecord, value: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            value={newRecord.description}
            onChange={(e) =>
              setNewRecord({ ...newRecord, description: e.target.value })
            }
            fullWidth
            margin="dense"
            multiline
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenAddDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Record Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px',
              textTransform: 'uppercase',
            }}
          >
            <Lottie
              style={{ width: '30px', display: 'flex' }}
              animationData={Document}
            />
            Edit A Record
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          
        <FormControl fullWidth margin="normal">
        <InputLabel>Debit Account</InputLabel>
          <Select
            labelId="debite-select-label"
            id="debite-select"
            label="Debit Account"
            value={currentRecord?.debit_id || ''}
            onChange={(e) =>
              setCurrentRecord({ ...currentRecord, debit_id: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            {childAccounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
        <InputLabel> Credit Account</InputLabel>

          <Select
          labelId="creditee-select-label"
            id="creditee-select"
            label="Credit Account"
            value={currentRecord?.credit_id || ''}
            onChange={(e) =>
              setCurrentRecord({ ...currentRecord, credit_id: e.target.value })
            }
            fullWidth
            margin="dense"
          >
            {childAccounts.map((account) => (
              <MenuItem key={account.id} value={account.id}>
                {account.name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          <TextField
            label="Value"
            value={currentRecord?.value || ''}
            onChange={(e) =>
              setCurrentRecord({ ...currentRecord, value: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Description"
            value={currentRecord?.description || ''}
            onChange={(e) =>
              setCurrentRecord({ ...currentRecord, description: e.target.value })
            }
            fullWidth
            margin="dense"
            multiline
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenEditDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="secondary" onClick={()=> handleEdit(selectedRow?.original.id, currentRecord)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MainJournal;
