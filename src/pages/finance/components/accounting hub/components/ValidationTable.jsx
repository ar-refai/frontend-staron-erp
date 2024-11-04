import React, { useEffect, useState } from 'react';
import { Box, Grid, Avatar, Chip } from '@mui/material';
import { showAllValidationRequests } from 'apis/FainanceApi/FinanceRequests';
import { type MRT_ColumnDef, MaterialReactTable } from 'material-react-table';

const ValidationTable = () => {
    const [validationData, setValidationData] = useState([]);

    useEffect(() => {
        const fetchValidationData = async () => {
            try {
                const response = await showAllValidationRequests();
                if (response.status === 200) {
                    // Directly set the response data to the state as userImage is already provided
                    setValidationData(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch validation data:', error);
            }
        };
        fetchValidationData();
    }, []);

    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'requestSource',
            header: 'Request Source',
        },
        {
            accessorKey: 'requestedBy',
            header: 'Requested By',
            Cell: ({ cell }) => (
                <Avatar
                    src={cell.row.original.userImage} // Using the userImage field directly from the response
                    alt="User Thumbnail"
                    sx={{ width: 24, height: 24 }}
                />
            ),
        },
        {
            accessorKey: 'parentId',
            header: 'Parent ID',
        },
        {
            accessorKey: 'hierarchy',
            header: 'Hierarchy',
            Cell: ({ cell }) =>
                cell.getValue() ? JSON.stringify(cell.getValue()) : 'N/A',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            Cell: () => <Chip label="Pending" color="warning" />,
        },
    ];

    return (
        <MaterialReactTable
            columns={columns}
            data={validationData}
            enablePagination={false}
            initialState={{ expanded: false }}
            muiTablePaperProps={{
                elevation: 2,
                sx: { borderRadius: '20px' },
            }}
        />
    );
};

export default ValidationTable;
