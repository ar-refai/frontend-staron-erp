import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, useTheme, Paper, Typography, Chip } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { tokens } from "theme";
import { AddNewRent, ChangeRentStatus, ShowAllRents, ShowRent, UpdateRent } from 'apis/AdministrationApi/OrganiazationalPanel';
import styled from '@emotion/styled';
import TagIcon from '@mui/icons-material/Tag';
import AddRentDialog from './RentsComponents/AddRentDialog';
import UpdateRentDialog from './RentsComponents/UpdateRentDialog';

const RentsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [arData, setArData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [formData, setFormData] = useState({factories_id:null , name: '' ,amount: null });
  const [selectedRentId, setSelectedRentId] = useState(null);
  const [formDataUpdate, setFormDataUpdate] = useState({ factories_id:null , name:"" ,amount: null });

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


  useEffect(()=> {
    setCurrentData(arData.filter((item) => item.status === 'pending' ))
  },[arData]);


  const handleAdd = async () => {
    try {
      await AddNewRent(formData);
      setOpenAddDialog(false);
      setFormData({factories_id:null , name: '' , amount: null }); // Reset form data after submission
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
      setFormDataUpdate({factories_id:null , name:'' , amount: null }); // Reset form data after submission
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
    setFormDataUpdate({factories_id:response.data.factories_id , name: response.data.name, amount: response.data.amount});
    
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
      accessorKey: "budget",
      header: "Budget",
    },
    {
      accessorKey: "actuals",
      header: "Actuals",
    },
    {
      accessorKey: "status",
      header: "Rent Status",
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
  // Define the columns for the table
  const historyColumns: MRT_ColumnDef[] = [
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
          <Item sx={{gridColumn: 'span 2', gridRow: 'span 4' }} >
          <Box component="div" sx={{ p: 1, px: 2, textAlign: "center", bgcolor: colors.primary[600] }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                    <TagIcon sx={{ 
  color: colors.redAccent[500], 
  fontSize: {
    xs: '25px', 
    sm: '30px', 
    md: '35px',
  } 
}} />                        <Typography variant='h5' sx={{ 
                            textTransform: "uppercase", 
                            color: colors.grey[100],
                            fontSize: {
                              xs: '16px', // Smaller font size for mobile
                              sm: '18px', 
                              md: '20px', 
                              lg: '22px',
                            }
                           }}>
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
  sx={{
    mb: 2,
    ml: 1,
    mt: 1,
    width: {
      xs: '80px', 
      sm: '100px', 
      md: '120px',
    },
    fontSize: {
      xs: '10px', 
      sm: '12px',
      md: '14px',
    }
  }}
  onClick={() => setOpenAddDialog(true)}
>
  Add Rent
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
                overflowX: 'auto', // Add horizontal scrolling for smaller screens
                maxHeight: { 
                  xs: '300px', 
                  sm: '500px',
                },
              },
            }}
            muiTableBodyCellProps={{
              sx: {
                padding: {
                  xs: '8px', 
                  sm: '12px', 
                  md: '16px',
                },
              },
            }}
            muiTableHeadCellProps={{
              sx: {
                padding: {
                  xs: '8px', 
                  sm: '12px', 
                  md: '16px',
                },
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


    </Box>
  );
};

export default RentsPage;
