// import React, { useState, useEffect } from 'react';
// import { Box, Button, Grid, useTheme, DialogActions, Divider, TextField, FormControl, Dialog, DialogTitle, DialogContent, Paper, Typography, Chip } from "@mui/material";
// import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
// import { tokens } from "theme";
// import Lottie from 'lottie-react';
// import Document from '../../../assets/lottie/document.json';
// import { AddNewInsurance, ChangeInsuranceStatus, ShowAllInsurances, ShowInsurance, UpdateInsurance } from 'apis/AdministrationApi/OrganiazationalPanel';
// import styled from '@emotion/styled';
// import TagIcon from '@mui/icons-material/Tag';

// const InsurancePanelPage = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [arData, setArData] = useState([]);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
//   const [formData, setFormData] = useState({ name: '' , amount: null });
//   const [selectedInsuranceId, setSelectedInsuranceId] = useState(null);
//   const [formDataUpdate, setFormDataUpdate] = useState({ amount: null });

//   // Item for Grid View
//   const Item = styled(Paper)(({ theme }) => ({
//       backgroundColor: theme.palette.mode === 'dark' ? colors.primary[600] : '#fff',
//       ...theme.typography.body2,
//       padding: theme.spacing(0.5),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//   }));

//   // Fetch the Insurance accounts data from the API
//   const fetchInsurancesData = async () => {
//     try {
//       const response = await ShowAllInsurances();
//       if (response.status === 200) {
//         setArData(response.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch Insurances data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchInsurancesData();
//   }, []);

//   const handleAdd = async () => {
//     try {
//       await AddNewInsurance(formData);
//       setOpenAddDialog(false);
//       setFormData({ name: '' , amount: null }); // Reset form data after submission
//       fetchInsurancesData();
//     } catch (error) {
//       console.log("There was an error:", error);
//     }
//   };

//   // Updated handleUpdate function
//   const handleUpdate = async () => {
//     try {
//       console.log('Updating Insurance:', selectedInsuranceId, formDataUpdate);
//       await UpdateInsurance(selectedInsuranceId, formDataUpdate);
//       setOpenUpdateDialog(false);
//       setFormDataUpdate({ amount: null }); // Reset form data after submission
//       setSelectedInsuranceId(null); // Reset selected Insurance ID
//       fetchInsurancesData();
//     } catch (error) {
//       console.log("There was an error:", error);
//     }
//   };


//   const handleEditClick = async (id) => {
//     const response  = await ShowInsurance(id);
//     setSelectedInsuranceId(id);
//     console.log(response.data);
//     setOpenUpdateDialog(true);
//     setFormDataUpdate({amount: response.data.amount});
    
//   };
//   const Deactive = async (id) => {
//     try {
//       const response = await ChangeInsuranceStatus(id);
//       console.log(response);
//       fetchInsurancesData();
//     } catch (error) {
//       console.log("There was an error:", error);
//     }
//   }
//   // Define the columns for the table
//   const columns: MRT_ColumnDef[] = [
//     {
//       accessorKey: "id",
//       header: "ID",
//     },
//     {
//       accessorKey: "name",
//       header: "Insurance Title",
//     },
//     {
//       accessorKey: "amount",
//       header: "Insurance Amount",
//     },
//     {
//       accessorKey: "status",
//       header: "Insurance Status",
//       Cell: ({ cell }) => {
//         const isActive = cell.getValue() === '1'; // Assuming '1' is active and '0' is inactive
//         return (
//           <Chip
//             label={isActive ? 'Active' : 'Inactive'}
//             variant="outlined"
//             color={isActive ? 'success' : 'default'}
//             size="medium"
//             sx={{fontSize:'14px'}}
//           />
//         );
//       },
//     },
//     {
//       accessorKey: "actions",
//       header: "Actions",
//       Cell: ({ row }) => (
//         <>
        
//         <Button
//           variant="outlined"
//           color="secondary"
//           sx={{mt:1, width: '100px'}}
//           onClick={() => handleEditClick(row.original.id)}
//           >
//           Edit
//         </Button>
//         <Button
//         sx={{mt:1, width: '100px'}}
//         variant="outlined"
//         color="error"
//         onClick={() => Deactive(row.original.id)}
//         >
//         Deactivate
//       </Button>
//           </>
//       ),
//     },
//   ];

//   return (
//     <Box>
//       <Grid item xs={12}>
//         <Box
//           sx={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(4, 1fr)',
//             gap: 2,
//             gridTemplateRows: 'repeat(2, 250px) 1fr',
//             gridAutoRows: 'minmax(200px, auto)',
//             width: '100%',
//             minHeight: '750px',

//           }}
//         >
//           <Item sx={{ gridColumn: 'span 2', gridRow: 'span 4' }}>
//           <Box component="div" sx={{ p: 1, px: 2, textAlign: "center", bgcolor: colors.primary[600] }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
//                         <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }} />
//                         <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
//                             Insurances Table
//                         </Typography>
//                     </Box>
//                 </Box>

                
//             </Box>
//             <Box
//             sx={{display:"flex",alignItems:"center",justifyContent:"start"}}
//             >

