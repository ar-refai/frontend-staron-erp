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
  Typography,
  Divider,
  useTheme,
  IconButton,
} from '@mui/material';
import Lottie from 'lottie-react';
import Document from '../../assets/lottie/document.json';
import { ShowAllMeetinglog, DeleteMeetinglog, CreateMeetinglog } from '../../apis/SalesApi/Meeting';
import { showAllClients } from 'apis/SalesApi/Clint';
import { GridCloseIcon } from '@mui/x-data-grid';
import { tokens } from 'theme';



const validateUser = (values) => {
  const errors = {};
  if (!values.clients_id) errors.clients_id = 'Stakeholder is required';
  if (!values.type) errors.type = 'Activity type is required';
  if (!values.status) errors.status = 'Status is required';
  if (!values.reason) errors.reason = 'Purpose is required';
  if (!values.result) errors.result = 'Result is required';
  if (!values.date) errors.date = 'Date is required';
  if (!values.time) errors.time = 'Time is required';
  if (!values.nextactivity) errors.nextactivity = 'Next activity is required';
  return errors;
};

const ActivityLog = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [activityType, setActivityType] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stakeholdersList , setStakeholdersList] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleCloseModal = () => {
    setOpenModal(false);
    // setSelectedRow(null);
  };
  const [values, setValues] = useState({
    // id: '',
    clients_id: '',
    type: '',
    reason: '',
    result: '',
    status: '',
    date: '',
    time: '',
    nextactivity: '',
  });

  const columns = useMemo(
    () => [
      { accessorKey: 'id', header: 'Id', enableEditing: false, size: 80 },
      { accessorKey: 'client.name', header: 'Name', enableEditing: false },
      { accessorKey: 'type', header: 'Type', enableEditing: false },
      { accessorKey: 'reason', header: 'Purpose', enableEditing: false },
      { accessorKey: 'result', header: 'Result', enableEditing: false },
      {
        accessorKey: 'status',
        header: 'Status',
        enableEditing: false,
        Cell: ({ cell }) => (
          <Chip label={cell.getValue()} color="secondary" variant="outlined" />
        ),
      },
      { accessorKey: 'date', header: 'Date', enableEditing: false },
      { accessorKey: 'time', header: 'Time', enableEditing: false },
      { accessorKey: 'nextactivity', header: 'Next Activity', enableEditing: false },
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ShowAllMeetinglog();
        if (response.status === 200 || response.status === 201) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchStakeholders = async () => {
      try {
        const response = await showAllClients();
        console.log(response);
        
        if (response.status === 200 || response.status === 201) {
          setStakeholdersList(response?.data);
        }
      }
      catch (error) {
        console.log("Error fetching data:",error);
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchData();
    fetchStakeholders();
  }, []);

  const handleCreateUser = async () => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});

    try {
      console.log(values);
      const response = await CreateMeetinglog(values);
      console.log(response);
      if (response.status === 201 || response.status === 200) {
        setData((prevData) => [...prevData, values]);
        setOpenModal(false);
        setValues({
          // id: '',
          clients_id: '',
          type: '',
          reason: '',
          result: '',
          status: '',
          date: '',
          time: '',
          nextactivity: '',
        });
      }
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await DeleteMeetinglog(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
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
    data,
    createDisplayMode: 'modal',
    enableEditing: false,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoading
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
      sx: { backgroundColor: theme.palette.primary.main },
    }),
    muiTablePaperProps: {
      elevation: 2,
      sx: {
        borderRadius: '20px',
      },
    },
    muiTableContainerProps: {
        sx: {
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '10px',
        },
      },
      muiTableProps: {
        size: 'small',
      },
      muiTableBodyProps: {
        sx: {
          '& tr:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    });

    return (
      <>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            mb:2
          }}
          onClick={() => setOpenModal(true)}
        >
          Create Activity
        </Button>
  
        <MaterialReactTable table={table} />
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          fullWidth
          maxWidth="sm"
        >
          <Box
          sx={{
            border:`1px solid ${colors.greenAccent[400]}`,
            borderRadius:"8px"
          }}
          >
          <DialogTitle>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase"  }}>
                            <Lottie style={{ width: '25px', display: 'flex' }} animationData={Document} />
                            Create Activity
                            <IconButton onClick={handleCloseModal} sx={{ marginLeft: 'auto', "&:hover": { color: colors.redAccent[400] } }}>
                                <GridCloseIcon />
                            </IconButton>
                        </Box>

          </DialogTitle>
          <Divider />
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel id="stakeholder-label">Stakeholder</InputLabel>
              <Select
                labelId="stakeholder-label"
                name="clients_id"
                value={values.clients_id}
                onChange={handleChange}
                required
              >
                {stakeholdersList.map((stakeholder, index) => (
                  <MenuItem key={index} value={stakeholder.id}>
                    {stakeholder.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={values.status}
                onChange={handleChange}
                required
              >
                {statusOptions.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="reason"
              label="Purpose"
              value={values.reason}
              onChange={handleChange}
              required
              error={!!validationErrors?.reason}
              helperText={validationErrors?.reason}
              fullWidth
              margin="normal"
            />
            <TextField
              name="result"
              label="Result"
              value={values.result}
              onChange={handleChange}
              required
              error={!!validationErrors?.result}
              helperText={validationErrors?.result}
              fullWidth
              margin="normal"
            />
            <TextField
              name="date"
              label="Date"
              type="date"
              value={values.date}
              onChange={handleChange}
              required
              error={!!validationErrors?.date}
              helperText={validationErrors?.date}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />
            <TextField
              name="time"
              label="Time"
              type="time"
              value={values.time}
              onChange={handleChange}
              required
              error={!!validationErrors?.time}
              helperText={validationErrors?.time}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />
            <TextField
              name="nextactivity"
              label="Next Activity"
              type="date"
              value={values.nextactivity}
              onChange={handleChange}
              required
              error={!!validationErrors?.date}
              helperText={validationErrors?.date}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <Divider/>
          <DialogActions
          sx={{
            mr:2,
            mb:1,
            mt:1
          }}
          >
            <Button onClick={() => setOpenModal(false)} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleCreateUser}
              color="secondary"
              variant="outlined"
            >
              Create
            </Button>
          </DialogActions>
          </Box>
        </Dialog>
  
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title">
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase"  }}>
              <Lottie style={{ width: '25px', display: 'flex' }} animationData={Document} />
              Delete Activity
              <IconButton onClick={handleCloseModal} sx={{ marginLeft: 'auto', "&:hover": { color: colors.redAccent[400] } }}>
                  <GridCloseIcon />
              </IconButton>
          </Box>

          </DialogTitle>
          <Divider/>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this activity?
            </Typography>
          </DialogContent>
          <Divider />
          <DialogActions sx={{mb:1, mt:1}}>
            <Button onClick={handleCloseDeleteDialog} variant="outlined" color="error">
              Cancel
            </Button>
            <Button onClick={() => handleDelete(deleteId)} variant="outlined" color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  
  export default ActivityLog;
