import React, { useMemo, useState } from 'react';
import { Box, Button, Typography, Modal, TextField, MenuItem, Select, FormControl, InputLabel, Chip } from '@mui/material';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import TagIcon from '@mui/icons-material/Tag';

import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';

// Import makeData function
import { makeData } from './makeData';

// Generate mock data
const initialData = makeData();

// Mock employees list
const employees = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  // Add more employees as needed
];

const Requests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    name: '',
    description: '',
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
      name: '',
      description: '',
      date: '',
      requesterName: '',
      status: 'Pending',
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Request Name',
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
            label={status}
            sx={{
                backgroundColor: color,
                textAlign: 'center',
                width: '80px',
                fontSize: '13px',
                fontWeight: 'semiBold',
                letterSpacing:"0.5px",
                color: colors.grey[900] 
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
    enableStickyFooter: true,
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
        muiTableBodyProps: {sx: { backgroundColor: colors.primary[400] } },
        muiBottomToolbarProps: ({table}) => ({
            sx: { backgroundColor: colors.primary[400]}
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
          variant="contained" 
          sx={{
            backgroundColor: colors.primary[600],
            "&:hover": {
              backgroundColor: colors.primary[700],
            },
          }} 
          onClick={handleOpen}
        >
          Add Request
        </Button>
      </Box>
    ),
  };

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

      <Modal 
        open={open} 
        onClose={handleClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            bgcolor: colors.primary[700],
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Typography variant="h6" component="h2">
            Add New Request
          </Typography>
          <TextField
            label="Request Name"
            name="name"
            value={newRequest.name}
            onChange={handleChange}
            fullWidth
            color='secondary'
          />
          <TextField
            label="Request Description"
            name="description"
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={newRequest.description}
            onChange={handleChange}
            fullWidth
            color='secondary'
          />
          <FormControl fullWidth>
            <InputLabel>Requester Name</InputLabel>
            <Select
              name="requesterName"
              value={newRequest.requesterName}
              onChange={handleChange}
              color="secondary"
              sx={{
                "& .MuiInputLabel-root.Mui-focused": {
                    color: 'secondary'
                },
                "& .MuiOutlinedInput-root": {
                    "&:hover > fieldset": {
                        borderColor: 'secondary'
                    },
                },
                "& .MuiSvgIcon-root": {
                    color: 'secondary'
                },
                "& .MuiFilledInput-root:before": {
                    borderBottomColor:'secondary' ,
                },
                "& .MuiFilledInput-root:after": {
                    borderBottomColor: 'secondary'
                },
                "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                    borderBottomColor: 'secondary'
                },
            }}
            >
              {employees.map((employee) => (
                <MenuItem key={employee.name} value={employee.name}>
                  {employee.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{
              paddingBlock: '10px',
              "&:hover": {
                background: colors.primary[600]
              }
            }} 
            onClick={handleAddRequest}
          >
            Issue New Request
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Requests;
