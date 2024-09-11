import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, useTheme, Paper, Typography, Chip } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { tokens } from "theme";
import { AddNewUtilities, ChangeUtilitiesStatus, ShowAllUtilities, ShowUtilities, UpdateUtilities } from 'apis/AdministrationApi/OrganiazationalPanel';
import styled from '@emotion/styled';
import TagIcon from '@mui/icons-material/Tag';
import AddUtilitiesDialog from './UtilitiesComponents/AddUtilities';
import UpdateUtilitiesDialog from './UtilitiesComponents/UpdateUtilities';

const UtilitiesPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [arData, setArData] = useState([]);
  const [currentData , setCurrentData] = useState([])
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [formData, setFormData] = useState({factories_id:null ,  name: '' , amount: null });
  const [selectedUtilitiesId, setSelectedUtilitiesId] = useState(null);
  const [formDataUpdate, setFormDataUpdate] = useState({factories_id:null ,  name: '', amount: null });

  // Item for Grid View
  const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(0.5),
      textAlign: 'center',
      color: theme.palette.text.secondary,
  }));

  // Fetch the Utilities accounts data from the API
  const fetchUtilitiesData = async () => {
    try {
      const response = await ShowAllUtilities();
      if (response.status === 200) {
        setArData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch Utilities data:", error);
    }
  };
  
  useEffect(() => {
    fetchUtilitiesData();
  }, []);
  
  useEffect(() => {
    setCurrentData(arData.filter((item) => item.status === 'pending'));
  },[arData]);

  const handleAdd = async () => {
    try {
      await AddNewUtilities(formData);
      setOpenAddDialog(false);
      setFormData({ factories_id:null ,  name: '', amount: null }); // Reset form data after submission
      fetchUtilitiesData();
    } catch (error) {
      console.log("There was an error:", error);
    }
  };

  // Updated handleUpdate function some times i need to scream out 
  const handleUpdate = async () => {
    try {
      console.log('Updating Utilities:', selectedUtilitiesId, formDataUpdate);
      await UpdateUtilities(selectedUtilitiesId, formDataUpdate);
      setOpenUpdateDialog(false);
      setFormDataUpdate({factories_id:null ,  name: '', amount: null }); // Reset form data after submission
      setSelectedUtilitiesId(null); // Reset selected Utilities ID
      fetchUtilitiesData();
    } catch (error) {
      console.log("There was an error:", error);
    }
  };


  const handleEditClick = async (id) => {
    const response  = await ShowUtilities(id);
    setSelectedUtilitiesId(id);
    // console.log(response.data[0].factories_id);
    setOpenUpdateDialog(true);
    setFormDataUpdate({factories_id:response.data[0].factories_id ,name: response.data[0].name, amount: response.data[0].amount});    
  };
  const Deactive = async (id) => {
    try {
      const response = await ChangeUtilitiesStatus(id);
      console.log(response);
      fetchUtilitiesData();
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
      header: "Utilities Title",
    },
    {
      accessorKey: "amount",
      header: "Utilities Amount",
    },
    {
      accessorKey: "budget",
      header: "Budget",
    },
    {
      accessorKey: "actuals",
      header: "Actuals",
    },
    {
      accessorKey: "status",
      header: "Utilities Status",
      Cell: ({ cell }) => {
        const status = cell.getValue(); // Assuming '1' is active and '0' is inactive
        return (
          <Chip
            label={cell.getValue()}
            variant="outlined"
            color={status === 'paid' ? 'success' : status === 'pending' ? 'warning' : status === 'delayed' ? 
              'info' : 'error' }
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
              <Button
                sx={{ mt: 1, width: '100px' }}
                variant="outlined"
                color="error"
                onClick={() => Deactive(row.original.id)}
              >
                Delete
              </Button>
              
          }
          </>
      ),
    },
  ];
  const historyColumns: MRT_ColumnDef[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Utilities Title",
    },
    {
      accessorKey: "amount",
      header: "Utilities Amount",
    },
    {
      accessorKey: "status",
      header: "Utilities Status",
      Cell: ({ cell }) => {
        const status = cell.getValue(); // Assuming '1' is active and '0' is inactive
        return (
          <Chip
            label={cell.getValue()}
            variant="outlined"
            color={status === 'paid' ? 'success' : status === 'pending' ? 'warning' : status === 'delayed' ? 
              'info' : 'error' }
            size="medium"
            sx={{fontSize:'14px'}}
          />
        );
      },
    },
   
  ];
  return (
    <Box>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr', // Single column for mobile
              sm: 'repeat(2, 1fr)', // Two columns for small screens
              md: 'repeat(4, 1fr)', // Four columns for medium screens
            },
            gap: 2,
            gridTemplateRows: {
              xs: 'auto', // Adjust rows automatically for smaller screens
              sm: 'repeat(2, 250px)',
              md: 'repeat(2, 250px) 1fr',
            },
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
                        <Typography variant='h5' sx={{ 
                          textTransform: "uppercase", 
                          color: colors.grey[100], 
                          fontSize: {
                              xs: '16px', // Smaller font size for mobile
                              sm: '18px', 
                              md: '20px', 
                              lg: '22px',
                            }  }}>
                            Utilities Table
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
            Add Utilities
          </Button>
        
            </Box>
          <MaterialReactTable
            columns={columns}
            data={currentData}
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
                // borderRadius: "20px",
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
                            Utilities Analytics
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
                            Utilities History
                        </Typography>
                    </Box>
                </Box>

                
            </Box>
            {/* History Table */}
            <MaterialReactTable
            columns={historyColumns}
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
                // borderRadius: "20px",
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
      <AddUtilitiesDialog 
      openAddDialog = {openAddDialog}
      setOpenAddDialog = {setOpenAddDialog}
      formData = {formData}
      setFormData = {setFormData}
      handleAdd = {handleAdd}
      />
        
      {/* Update Record Dialog */}
      <UpdateUtilitiesDialog 
      openUpdateDialog={openUpdateDialog}
      setOpenUpdateDialog = {setOpenUpdateDialog}
      formDataUpdate = {formDataUpdate}
      setFormDataUpdate = {setFormDataUpdate}
      handleUpdate = {handleUpdate}
      />

    </Box>
  );
};

export default UtilitiesPage;
