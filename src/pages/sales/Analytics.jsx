import React, { useMemo, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    useTheme,
} from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';
import { tokens } from 'theme';
import { AnalyticsList } from 'apis/SalesApi/Clint';

// Analytics component
const Analytics = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Table columns definition
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.name,
                    helperText: validationErrors?.name,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                },
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.phone,
                    helperText: validationErrors?.phone,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            phone: undefined,
                        }),
                },
            },
            {
                accessorKey: 'company',
                header: 'Company',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.company,
                    helperText: validationErrors?.company,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            company: undefined,
                        }),
                },
            },
            {
                accessorKey: 'Job_role',
                header: 'Job Role',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.Job_role,
                    helperText: validationErrors?.Job_role,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            Job_role: undefined,
                        }),
                },
            },
            {
                accessorKey: 'email',
                header: 'Email',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.email,
                    helperText: validationErrors?.email,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            email: undefined,
                        }),
                },
            },
            {
                accessorKey: 'status',
                header: 'Status',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.status,
                    helperText: validationErrors?.status,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            status: undefined,
                        }),
                },
            },
            {
                accessorKey: 'meeting_count',
                header: 'Meeting Count',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'number',
                    error: !!validationErrors?.meeting_count,
                    helperText: validationErrors?.meeting_count,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            meeting_count: undefined,
                        }),
                },
            },
            {
                accessorKey: 'phone_call_count',
                header: 'Phone Call Count',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'number',
                    error: !!validationErrors?.phone_call_count,
                    helperText: validationErrors?.phone_call_count,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            phone_call_count: undefined,
                        }),
                },
            },
            {
                accessorKey: 'completed_sales_count',
                header: 'Completed Sales Count',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'number',
                    error: !!validationErrors?.completed_sales_count,
                    helperText: validationErrors?.completed_sales_count,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            completed_sales_count: undefined,
                        }),
                },
            },
            {
                accessorKey: 'incomplete_sales_count',
                header: 'Incomplete Sales Count',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'number',
                    error: !!validationErrors?.incomplete_sales_count,
                    helperText: validationErrors?.incomplete_sales_count,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            incomplete_sales_count: undefined,
                        }),
                },
            },
        ],
        [validationErrors],
    );

    // Fetch data using react-query
    const { data: fetchedUsers = [], isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers } = useGetAnalytics();

    // Table configuration
    const table = useMaterialReactTable({
        columns,
        data: fetchedUsers,
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
        muiBottomToolbarProps: ({ table }) => ({
            sx: { backgroundColor: colors.primary[400] },
        }),
        muiTablePaperProps: {
            elevation: 2, // Change the MUI box shadow
            sx: {
                borderRadius: '20px',
            },
        },
        muiTableContainerProps: { sx: { maxHeight: '600px', backgroundColor: colors.primary[400] } },
        muiTableHeadCellProps: { sx: { backgroundColor: colors.primary[400] } },
        muiTableBodyCellProps: { sx: { backgroundColor: colors.primary[400] } },
        muiTableBodyProps: { sx: { backgroundColor: colors.primary[400] } },
        state: {
            isLoading: isLoadingUsers,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },
    });

    return <MaterialReactTable table={table} />;
};

// Hook to fetch data using react-query
function useGetAnalytics() {
    return useQuery({
        queryKey: ['analytics'],
        queryFn: async () => {
            const response = await AnalyticsList();
            if (!response || response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data;
        },
        refetchOnWindowFocus: false,
    });
}

const queryClient = new QueryClient();

// Main component with query client provider
const AnalyticsWithProviders = () => (
    <QueryClientProvider client={queryClient}>
        <Analytics />
    </QueryClientProvider>
);

export default AnalyticsWithProviders;

// Validation functions
const validateRequired = (value) => !!value.length;

function validateUser(user) {
    return {
        name: !validateRequired(user.name) ? 'Name is Required' : '',
        phone: !validateRequired(user.phone) ? 'Phone is Required' : '',
        company: !validateRequired(user.company) ? 'Company is Required' : '',
        Job_role: !validateRequired(user.Job_role) ? 'Job Role is Required' : '',
        email: !validateRequired(user.email) ? 'Email is Required' : '',
        status: !validateRequired(user.status) ? 'Status is Required' : '',
        meeting_count: isNaN(user.meeting_count) ? 'Meeting Count is Required' : '',
        phone_call_count: isNaN(user.phone_call_count) ? 'Phone Call Count is Required' : '',
        completed_sales_count: isNaN(user.completed_sales_count) ? 'Completed Sales Count is Required' : '',
        incomplete_sales_count: isNaN(user.incomplete_sales_count) ? 'Incomplete Sales Count is Required' : '',
    };
}
