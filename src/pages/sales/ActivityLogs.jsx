import React, { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Stack,
  Typography,
  useTheme,
  Divider,
} from '@mui/material';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tokens } from 'theme';
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json"

// Sample activity log data
const fakeData = [
  {
    id: '1',
    name: 'Mohamed Shaban',
    type: 'Phone Call',
    purpose: 'New Project Order',
    result: 'Got a deal',
    status: 'Answered',
    date: '2024-06-01',
    time: '10:00 AM',
  },
  {
    id: '2',
    name: 'Stakeholder 1',
    type: 'Meeting',
    purpose: 'Project Discussion',
    result: 'Follow-up Required',
    status: 'Attended',
    date: '2024-06-05',
    time: '02:00 PM',
  },
  // Add more sample data as needed
];

// List of stakeholders
const stakeholders = ['Mohamed Shaban', 'Stakeholder 1', 'Stakeholder 2', 'Stakeholder 3'];

const ActivityLog = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [activityType, setActivityType] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [values, setValues] = useState({
    id: '',
    name: '',
    type: '',
    purpose: '',
    result: '',
    status: '',
    date: '',
    time: '',
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        enableEditing: false,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        enableEditing: false,
      },
      {
        accessorKey: 'purpose',
        header: 'Purpose',
        enableEditing: false,
      },
      {
        accessorKey: 'result',
        header: 'Result',
        enableEditing: false,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableEditing: false,
        Cell: ({ cell }) => (
          <Chip label={cell.getValue()} color="secondary" variant="outlined" />
        ),
      },
      {
        accessorKey: 'date',
        header: 'Date',
        enableEditing: false,
      },
      {
        accessorKey: 'time',
        header: 'Time',
        enableEditing: false,
      },
      {
        id: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleOpenDeleteDialog(row.original.id)}
          >
            Delete
          </Button>
        ),
      },
    ],
    [],
  );

  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();

  const handleCreateUser = async () => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    setOpenModal(false);
    setValues({
      id: '',
      name: '',
      type: '',
      purpose: '',
      result: '',
      status: '',
      date: '',
      time: '',
    });
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
    const updatedData = fetchedUsers.filter((user) => user.id !== id);
    queryClient.setQueryData(['users'], updatedData);
    setOpenDeleteDialog(false);
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteId('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (name === 'type') {
      setActivityType(value);
      setStatusOptions(getStatusOptions(value));
    }
  };

  const getStatusOptions = (type) => {
    if (type === 'Phone Call') {
      return ['Answered', 'Call Back', 'Canceled'];
    } else if (type === 'Meeting') {
      return ['Attended', 'Rescheduled', 'No Show'];
    } else {
      return [];
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal',
    enableEditing: false,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiSkeletonProps: {
      animation: 'wave',
    },
    muiLinearProgressProps: {
      color: 'secondary',
    },
    muiCircularProgressProps: {
      color: 'secondary',
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
    muiBottomToolbarProps: ({ table }) => ({
      sx: { backgroundColor: colors.primary[400] },
    }),
    muiTablePaperProps: {
      elevation: 2, //change the mui box shadow
      //customize paper styles
      sx: {
        borderRadius: '20px',
      },
    },
    muiTableContainerProps: { sx: { maxHeight: '600px', backgroundColor: colors.primary[400] } },
    muiTableHeadCellProps: { sx: { backgroundColor: colors.primary[400] } },
    muiTableBodyCellProps: { sx: { backgroundColor: colors.primary[400] } },
    muiTableBodyProps: { sx: { backgroundColor: colors.primary[400] } },
    onCreatingRowCancel: () => setValidationErrors({}),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpenModal(true)}
      >
        Add New Activity
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  useEffect(() => {
    setStatusOptions(getStatusOptions(activityType));
  }, [activityType]);

  return (
    <>
      <MaterialReactTable table={table} />
      <Dialog open={openModal} maxWidth="lg" onClose={() => setOpenModal(false)}>
        <Box
        
        sx={{
          backgroundColor: colors.grey[800],
          borderRadius:'5px',
          width:'500px'
        }}>
        <DialogTitle  variant="h6">
<Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
  <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
          Add New Activity
</Box>
        
        </DialogTitle>
        <Divider />
        <DialogContent  sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' , marginTop:"10px" }}>
          <FormControl fullWidth>
            <InputLabel id="stakeholder-label">Stakeholder Name</InputLabel>
            <Select
              labelId="stakeholder-label"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            >
              {stakeholders.map((stakeholder) => (
                <MenuItem key={stakeholder} value={stakeholder}>
                  {stakeholder}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="activity-type-label">Activity Type</InputLabel>
            <Select
              labelId="activity-type-label"
              name="type"
              value={values.type}
              onChange={handleChange}
              required
            >
              <MenuItem value="Phone Call">Phone Call</MenuItem>
              <MenuItem value="Meeting">Meeting</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={values.status}
              onChange={handleChange}
              required
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="date"
            label="Date"
            type="date"
            value={values.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            name="time"
            label="Time"
            type="time"
            value={values.time}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            name="purpose"
            label="Purpose"
            value={values.purpose}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />
          <TextField
            name="result"
            label="Result"
            value={values.result}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant='outlined' onClick={() => setOpenModal(false)} color="error" >
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="secondary" variant="outlined">
            Save
          </Button>
        </DialogActions>
        </Box>
      </Dialog>

      <Dialog maxWidth="lg"
      
      open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <Box
        sx={{
          width: '500px',
          background:colors.grey[800],
          borderRadius:'5px',
        }}>
        <DialogTitle variant="h6">
<Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
  <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
          Confirm Delete
</Box>
        
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography>Are you sure you want to delete this activity?</Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="error" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(deleteId)}
            color="secondary"
            variant="outlined"
          >
            Delete
          </Button>
        </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
  });
}

function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}

const queryClient = new QueryClient();

const ActivityLogWithProviders = () => (
  <QueryClientProvider client={queryClient}>
    <ActivityLog />
  </QueryClientProvider>
);

export default ActivityLogWithProviders;

// Validation functions
const validateRequired = (value) => {
  return value !== undefined && value !== null && value.trim().length > 0;
};

const validateUser = (user) => {
  return {
    name: !validateRequired(user.name) ? 'Stakeholder Name is Required' : '',
    type: !validateRequired(user.type) ? 'Activity Type is Required' : '',
    purpose: !validateRequired(user.purpose) ? 'Purpose is Required' : '',
    result: !validateRequired(user.result) ? 'Result is Required' : '',
    status: !validateRequired(user.status) ? 'Status is Required' : '',
    date: !validateRequired(user.date) ? 'Date is Required' : '',
    time: !validateRequired(user.time) ? 'Time is Required' : '',
  };
};
