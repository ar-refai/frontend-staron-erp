import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { MaterialReactTable } from "material-react-table";

const ViewAllRentsDialog = ({ openViewDialog, setOpenViewDialog, arData, handleEditClick }) => {
    const columns = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Rent Title",
        },
        {
            accessorKey: "amount",
            header: "Rent Amount",
        },
        {
            accessorKey: "status",
            header: "Rent Status",
            Cell: ({ cell }) => {
                const isActive = cell.getValue() === '1'; // Assuming '1' is active and '0' is inactive
                return (
                    <Typography variant="body2" color={isActive ? 'green' : 'red'}>
                        {isActive ? 'Active' : 'Inactive'}
                    </Typography>
                );
            },
        },
        {
            accessorKey: "actions",
            header: "Actions",
            Cell: ({ row }) => (
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleEditClick(row.original.id)}
                >
                    Edit 
                </Button>
            ),
        },
    ];

    return (
        <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
            <DialogTitle>View All Rents</DialogTitle>
            <DialogContent>
                <MaterialReactTable
                    columns={columns}
                    data={arData}
                    muiSkeletonProps={{
                        animation: "wave",
                    }}
                    muiSearchTextFieldProps={{
                        size: "small",
                        variant: "outlined",
                    }}
                    muiPaginationProps={{
                        color: "secondary",
                        rowsPerPageOptions: [10, 20, 30, 40],
                        shape: "rounded",
                        variant: "outlined",
                    }}
                    muiBottomToolbarProps={({ table }) => ({
                        sx: { backgroundColor: "#444" },
                    })}
                    muiTablePaperProps={{
                        elevation: 2,
                        sx: {
                            borderRadius: "20px",
                        },
                    }}
                    muiTableContainerProps={{
                        sx: {
                            backgroundColor: "#444",
                        },
                    }}
                    muiTableHeadCellProps={{
                        sx: {
                            backgroundColor: "#444  ",
                        },
                    }}
                    muiTableBodyCellProps={{
                        sx: {
                            backgroundColor: "#444",
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenViewDialog(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ViewAllRentsDialog;
