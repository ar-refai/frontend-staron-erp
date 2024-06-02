import { Box, Typography, MenuItem, ListItemIcon, Button } from '@mui/material';
import React, { useMemo } from 'react';
import { useTheme, lighten } from '@mui/system';
import { tokens } from '../../theme';
import TagIcon from '@mui/icons-material/Tag';

import {
    MaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
} from 'material-react-table';

import { AccountCircle, Send } from '@mui/icons-material';

// Mock Data
import { data } from './makeDataApprovals';

const RequestsApproval = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', // simple accessor for the request name
                header: 'Request Name',
                size: 250,
            },
            {
                accessorKey: 'title', // simple accessor for the request title
                header: 'Request Title',
                size: 300,
            },
            {
                accessorKey: 'date', // simple accessor for the date
                header: 'Date of Request',
                size: 200,
                Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(), // render Date as a string
            },
            {
                accessorFn: (row) => `${row.requesterName}`, // accessorFn used to join multiple data into a single cell
                id: 'requester', // id is still required when using accessorFn instead of accessorKey
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
                accessorKey: 'status', // simple accessor for the status
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
            {/* New Content Here */}
            <Box sx={{ padding: '20px' }}>
                <MaterialReactTable
                    columns={columns}
                    data={data} // data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
                    enableColumnFilterModes
                    enableColumnOrdering
                    enableGrouping
                    enableColumnPinning
                    enableFacetedValues
                    enableRowSelection
                    initialState={{
                        showColumnFilters: true,
                        showGlobalFilter: true,
                        columnPinning: {
                            left: ['mrt-row-expand', 'mrt-row-select'],
                            right: ['mrt-row-actions'],
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
                    renderRowActionMenuItems={({ closeMenu }) => [
                        <MenuItem
                            key={0}
                            onClick={() => {
                                // View details logic...
                                closeMenu();
                            }}
                            sx={{ m: 0 }}
                        >
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            View Details
                        </MenuItem>,
                        <MenuItem
                            key={1}
                            onClick={() => {
                                // Send notification logic...
                                closeMenu();
                            }}
                            sx={{ m: 0 }}
                        >
                            <ListItemIcon>
                                <Send />
                            </ListItemIcon>
                            Send Notification
                        </MenuItem>,
                    ]}
                    renderTopToolbar={({ table }) => {
                        const handleApprove = () => {
                            table.getSelectedRowModel().flatRows.forEach((row) => {
                                alert('approving ' + row.getValue('name'));
                            });
                        };

                        const handleReject = () => {
                            table.getSelectedRowModel().flatRows.forEach((row) => {
                                alert('rejecting ' + row.getValue('name'));
                            });
                        };

                        return (
                            <Box
                                sx={{
                                    backgroundColor: lighten(theme.palette.background.default, 0.05),
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
                                <Box>
                                    <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                                        <Button
                                            color="success"
                                            disabled={!table.getIsSomeRowsSelected()}
                                            onClick={handleApprove}
                                            variant="contained"
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            color="error"
                                            disabled={!table.getIsSomeRowsSelected()}
                                            onClick={handleReject}
                                            variant="contained"
                                        >
                                            Reject
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    }}
                />
            </Box>
        </>
    );
};

export default RequestsApproval;
