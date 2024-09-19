import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Typography, Chip, IconButton } from '@mui/material';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import TagIcon from '@mui/icons-material/Tag';
import { MaterialReactTable, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton } from 'material-react-table';
import NewRequestModal from './Requests Components/NewRequestModal';
import { ShowAllRequests ,CreateNewRequest ,UpdateRequest ,ShowSpecificRequest , DeleteRequest } from 'apis/Requests';
import RequestDetailsModal from './Requests Components/RequestDetailModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const requestTypes = ['Sick Leave', 'Annual Vacation', 'Errands', 'Clock In Excuse', 'Clock Out Excuse', 'Absent'];

const Requests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [requestDetailsOpen, setRequestDetailsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newRequest, setNewRequest] = useState({
      date:"",
      request_type: "",
      from_date: "",
      to_date: "",
      from_ci: "",
      to_co: "",
      description: ""
  });


  const fetchAllRequests = async () => {
    try {
      const response = await ShowAllRequests();
      // console.log(response.data);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      console.log('There Was an error fetching requests!');
    }
  }

  useEffect(() => {
    fetchAllRequests();
  }, [])
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // Track Changes
  const handleChange = (e) => {
    console.log(e.target.value);
    setNewRequest({
      ...newRequest,
      [e.target.name]: e.target.value,
    });
  };

  // Showing Request
  const handleRequestDetailsOpen = async (id) => {
    try {
      const response = await ShowSpecificRequest(id);
      if (response.status === 200) {
        setSelectedRequest(response.data);
        setEditMode(true)
        setRequestDetailsOpen(true);
      }
    } catch (error) {
      console.log('Error fetching specific request!', error);
    }
  };

  const handleRequestDetailsClose = () => setRequestDetailsOpen(false);


  // Adding Functionality
  const handleAddRequest = async () => {
    console.log(newRequest)
    try {
      const response = await CreateNewRequest(newRequest);
      console.log(response.data);
    } catch (error) {
      console.log("Error Creating Request!",error);
    }
    fetchAllRequests();
    handleClose();
  };

  // Updating Functionality
  const handleUpdateRequest = async () => {
    try {
      const response = await UpdateRequest(selectedRequest.id, newRequest);
      console.log(response.data);
      fetchAllRequests();
      setEditMode(false);
      handleRequestDetailsClose();
    } catch (error) {
      console.log('Error Updating Request!', error);
    }
  };

  // Deleting Functionality
  const handleDeleteRequest = async (id) => {
    try {
      await DeleteRequest(id);
      fetchAllRequests();
    } catch (error) {
      console.log('Error Deleting Request!', error);
    }
  };


  const columns = useMemo(
    () => [
      {
        accessorKey: 'user.name',
        header: 'Requester',
        size: 200,
      },
      {
        accessorKey: 'request_type',
        header: 'Request Type',
        size: 120,
      },
      {
        accessorKey: 'from_date',
        header: 'From Date',
        size: 120,
        Cell: ({ cell }) => cell.getValue() ? cell.getValue() : "__",
      },
      {
        accessorKey: 'to_date',
        header: 'To Date',
        size: 120,
        Cell: ({ cell }) => cell.getValue() ? cell.getValue() : "__",
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 120,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 120,
        Cell: ({ cell }) => cell.getValue() ? new Date(cell.getValue()).toISOString().slice(11,19) : "__",

      },
      {
        accessorKey: 'from_ci',
        header: 'From Time',
        size: 120,
        Cell: ({ cell }) => cell.getValue() ? cell.getValue() : "__",

      },
      {
        accessorKey: 'to_co',
        header: 'To Time',
        size: 120,
        Cell: ({ cell }) => cell.getValue() ? cell.getValue() : "__",

      },
      {
        accessorKey: 'hr_approve',
        filterVariant: "select",
        filterSelectOptions: ['accepted', 'pending', 'rejected'],
        header: 'Status',
        size: 150,
        Cell: ({ cell }) => {
          const status = cell.getValue();
          const color =
            status === 'accepted'
              ? 'ForestGreen'
              : status === 'pending'
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
      {
        accessorKey: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>

            {/* Edit Button */}
            <IconButton
            color="info"
              onClick={() => handleRequestDetailsOpen(row.original.id)}
              disabled={row.original.hr_approve !== 'pending'}
            >
              <EditIcon />
            </IconButton>
            {/* Delete Button */}
            <IconButton color='error' onClick={() => handleDeleteRequest(row.original.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      }
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
              color: colors.primary[120],
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
      handleAddRequest = {handleAddRequest}
      />

      <RequestDetailsModal
      open = {requestDetailsOpen}
      handleClose = {handleRequestDetailsClose}
      request = {selectedRequest}
      handleChange ={handleChange}
      handleUpdate ={handleUpdateRequest}
      isEditable = {editMode}
      requestTypes = {requestTypes}
      />
      
    </>
  );
};

export default Requests;
