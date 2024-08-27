import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, useTheme, DialogActions, Divider, TextField, FormControl, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Link } from 'react-router-dom';
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { tokens } from "theme";
import { AddBankAccount, ShowAllBanks, UpdateBankAccount, ShowBankProfile } from 'apis/FainanceApi/TreasuryRequests';
import Lottie from 'lottie-react';
import Document from '../../../../../assets/lottie/document.json';
import { BorderBottom } from '@mui/icons-material';

const BankAccountsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [arData, setArData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [selectedBankId, setSelectedBankId] = useState(null);

  // Fetch the bank accounts data from the API
  const fetchBankAccountsData = async () => {
    try {
      const response = await ShowAllBanks();
      if (response.status === 200) {
        setArData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch bank accounts data:", error);
    }
  };

  useEffect(() => {
    fetchBankAccountsData();
  }, []);

  const handleAdd = async () => {
    try {
      await AddBankAccount(formData);
      setOpenAddDialog(false);
      setFormData({ name: '' }); // Reset form data after submission
      fetchBankAccountsData();
    } catch (error) {
      console.log("There was an error:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (selectedBankId) {
        await UpdateBankAccount(selectedBankId, { name: formData.name });
        setOpenUpdateDialog(false);
        setFormData({ name: '' }); // Reset form data after submission
        setSelectedBankId(null); // Reset selected bank ID
        fetchBankAccountsData();
      }
    } catch (error) {
      console.log("There was an error:", error);
    }
  };

  const handleEditClick = async (id) => {
    try {
      const response = await ShowBankProfile(id);
      if (response.status === 200) {
        const bankData = response.data;
        setFormData({ name: bankData.name });
        setSelectedBankId(bankData.id);
        setOpenUpdateDialog(true);
      }
    } catch (error) {
      console.log("Failed to fetch bank profile:", error);
    }
  };

  // Define the columns for the table
  const columns: MRT_ColumnDef[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Bank Title",
      Cell: ({ row }) => (
        <Link
          to={`/finance/banks/profile/${row.original.id}`}
          style={{ 
            textDecoration: 'none', 
            color: colors.greenAccent[400] , 
            borderBottom:`1px solid ${colors.greenAccent[400]}` 
          }}
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: "code",
      header: "Bank Code",
    },
    {
      accessorKey: "debit",
      header: "Debit",
    },
    {
      accessorKey: "credit",
      header: "Credit",
    },
    {
      accessorKey: "balance",
      header: "Balance",
    },
    {
      accessorKey: "parent_id",
      header: "Parent ID",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleEditClick(row.original.id)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Grid item xs={12}>
        <Box
          component="div"
          sx={{
            display: "inline-block",
            p: 1,
            width: "100%",
            borderRadius: "5px",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mb: 2 , ml:1 }}
            onClick={() => setOpenAddDialog(true)}
          >
            Add Bank
          </Button>
          <MaterialReactTable
            columns={columns}
            data={arData}
            muiSkeletonProps={{
              animation: "wave",
            }}
            muiSearchTextFieldProps={{
              size: "small",
              variant: "outlined",
            }}
            muiPaginationProps={{
              color: "secondary",
              rowsPerPageOptions: [10, 20, 30, 40],
              shape: "rounded",
              variant: "outlined",
            }}
            muiBottomToolbarProps={({ table }) => ({
              sx: { backgroundColor: colors.primary[400] },
            })}
            muiTablePaperProps={{
              elevation: 2,
              sx: {
                borderRadius: "20px",
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
      {/* Add Record Dialog */}
      <Dialog fullWidth='lg' open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
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
            Add A New Bank Account
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Bank Account Title"
              name='name'
              fullWidth
              margin="dense"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </FormControl>
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

      {/* Update Record Dialog */}
      <Dialog fullWidth='lg' open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
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
            Update Bank Account
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Bank Account Title"
              name='name'
              fullWidth
              margin="dense"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </FormControl>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenUpdateDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BankAccountsPage;
