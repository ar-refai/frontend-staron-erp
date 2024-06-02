import React, { useMemo, useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
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
const data = makeData();

const Requests = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [open, setOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    name: '',
    title: '',
    date: '',
    requesterName: '',
    status: 'Pending',
    description: '',
    requesterImage: ''
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
    // Add the new request to your data
    data.push(newRequest);
    setOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Request Name',
        size: 250,
      },
      {
        accessorKey: 'title',
        header: 'Request Title',
        size: 300,
      },
      {
        accessorKey: 'date',
        header: 'Date of Request',
        size: 200,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
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
            <Box
              component="span"
              sx={{
                backgroundColor: color,
                borderRadius: '0.25rem',
                color: '#fff',
                maxWidth: '9ch',
                p: '0.25rem',
                textAlign: 'center',
              }}
            >
              {status}
            </Box>
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <Box
        sx={{
          backgroundColor: colors.primary[400],
          padding: '12px 40px',
          margin: '20px 20px 10px 10px',
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
        <MaterialReactTable
          columns={columns}
          data={data} // data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
          enableColumnFilterModes
          enableColumnOrdering
          enableGrouping
          enableColumnPinning
          enableFacetedValues
          initialState={{
            showColumnFilters: true,
            showGlobalFilter: true,
            columnPinning: {
              left: ['mrt-row-expand', 'mrt-row-select'],
            },
          }}
          paginationDisplayMode="pages"
          positionToolbarAlertBanner="bottom"
          muiSearchTextFieldProps={{
            size: 'small',
            variant: 'outlined',
          }}
          muiPaginationProps={{
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30],
            shape: 'rounded',
            variant: 'outlined',
          }}
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-around',
                left: '30px',
                maxWidth: '1000px',
                position: 'sticky',
                width: '100%',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4">Request Description:</Typography>
                <Typography variant="body1">{row.original.description}</Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>Additional Info:</Typography>
                <Typography variant="body2">Requester: {row.original.requesterName}</Typography>
                <Typography variant="body2">Status: {row.original.status}</Typography>
                <Typography variant="body2">Date of Request: {new Date(row.original.date).toLocaleDateString()}</Typography>
              </Box>
            </Box>
          )}
          renderTopToolbar={({ table }) => (
            <Box
              sx={{
                backgroundColor: colors.primary[400],
                display: 'flex',
                gap: '0.5rem',
                p: '8px',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <MRT_GlobalFilterTextField table={table} />
                <MRT_ToggleFiltersButton table={table} />
              </Box>
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Add Request
              </Button>
            </Box>
          )}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
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
          />
          <TextField
            label="Request Title"
            name="title"
            value={newRequest.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newRequest.date}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Requester Name"
            name="requesterName"
            value={newRequest.requesterName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={newRequest.description}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Requester Image URL"
            name="requesterImage"
            value={newRequest.requesterImage}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleAddRequest}>
            Add
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Requests;
