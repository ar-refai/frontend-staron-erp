import React, { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  MRT_EditActionButtons,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';
import { tokens } from "../../theme";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const initialData = [
  {
    id: '1',
    date: '2024-10-01',
    operationalMapping: 'https://example.com/file1.pdf',
    materialProcurementNeeds: 'https://example.com/file2.pdf',
    invoiceStatements: 'https://example.com/file3.pdf',
    collectionActivity: 'https://example.com/file4.pdf',
  },
  // Add more dummy data if needed
];

const MonthlyFramework = () => {
  const [data, setData] = useState(initialData);
  const [validationErrors, setValidationErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState(dayjs());
  const [showModal, setShowModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [filteredData, setFilteredData] = useState(initialData);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const selectedDate = searchQuery.format('YYYY-MM');
    setFilteredData(data.filter((entry) => entry.date.startsWith(selectedDate)));
  }, [searchQuery, data]);

  const handleFileUpload = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleFileSubmit = () => {
    // Handle file upload
    setShowModal(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        enableEditing: false,
      },
      {
        accessorKey: 'operationalMapping',
        header: 'Operational Mapping',
        Cell: ({ cell }) => (
          <a href={cell.getValue()} target="_blank" rel="noopener noreferrer" style={{ color: colors.blueAccent[400]}}>
            Download
          </a>
        ),
        muiEditTextFieldProps: {
          type: 'text',
          onChange: (e) =>
            setValidationErrors({
              ...validationErrors,
              operationalMapping: undefined,
            }),
        },
      },
      {
        accessorKey: 'materialProcurementNeeds',
        header: 'Material Procurement Needs',
        Cell: ({ cell }) => (
          <a href={cell.getValue()} target="_blank" rel="noopener noreferrer" style={{ color: colors.blueAccent[400]}}>
            Download
          </a>
        ),
        enableEditing: false,
      },
      {
        accessorKey: 'invoiceStatements',
        header: 'Invoice Statements',
        Cell: ({ cell }) => (
          <a href={cell.getValue()} target="_blank" rel="noopener noreferrer" style={{ color: colors.blueAccent[400]}}>
            Download
          </a>
        ),
        enableEditing: false,
      },
      {
        accessorKey: 'collectionActivity',
        header: 'Collection Activity',
        Cell: ({ cell }) => (
          <a href={cell.getValue()} target="_blank" rel="noopener noreferrer" style={{ color: colors.blueAccent[400]}}>
            Download
          </a>
        ),
        enableEditing: false,
      },
    ],
    [validationErrors]
  );

  const queryClient = useQueryClient();

  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();

  const handleCreateRow = async ({ values, table }) => {
    const newValidationErrors = validateRow(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); // exit creating mode
  };

  const handleSaveRow = async ({ values, table }) => {
    const newValidationErrors = validateRow(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); // exit editing mode
  };

  const table = useMaterialReactTable({
    columns,
    data: filteredData,
    createDisplayMode: 'modal', // default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', // default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    muiTablePaperProps: {
      elevation: 2,
      sx: {
        borderRadius: "20px",
        backgroundColor: colors.primary[400], // Change table background color
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: "600px",
        backgroundColor: colors.primary[400], // Change table background color
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: colors.primary[400], // Change table head cell background color
      },
    },
    muiTableBodyCellProps: {
      sx: {
        backgroundColor: colors.primary[400], // Change table body cell background color
      },
    },
    muiTableBodyProps: {
      sx: {
        backgroundColor: colors.primary[400], // Change table body background color
      },
    },
    muiBottomToolbarProps: ({ table }) => ({
      sx: {
        backgroundColor: colors.primary[400], // Change bottom toolbar background color
      },
    }),
    
    muiToolbarAlertBannerProps: false ? { color: 'error', children: 'Error loading data' } : undefined,
    muiTableContainerProps: { sx: { minHeight: '500px' } },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateRow,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveRow,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Record</DialogTitle>
        <Divider />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <Divider />
        <DialogActions>
          <MRT_EditActionButtons variant="outlined" color="secondary" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Record</DialogTitle>
        <Divider />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <Divider />
        <DialogActions>
          <MRT_EditActionButtons variant="outlined" color="secondary" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex',flexDirection:"column", justifyContent:"start" , alignItems: 'start', gap: '1rem' }}>
        <Button
          variant="outlined"
          color="secondary"
          component="label"
        >
          <Box sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:"center" , 
            gap:'10px',
            color:colors.greenAccent[400]}}>
          <CloudUploadIcon />
          <Typography>
          Submit Plan
          </Typography>  
          </Box>
          <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
        </Button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year', 'month']}
            label="Select Month"
            value={searchQuery}
            onChange={(newValue) => setSearchQuery(newValue)}
            renderInput={(params) => <TextField variant="outlined" color="secondary" {...params} />}
          />
        </LocalizationProvider>
      </Box>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Upload File</DialogTitle>
        <Divider />
        <DialogContent>
          <Button
            variant="outlined"
            color="secondary"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
          </Button>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleFileSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const validateRow = (values) => {
  const errors = {};
  if (!values.operationalMapping) {
    errors.operationalMapping = 'Operational Mapping is required';
  }
  // Add other validations as needed
  return errors;
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUser) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      return newUser;
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData(['users'], (oldData) => [...oldData, newUser]);
    },
  });
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedUser) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      return updatedUser;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['users'], (oldData) =>
        oldData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    },
  });
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      return userId;
    },
    onMutate: (userId) => {
      queryClient.setQueryData(['users'], (oldData) =>
        oldData.filter((user) => user.id !== userId)
      );
    },
  });
};

const queryClient = new QueryClient();

const MonthlyFrameworkWithProviders = () => (
  <QueryClientProvider client={queryClient}>
    <MonthlyFramework />
  </QueryClientProvider>
);

export default MonthlyFrameworkWithProviders;
