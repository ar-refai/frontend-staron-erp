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
import RecruitNewModal from './Recruitment Components/RecruitNewModal';
import RecruitDescriptionModal from './Recruitment Components/RecruitDescriptionModal';

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
                                   variant = 'outlined'
                                   
                                   label={status}
                                   sx={{
                                        borderColor: color,
                                        color:color,
                                        textAlign: 'center',
                                        width: '80px',
                                        fontSize: '13px',
                                        fontWeight: 'semiBold',
                                        letterSpacing: "0.5px",
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

              {/* sadasdasdas */}
               <RecruitNewModal 
                    open = {open}
                    handleClose = {handleClose}
                    newRequest  = {newRequest}
                    handleChange  = {handleChange} 
                    handleDateChange = {handleDateChange}
                    handleAddRequest = {handleAddRequest}
                    roles = {roles}
               />

               <RecruitDescriptionModal 
                    descriptionOpen = {descriptionOpen} 
                    handleDescriptionClose = {handleDescriptionClose}
                    selectedDescription = {selectedDescription} 
               />
          </>
     );
};

export default RecruitmentRequests;
