import React, { useMemo, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, MenuItem, Select, FormControl, InputLabel, Chip, Divider } from '@mui/material';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import TagIcon from '@mui/icons-material/Tag';
import { MaterialReactTable, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton } from 'material-react-table';
import { makeData } from './makeData';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json"
import NewRequestModal from './Requests Components/NewRequestModal';

// Generate mock data
const initialData = makeData();

// Mock employees list
const employees = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  // Add more employees as needed
];

const requestTypes = ['Sick Leave', 'Annual Vacation', 'Errands', 'Clock In Excuse', 'Clock Out Excuse'];

const Requests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    requestType: '',
    description: '',
    from: '',
    to: '',
    date: '',
    requesterName: '',
    status: 'Pending',
  });
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewRequest({
      ...newRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRequest = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
    const requestToAdd = {
      ...newRequest,
      date: newRequest.date || currentDate,
      status: 'Pending',
    };

    // Add the new request to the data
    setData((prevData) => [...prevData, requestToAdd]);
    setOpen(false);
    // Reset the form
    setNewRequest({
      requestType: '',
      description: '',
      from: '',
      to: '',
      date: '',
      requesterName: '',
      status: 'Pending',
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'requestType',
        header: 'Request Type',
        size: 250,
      },
      {
        accessorKey: 'description',
        header: 'Request Description',
        size: 300,
      },
      {
        accessorKey: 'date',
        header: 'Date of Request',
        size: 200,
        Cell: ({ cell }) => new Date(cell.getValue()).toISOString().slice(0,10),
      },
      {
        accessorKey: 'requesterName',
        header: 'Requester',
        size: 250,
      },
      {
        accessorKey: 'status',
        filterVariant: "select",
        filterSelectOptions: ['Accepted', 'Pending', 'Rejected'],
        header: 'Status',
        size: 150,
        Cell: ({ cell }) => {
          const status = cell.getValue();
          const color =
            status === 'Accepted'
              ? 'ForestGreen'
              : status === 'Pending'
              ? "DarkGoldenRod"
              : colors.redAccent[500];
          return (
            <Chip
              variant='outlined'

              label={status}
              sx={{
                borderColor:color,
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

  const tableProps = {
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: 'popover',
    muiSkeletonProps: {
      animation: 'wave',
    },
    muiLinearProgressProps: {
      color: 'secondary',
    },
    muiCircularProgressProps: {
      color: 'secondary',
    },
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
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

    renderTopToolbar: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '0.5rem',
          p: '16px 10px',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <MRT_GlobalFilterTextField table={table} />
          <MRT_ToggleFiltersButton table={table} />
        </Box>
        <Button
          variant="outlined"
          color='secondary'
          
          onClick={handleOpen}
        >
          Add Request
        </Button>
      </Box>
    ),
  };





  const user = JSON.parse(localStorage.getItem('staron_user'));
  const navigate = useNavigate();
  // If the user is not authenticated or authorized, redirect to the login page
  // if (!(user.department === 'admin')) 
  //     return navigate('/');

  
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
            Requests Table
          </Typography>
        </Box>
      </Box>
      <Box sx={{ padding: '20px' }}>
        <MaterialReactTable {...tableProps} />
      </Box>

      <NewRequestModal 
      open = {open}
      handleClose = {handleClose}
      newRequest = {newRequest}
      handleChange = {handleChange}
      requestTypes = {requestTypes}
      employees = {employees}
      handleAddRequest = {handleAddRequest}
      />
      
    </>
  );
};

export default Requests;
