// PayrollTable.js
import React from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';

const PayrollTable = ({ columns, data, colors }) => {
    const table = useMaterialReactTable({
        columns,
        data,
        enableRowSelection: true,
        muiSelectCheckboxProps: {
            color: 'secondary',
        },
        enableColumnFilterModes: true,
        enableColumnPinning: true,
        enableFacetedValues: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        enableColumnResizing: true,
        initialState: { density: 'spacious' },
        enableStickyHeader: true,
        muiLinearProgressProps: {
            color: 'secondary',
        },
        muiCircularProgressProps: {
            color: 'secondary',
        },
        muiTablePaperProps: {
            elevation: 2,
            sx: {
                borderRadius: '20px',
            },
        },
        muiTableContainerProps: {
            sx: { maxHeight: '600px', backgroundColor: colors.primary[400], overflowX: 'auto' },
        },
        muiTableHeadCellProps: { sx: { backgroundColor: colors.primary[400] } },
        muiTableBodyCellProps: { sx: { backgroundColor: colors.primary[400] } },
        muiTableBodyProps: { sx: { backgroundColor: colors.primary[400] } },
        muiBottomToolbarProps: ({ table }) => ({
            sx: { backgroundColor: colors.primary[400] },
        }),
        muiPaginationProps: {
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30, 40, 50, 60],
            shape: 'rounded',
            variant: 'outlined',
        },
    });

    return (
        <Box>
            <MaterialReactTable table={table} />
        </Box>
    );
};

export default PayrollTable;
