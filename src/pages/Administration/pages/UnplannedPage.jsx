import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, useTheme, DialogActions, Divider, TextField, FormControl, Dialog, DialogTitle, DialogContent, Paper, Typography, Chip } from "@mui/material";
import { Link } from 'react-router-dom';
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { tokens } from "theme";
import Lottie from 'lottie-react';
import Document from '../../../assets/lottie/document.json';
import { AddNewUnplanned, ChangeUnplannedStatus, ShowAllUnplanned, ShowUnplanned, UpdateUnplanned } from 'apis/AdministrationApi/OrganiazationalPanel';
import styled from '@emotion/styled';
import TagIcon from '@mui/icons-material/Tag';
import AddUnplannedDialog from './UnplannedComponents/AddUnplannedDialog';
import UpdateUnplannedDialog from './UnplannedComponents/UpdateUnplannedDialog';

const UnplannedPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [arData, setArData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '' , amount: null });
  const [selectedUnplannedId, setSelectedUnplannedId] = useState(null);
  const [formDataUpdate, setFormDataUpdate] = useState({ amount: null });

  // Item for Grid View
  const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(0.5),
      textAlign: 'center',
      color: theme.palette.text.secondary,
  }));

  // Fetch the Unplanned accounts data from the API
  const fetchUnplannedData = async () => {
    try {
      const response = await ShowAllUnplanned();
      if (response.status === 200) {
        setArData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch unplanned fees data:", error);
    }
  };

  useEffect(() => {
    fetchUnplannedData();
  }, []);

  const handleAdd = async () => {
    try {
      await AddNewUnplanned(formData);
      setOpenAddDialog(false);
      setFormData({ name: '' , amount: null }); // Reset form data after submission
      fetchUnplannedData();
    } catch (error) {
      console.log("There was an error:", error);
    }
  };

  // Updated handleUpdate function
  const handleUpdate = async () => {
    try {
      console.log('Updating Unplanned:', selectedUnplannedId, formDataUpdate);
      await UpdateUnplanned(selectedUnplannedId, formDataUpdate);
      setOpenUpdateDialog(false);
      setFormDataUpdate({ amount: null }); // Reset form data after submission
      setSelectedUnplannedId(null); // Reset selected Unplanned ID
      fetchUnplannedData();
    } catch (error) {
      console.log("There was an error:", error);
    }
  };


  const handleEditClick = async (id) => {
    const response  = await ShowUnplanned(id);
    setSelectedUnplannedId(id);
    console.log(response.data);
    setOpenUpdateDialog(true);
    setFormDataUpdate({amount: response.data.amount});
    
  };
  const Deactive = async (id) => {
    try {
      const response = await ChangeUnplannedStatus(id);
      console.log(response);
      fetchUnplannedData();
    } catch (error) {
      console.log("There was an error:", error);
    }
  }
  // Define the columns for the table
  const columns: MRT_ColumnDef[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Unplanned Title",
    },
    {
      accessorKey: "amount",
      header: "Unplanned Amount",
    },
    {
      accessorKey: "status",
      header: "Unplanned Status",
      Cell: ({ cell }) => {
        const isActive = cell.getValue() === '1'; // Assuming '1' is active and '0' is inactive
        return (
          <Chip
            label={isActive ? 'Active' : 'Inactive'}
            variant="outlined"
            color={isActive ? 'success' : 'default'}
            size="medium"
            sx={{fontSize:'14px'}}
          />
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <>
        
        <Button
          variant="outlined"
          color="secondary"
          sx={{mt:1, width: '100px'}}
          onClick={() => handleEditClick(row.original.id)}
          >
          Edit
        </Button>
        <Button
        sx={{mt:1, width: '100px'}}
        variant="outlined"
        color="error"
        onClick={() => Deactive(row.original.id)}
        >
        Deactivate
      </Button>
          </>
      ),
    },
  ];

  return (
    <Box>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            gridTemplateRows: 'repeat(2, 250px) 1fr',
            gridAutoRows: 'minmax(200px, auto)',
            width: '100%',
            minHeight: '750px',

          }}
        >
          <Item sx={{ gridColumn: 'span 2', gridRow: 'span 4' }}>
          <Box component="div" sx={{ p: 1, px: 2, textAlign: "center", bgcolor: colors.primary[600] }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                        <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }} />
                        <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
                            Unplanned Fees Table
                        </Typography>
                    </Box>
                </Box>

                
            </Box>
            <Box
            sx={{display:"flex",alignItems:"center",justifyContent:"start"}}
            >

          <Button
            variant="outlined"
            color="secondary"
            sx={{ mb: 2 , ml:1 , mt:1}}
            onClick={() => setOpenAddDialog(true)}
            >
            Add Unplanned Fee
          </Button>
            </Box>
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
          </Item>
          <Item sx={{gridColumn:'span 2' , gridRow:'span 1'}}>
          <Box component="div" sx={{ p: 1, px: 2, textAlign: "center", bgcolor: colors.primary[600] }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                        <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }} />
                        <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
                            Unplanned Fees Analytics
                        </Typography>
                    </Box>
                </Box>
            </Box>
          </Item>
          <Item sx={{gridColumn:'span 2' , gridRow:'span 3'}}>
          <Box component="div" sx={{ p: 1, px: 2, textAlign: "center", bgcolor: colors.primary[600] }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                        <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }} />
                        <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
                            Unplanned Fees History
                        </Typography>
                    </Box>
                </Box>

                
            </Box>
            {/* History Table */}
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
          </Item>
        </Box>
      </Grid>

      {/* Add Record Dialog */}
        <AddUnplannedDialog 
        openAddDialog={openAddDialog}
        setOpenAddDialog={setOpenAddDialog}
        formData={formData}
        setFormData={setFormData}
        handleAdd={handleAdd}
        />

      {/* // The Update Record Dialog with corrected onClick handler */}
        <UpdateUnplannedDialog 
        openUpdateDialog={openUpdateDialog}
        setOpenUpdateDialog={setOpenAddDialog}
        formDataUpdate={formDataUpdate}
        setFormDataUpdate={setFormDataUpdate}
        handleUpdate={handleUpdate}
        /> 
    </Box>
  );
};

export default UnplannedPage;
