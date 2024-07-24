import * as React from 'react';
import { useMemo, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, MenuItem, Select, FormControl, InputLabel, Chip, Divider } from '@mui/material';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import TagIcon from '@mui/icons-material/Tag';
import { MaterialReactTable, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, useMaterialReactTable } from 'material-react-table';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json"

// Generate mock data
const makeRecruitmentData = () => [
     {
          id: 1,
          role: 'Software Engineer',
          description: 'Develop and maintain software applications.',
          requesterName: 'John Doe',
          date: new Date().toISOString(),
          status: 'Pending',
          requesterImage: 'https://via.placeholder.com/30',
     },
     {
          id: 2,
          role: 'Product Manager',
          description: 'Oversee product development lifecycle.',
          requesterName: 'Jane Smith',
          date: new Date().toISOString(),
          status: 'Accepted',
          requesterImage: 'https://via.placeholder.com/30',
     },
     // Add more mock data here
];

const roles = [
     'Software Engineer',
     'Product Manager',
     'Designer',
     'Marketing Specialist',
     // Add more roles as needed
];

const employees = [
     { name: 'Alice' },
     { name: 'Bob' },
     { name: 'Charlie' },
     // Add more employees as needed
];

const RecruitmentRequests = () => {
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);

     const [data, setData] = useState(makeRecruitmentData());
     const [open, setOpen] = useState(false);
     const [descriptionOpen, setDescriptionOpen] = useState(false);
     const [selectedDescription, setSelectedDescription] = useState('');
     const [newRequest, setNewRequest] = useState({
          role: '',
          description: '',
          requesterName: 'Admin', // Assuming Admin is creating the request
          date: dayjs(),
          status: 'Pending',
          requesterImage: 'https://via.placeholder.com/30'
     });

     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
     const handleDescriptionOpen = (description) => {
          setSelectedDescription(description);
          setDescriptionOpen(true);
     };
     const handleDescriptionClose = () => setDescriptionOpen(false);

     const handleChange = (e) => {
          setNewRequest({
               ...newRequest,
               [e.target.name]: e.target.value,
          });
     };

     const handleDateChange = (newDate) => {
          setNewRequest({
               ...newRequest,
               date: newDate,
          });
     };

     const handleAddRequest = () => {
          const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
          const randomRequester = employees[Math.floor(Math.random() * employees.length)].name;
          const requestToAdd = {
               ...newRequest,
               date: newRequest.date.format('YYYY-MM-DD') || currentDate,
               status: 'Pending',
               requesterName: randomRequester,
          };
          setData([...data, requestToAdd]);
          setOpen(false);
          setNewRequest({
               role: '',
               description: '',
               requesterName: 'Admin',
               date: dayjs(),
               status: 'Pending',
               requesterImage: 'https://via.placeholder.com/30'
          });
     };

     const columns = useMemo(
          () => [
               {
                    accessorKey: 'role',
                    header: 'Role',
                    size: 200,
               },
               {
                    accessorKey: 'description',
                    header: 'Description',
                    size: 300,
                    Cell: ({ cell }) => (
                         <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleDescriptionOpen(cell.getValue())}
                         >
                              View Description
                         </Button>
                    ),
               },
               {
                    accessorKey: 'date',
                    header: 'Date of Request',
                    size: 200,
                    Cell: ({ cell }) => new Date(cell.getValue()).toISOString().slice(0, 10),
               },
               {
                    accessorFn: (row) => `${row.requesterName}`,
                    id: 'requester',
                    header: 'Requester',
                    size: 250,
                    Cell: ({ renderedCellValue, row }) => (
                         <Box
                              sx={{
                                   display: 'flex',
                                   alignItems: 'center',
                                   gap: '1rem',
                              }}
                         >
                              <img
                                   alt="requester"
                                   height={30}
                                   src={row.original.requesterImage}
                                   loading="lazy"
                                   style={{ borderRadius: '50%' }}
                              />
                              <span>{renderedCellValue}</span>
                         </Box>
                    ),
               },
               {
                    accessorKey: 'status',
                    header: 'Status',
                    size: 150,
                    Cell: ({ cell }) => {
                         const status = cell.getValue();
                         const color =
                              status === 'Accepted'
                                   ? 'green'
                                   : status === 'Pending'
                                        ? 'orange'
                                        : 'red';
                         return (
                              <Chip
                                   label={status}
                                   sx={{
                                        backgroundColor: color,
                                        textAlign: 'center',
                                        width: '80px',
                                        fontSize: '13px',
                                        fontWeight: 'semiBold',
                                        letterSpacing: "0.5px",
                                        color: colors.grey[100]
                                   }}
                              />
                         );
                    },
               },
          ],
          [],
     );
 
     const table = useMaterialReactTable({
          columns,
          data, // data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
          enableColumnFilterModes: true,
          enableColumnOrdering: true,
          enableGrouping: true,
          enableColumnPinning: true,
          enableFacetedValues: true,
          initialState: {
               showColumnFilters: true,
               showGlobalFilter: true,
               columnPinning: {
                    left: [],
               },
          },
          paginationDisplayMode: "pages",
          positionToolbarAlertBanner: "bottom",
          muiSearchTextFieldProps: {
               size: 'small',
               variant: 'outlined',
          },
          muiTablePaperProps: {
               elevation: 2, //change the mui box shadow
               //customize paper styles
               sx: {
                    borderRadius: '20px',
               }
          },
          muiTableContainerProps: { sx: { maxHeight: '600px', backgroundColor: colors.primary[400] } },
          muiTableHeadCellProps: { sx: { backgroundColor: colors.primary[400] } },
          muiTableBodyCellProps: { sx: { backgroundColor: colors.primary[400] } },
          muiTableBodyProps: { sx: { backgroundColor: colors.primary[400] } },
          muiBottomToolbarProps: ({ table }) => ({
               sx: { backgroundColor: colors.primary[400] }
          }),
          muiPaginationProps: {
               color: 'secondary',
               rowsPerPageOptions: [10, 20, 30],
               shape: 'rounded',
               variant: 'outlined',
          },
          muiTableBodyRowProps: ({ row }) => ({
               //conditionally style selected rows
               sx: {
                    backgroundColor: colors.primary[400]
               },
          }),
          renderTopToolbar: ({ table }) => (
               <Box
                    sx={{
                         display: 'flex',
                         gap: '0.5rem',
                         p: '16px 8px',
                         justifyContent: 'space-between',
                    }}
               >
                    <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                         <MRT_GlobalFilterTextField table={table} />
                         <MRT_ToggleFiltersButton table={table} />
                    </Box>
                    <Button
                         variant="outlined"
                         color="secondary"
                         onClick={handleOpen}
                    >
                         Add Request
                    </Button>
               </Box>
          ),
     });
     
     const user = JSON.parse(localStorage.getItem('staron_user'));
     const navigate = useNavigate();
     // If the user is not authenticated or authorized, redirect to the login page
     

     return (
          <>
               <Box
                    sx={{
                         backgroundColor: colors.primary[400],
                         padding: '12px 40px',
                         margin: '20px ',
                         borderRadius: '10px',
                    }}
               >
                    <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                         <TagIcon sx={{ color: colors.redAccent[500], fontSize: '40px' }} />
                         <Typography
                              variant="h2"
                              sx={{
                                   color: colors.primary[200],
                                   marginLeft: '10px',
                                   padding: '10px 12px',
                              }}
                         >
                              Recruitment Requests
                         </Typography>
                    </Box>
               </Box>
               <Box sx={{ padding: '20px' }}>
                    <MaterialReactTable table={table} />
               </Box>

               <Modal open={open} onClose={handleClose}>
                    <Box
                         sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: 900,
                              background: colors.grey[800],
                              border: `1px solid ${colors.greenAccent[500]}`,
                              boxShadow: 24,
                              p: 4,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1rem',
                              borderRadius: '10px'
                         }}
                    >
                         <Typography variant="h6" component="h2">
                        
                              <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
                              <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
                              Add New Recruitment Request
                              </Box>
                         </Typography>
                         <Divider />

                         <FormControl fullWidth variant="filled">
                              <InputLabel>Role</InputLabel>
                              <Select
                                   name="role"
                                   value={newRequest.role}
                                   onChange={handleChange}
                                   label="Role"
                                   style={{ color: colors.primary[200] }}
                              >
                                   {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                             {role}
                                        </MenuItem>
                                   ))}
                              </Select>
                         </FormControl>
                         <TextField
                              label="Description"
                              name="description"
                              value={newRequest.description}
                              onChange={handleChange}
                              fullWidth
                              multiline
                              variant="filled"
                              rows={4}
                              InputLabelProps={{ style: { color: colors.primary[200] } }}
                              InputProps={{
                                   style: { color: colors.primary[200] },
                              }}
                         />
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                   label="Start Date"
                                   value={newRequest.date}
                                   slotProps={{
                                        openPickerIcon: { fontSize: 'large' },
                                        openPickerButton: { color: 'secondary' },
                                        textField: {
                                        variant: 'filled',
                                        focused: true,
                                        color: 'secondary',
                                   },
                                   }}
                         
                                   onChange={handleDateChange}
                                   renderInput={(params) => <TextField {...params} fullWidth />}
                              />
                         </LocalizationProvider>
                         <Divider />
                         <Button variant="outlined" color="secondary" onClick={handleAddRequest}>
                              Add
                         </Button>
                    </Box>
               </Modal>

               <Modal open={descriptionOpen} onClose={handleDescriptionClose}>
                    <Box
                         sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: 900,
                              background: colors.grey[900],
                              color: colors.grey[100],
                              border: `1px solid ${colors.greenAccent[400]}`,
                              boxShadow: 24,
                              p: 4,
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '1rem',
                              borderRadius: '10px'
                         }}
                    >
                         <Typography variant="h6" sx={{
                              textTransform: "uppercase",
                              fontWeight: 'bold',
                         }} component="h2">

                         <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
                         <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
                              Request Description
                         </Box>
                         </Typography>
                         <Divider />
                         <Typography
                              sx={{
                                   padding: '10px',
                                   borderRadius: '10px'
                              }}
                         >{selectedDescription}</Typography>
                         <Divider />
                         <Button
                              variant="outlined"
                              color="secondary"
                              onClick={handleDescriptionClose}
                         >
                              Close
                         </Button>
                    </Box>
               </Modal>
          </>
     );
};

export default RecruitmentRequests;