//           <Button
//             variant="outlined"
//             color="secondary"
//             sx={{ mb: 2 , ml:1 , mt:1}}
//             onClick={() => setOpenAddDialog(true)}
//             >
//             Add Insurance
//           </Button>
//             </Box>
//           <MaterialReactTable
//             columns={columns}
//             data={arData}
//             muiSkeletonProps={{
//               animation: "wave",
//             }}
//             muiSearchTextFieldProps={{
//               size: "small",
//               variant: "outlined",
//             }}
//             muiPaginationProps={{
//               color: "secondary",
//               rowsPerPageOptions: [10, 20, 30, 40],
//               shape: "rounded",
//               variant: "outlined",
//             }}
//             muiBottomToolbarProps={({ table }) => ({
//               sx: { backgroundColor: colors.primary[400] },
//             })}
//             muiTablePaperProps={{
//               elevation: 2,
//               sx: {
//                 borderRadius: "20px",
//               },
//             }}
//             muiTableContainerProps={{
//               sx: {
//                 backgroundColor: colors.primary[400],
//               },
//             }}
//             muiTableHeadCellProps={{
//               sx: {
//                 backgroundColor: colors.primary[400],
//               },
//             }}
//             muiTableBodyCellProps={{
//               sx: {
//                 backgroundColor: colors.primary[400],
//               },
//             }}
//             muiTableBodyProps={{
//               sx: {
//                 backgroundColor: colors.primary[400],
//               },
//             }}
//           />
//           </Item>
//           <Item sx={{gridColumn:'span 2' , gridRow:'span 1'}}>
//           <Box component="div" sx={{ p: 1, px: 2, textAlign: "center", bgcolor: colors.primary[600] }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
//                         <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }} />
//                         <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
//                             Insurances Analytics
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Box>
//           </Item>
//           <Item sx={{gridColumn:'span 2' , gridRow:'span 3'}}>
//           <Box component="div" sx={{ p: 1, px: 2, textAlign: "center", bgcolor: colors.primary[600] }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
//                         <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }} />
//                         <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
//                             Insurances History
//                         </Typography>
//                     </Box>
//                 </Box>

                
//             </Box>
//             {/* History Table */}
//             <MaterialReactTable
//             columns={columns}
//             data={arData}
//             muiSkeletonProps={{
//               animation: "wave",
//             }}
//             muiSearchTextFieldProps={{
//               size: "small",
//               variant: "outlined",
//             }}
//             muiPaginationProps={{
//               color: "secondary",
//               rowsPerPageOptions: [10, 20, 30, 40],
//               shape: "rounded",
//               variant: "outlined",
//             }}
//             muiBottomToolbarProps={({ table }) => ({
//               sx: { backgroundColor: colors.primary[400] },
//             })}
//             muiTablePaperProps={{
//               elevation: 2,
//               sx: {
//                 borderRadius: "20px",
//               },
//             }}
//             muiTableContainerProps={{
//               sx: {
//                 backgroundColor: colors.primary[400],
//               },
//             }}
//             muiTableHeadCellProps={{
//               sx: {
//                 backgroundColor: colors.primary[400],
//               },
//             }}
//             muiTableBodyCellProps={{
//               sx: {
//                 backgroundColor: colors.primary[400],
//               },
//             }}
//             muiTableBodyProps={{
//               sx: {
//                 backgroundColor: colors.primary[400],
//               },
//             }}
//           />
//           </Item>
//         </Box>
//       </Grid>

//       {/* Add Record Dialog */}
//       <Dialog fullWidth='lg' open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
//         <DialogTitle>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignItems: 'center',
//               gap: '10px',
//               textTransform: 'uppercase',
//             }}
//           >
//             <Lottie
//               style={{ width: '30px', display: 'flex' }}
//               animationData={Document}
//             />
//             Add A New Insurance Account
//           </Box>
//         </DialogTitle>
//         <Divider />
//         <DialogContent>
//           <FormControl fullWidth margin="normal">
//             <TextField
//               label="Insurance Title"
//               name='name'
//               fullWidth
//               margin="dense"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//           </FormControl>
//           <FormControl fullWidth margin="normal">
//             <TextField
//               label="Insurance Amount"
//               name='amount'
//               fullWidth
//               type='number'
//               margin="dense"
//               value={formData.amount}
//               onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//             />
//           </FormControl>
//         </DialogContent>
//         <Divider />
//         <DialogActions>
//           <Button
//             variant="outlined"
//             color="error"
//             onClick={() => setOpenAddDialog(false)}
//           >
//             Cancel
//           </Button>
//           <Button variant="outlined" color="secondary" onClick={handleAdd}>
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* // The Update Record Dialog with corrected onClick handler */}
// <Dialog fullWidth='lg' open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
//   <DialogTitle>
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: '10px',
//         textTransform: 'uppercase',
//       }}
//     >
//       <Lottie
//         style={{ width: '30px', display: 'flex' }}
//         animationData={Document}
//       />
//       Update Insurance Account
//     </Box>
//   </DialogTitle>
//   <Divider />
//   <DialogContent>
//     <FormControl fullWidth margin="normal">
//       <TextField
//         label="Insurance Amount"
//         name='amount'
//         type='number'
//         fullWidth
//         margin="dense"
//         value={formDataUpdate.amount}
//         onChange={(e) => setFormDataUpdate({ ...formDataUpdate, amount: e.target.value })}
//       />
//     </FormControl>
//   </DialogContent>
//   <Divider />
//   <DialogActions>
//     <Button
//       variant="outlined"
//       color="error"
//       onClick={() => setOpenUpdateDialog(false)}
//     >
//       Cancel
//     </Button>
//     <Button variant="outlined" color="secondary" onClick={handleUpdate}>
//       Update
//     </Button>
//   </DialogActions>
// </Dialog>
//     </Box>
//   );
// };

// export default InsurancePanelPage;
import React from 'react'

const InsurancePanelPage = () => {
  return (
    <div>InsurancePanelPage</div>
  )
}

export default InsurancePanelPage