import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, useTheme, Paper, Typography, Chip } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { tokens } from "theme";
import { AddNewRent, ChangeRentStatus, ShowAllRents, ShowRent, UpdateRent } from 'apis/AdministrationApi/OrganiazationalPanel';
import styled from '@emotion/styled';
import TagIcon from '@mui/icons-material/Tag';
import AddRentDialog from './RentsComponents/AddRentDialog';
import UpdateRentDialog from './RentsComponents/UpdateRentDialog';
import ViewAllRentsDialog from './RentsComponents/ViewAllRenstDialog';

const RentsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [arData, setArData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '' , amount: null });
  const [selectedRentId, setSelectedRentId] = useState(null);
  const [formDataUpdate, setFormDataUpdate] = useState({ amount: null });
  const [openViewDialog, setOpenViewDialog] = useState(false);  // New state for View All dialog

  // Item for Grid View
  const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(0.5),
      textAlign: 'center',
      color: theme.palette.text.secondary,
  }));

  // Fetch the Rent accounts data from the API
  const fetchRentsData = async () => {
    try {
      const response = await ShowAllRents();
      if (response.status === 200) {
        setArData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch rents data:", error);
    }
  };

  useEffect(() => {
    fetchRentsData();
  }, []);

  const handleAdd = async () => {
    try {
      await AddNewRent(formData);
      setOpenAddDialog(false);
      setFormData({ name: '' , amount: null }); // Reset form data after submission
      fetchRentsData();
    } catch (error) {
      console.log("There was an error:", error);
    }
  };

  // Updated handleUpdate function some times i need to scream out 
  const handleUpdate = async () => {
    try {
      console.log('Updating Rent:', selectedRentId, formDataUpdate);
      await UpdateRent(selectedRentId, formDataUpdate);
      setOpenUpdateDialog(false);
      setFormDataUpdate({ amount: null }); // Reset form data after submission
      setSelectedRentId(null); // Reset selected Rent ID
      fetchRentsData();
    } catch (error) {
      console.log("There was an error:", error);
    }
  };


  const handleEditClick = async (id) => {
    const response  = await ShowRent(id);
    setSelectedRentId(id);
    console.log(response.data);
    setOpenUpdateDialog(true);
    setFormDataUpdate({amount: response.data.amount});
    
  };
  const Deactive = async (id) => {
    try {
      const response = await ChangeRentStatus(id);
      console.log(response);
      fetchRentsData();
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
      header: "Rent Title",
    },
    {
      accessorKey: "amount",
      header: "Rent Amount",
    },
    {
      accessorKey: "status",
      header: "Rent Status",
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
        {
            row.original.status == '1' ?
              <Button
                sx={{ mt: 1, width: '100px' }}
                variant="outlined"
                color="error"
                onClick={() => Deactive(row.original.id)}
              >
                Deactivate
              </Button>
              :
              <Button
                sx={{ mt: 1, width: '100px' }}
                variant="outlined"
                color="secondary"
                onClick={() => Deactive(row.original.id)}
              >
                Activate
              </Button>
          }
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
                            Rents Table
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
            Add Rent
          </Button>
          <Button
          variant="outlined"
          color="secondary"
          sx={{ mb: 2, ml: 1, mt: 1 }}
          onClick={() => setOpenViewDialog(true)}  // Open View All dialog
        >
          View All Rents
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
                            Rents Analytics
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
                            Rents History
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
      <AddRentDialog 
      openAddDialog = {openAddDialog}
      setOpenAddDialog = {setOpenAddDialog}
      formData = {formData}
      setFormData = {setFormData}
      handleAdd = {handleAdd}
      />
        
      {/* Update Record Dialog */}
      <UpdateRentDialog 
      openUpdateDialog={openUpdateDialog}
      setOpenUpdateDialog = {setOpenUpdateDialog}
      formDataUpdate = {formDataUpdate}
      setFormDataUpdate = {setFormDataUpdate}
      handleUpdate = {handleUpdate}
      />


<ViewAllRentsDialog
        openViewDialog={openViewDialog}  // Include the new dialog
        setOpenViewDialog={setOpenViewDialog}
        arData={arData}
        handleEditClick={handleEditClick}
      />
    </Box>
  );
};

export default RentsPage;
