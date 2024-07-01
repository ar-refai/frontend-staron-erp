import React, { useMemo, useState } from 'react';
import {
    MRT_EditActionButtons,
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
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from 'theme';

// Sample analytics data
const fakeData = [
    {
        id: '1',
        name: 'Mustafa Hussien',
        type: 'Project Owner',
        source: 'Independent',
        numberOfMeetings: 0,
        numberOfCalls: 0,
        numberOfQuotations: 0,
        numberOfProjectsSold: 0,
    },
    {
        id: '1',
        name: 'Mustafa Hussien',
        type: 'Project Owner',
        source: 'Independent',
        numberOfMeetings: 0,
        numberOfCalls: 0,
        numberOfQuotations: 0,
        numberOfProjectsSold: 0,
    },
    {
        id: '1',
        name: 'Mustafa Hussien',
        type: 'Project Owner',
        source: 'Independent',
        numberOfMeetings: 0,
        numberOfCalls: 0,
        numberOfQuotations: 0,
        numberOfProjectsSold: 0,
    },
    {
        id: '1',
        name: 'Mustafa Hussien',
        type: 'Project Owner',
        source: 'Independent',
        numberOfMeetings: 0,
        numberOfCalls: 0,
        numberOfQuotations: 0,
        numberOfProjectsSold: 0,
    },
    {
        id: '1',
        name: 'Mustafa Hussien',
        type: 'Project Owner',
        source: 'Independent',
        numberOfMeetings: 0,
        numberOfCalls: 0,
        numberOfQuotations: 0,
        numberOfProjectsSold: 0,
    },
    {
        id: '1',
        name: 'Mustafa Hussien',
        type: 'Project Owner',
        source: 'Independent',
        numberOfMeetings: 0,
        numberOfCalls: 0,
        numberOfQuotations: 0,
        numberOfProjectsSold: 0,
    },
    {
        id: '1',
        name: 'Mustafa Hussien',
        type: 'Project Owner',
        source: 'Independent',
        numberOfMeetings: 0,
        numberOfCalls: 0,
        numberOfQuotations: 0,
        numberOfProjectsSold: 0,
    },
    {
        id: '1',
        name: 'Mustafa Hussien',
        type: 'Project Owner',
        source: 'Independent',
        numberOfMeetings: 0,
        numberOfCalls: 0,
        numberOfQuotations: 0,
        numberOfProjectsSold: 0,
    },
    // Add more sample data as needed
];

const Analytics = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
                accessorKey: 'type',
                header: 'Type',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.type,
                    helperText: validationErrors?.type,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            type: undefined,
                        }),
                },
            },
            {
                accessorKey: 'source',
                header: 'Source',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.source,
                    helperText: validationErrors?.source,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            source: undefined,
                        }),
                },
            },
            {
                accessorKey: 'numberOfMeetings',
                header: 'Number Of Meetings',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'number',
                    error: !!validationErrors?.numberOfMeetings,
                    helperText: validationErrors?.numberOfMeetings,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            numberOfMeetings: undefined,
                        }),
                },
            },
            {
                accessorKey: 'numberOfCalls',
                header: 'Number Of Calls',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'number',
                    error: !!validationErrors?.numberOfCalls,
                    helperText: validationErrors?.numberOfCalls,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            numberOfCalls: undefined,
                        }),
                },
            },
            {
                accessorKey: 'numberOfQuotations',
                header: 'Number Of Quotations',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'number',
                    error: !!validationErrors?.numberOfQuotations,
                    helperText: validationErrors?.numberOfQuotations,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            numberOfQuotations: undefined,
                        }),
                },
            },
            {
                accessorKey: 'numberOfProjectsSold',
                header: 'Number Of Projects Sold',
                muiEditTextFieldProps: {
                    required: true,
                    type: 'number',
                    error: !!validationErrors?.numberOfProjectsSold,
                    helperText: validationErrors?.numberOfProjectsSold,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            numberOfProjectsSold: undefined,
                        }),
                },
            },
        ],
        [validationErrors],
    );

    // const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
    const { data: fetchedUsers = [], isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers } = useGetUsers();
    // const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
    // const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

    // const handleCreateUser = async ({ values, table }) => {
    //     const newValidationErrors = validateUser(values);
    //     if (Object.values(newValidationErrors).some((error) => error)) {
    //         setValidationErrors(newValidationErrors);
    //         return;
    //     }
    //     setValidationErrors({});
    //     await createUser(values);
    //     table.setCreatingRow(null);
    // };

    // const handleSaveUser = async ({ values, table }) => {
    //     const newValidationErrors = validateUser(values);
    //     if (Object.values(newValidationErrors).some((error) => error)) {
    //         setValidationErrors(newValidationErrors);
    //         return;
    //     }
    //     setValidationErrors({});
    //     await updateUser(values);
    //     table.setEditingRow(null);
    // };

    // const openDeleteConfirmModal = (row) => {
    //     if (window.confirm('Are you sure you want to delete this user?')) {
    //         deleteUser(row.original.id);
    //     }
    // };

    const table = useMaterialReactTable({
        columns,
        data: fetchedUsers,
        // createDisplayMode: 'modal',
        // editDisplayMode: 'modal',
        // enableEditing: true,
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
            sx: { backgroundColor: colors.primary[400] }
        }),
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
        // onCreatingRowCancel: () => setValidationErrors({}),
        // onCreatingRowSave: handleCreateUser,
        // onEditingRowCancel: () => setValidationErrors({}),
        // onEditingRowSave: handleSaveUser,
        // renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
        //     <>
        //         <DialogTitle variant="h3">Create New Analytics Entry</DialogTitle>
        //         <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        //             {internalEditComponents}
        //         </DialogContent>
        //         <DialogActions>
        //             <MRT_EditActionButtons variant="text" table={table} row={row} />
        //         </DialogActions>
        //     </>
        // ),
        // renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
        //     <>
        //         <DialogTitle variant="h3">Edit Analytics Entry</DialogTitle>
        //         <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        //             {internalEditComponents}
        //         </DialogContent>
        //         <DialogActions>
        //             <MRT_EditActionButtons variant="text" table={table} row={row} />
        //         </DialogActions>
        //     </>
        // ),
        // renderRowActions: ({ row, table }) => (
        //     <Box sx={{ display: 'flex', gap: '1rem' }}>
        //         <Tooltip title="Edit">
        //             <IconButton onClick={() => table.setEditingRow(row)}>
        //                 <EditIcon />
        //             </IconButton>
        //         </Tooltip>
        //         <Tooltip title="Delete">
        //             <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
        //                 <DeleteIcon />
        //             </IconButton>
        //         </Tooltip>
        //     </Box>
        // ),
        // renderTopToolbarCustomActions: ({ table }) => (
        //     <Button
        //         variant="contained"
        //         onClick={() => {
        //             table.setCreatingRow(true);
        //         }}
        //     >
        //         Create New Analytics Entry
        //     </Button>
        // ),
        state: {
            isLoading: isLoadingUsers,
            // isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },
    });

    return <MaterialReactTable table={table} />;
};

// function useCreateUser() {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: async (user) => {
//             await new Promise((resolve) => setTimeout(resolve, 1000));
//             return Promise.resolve();
//         },
//         onMutate: (newUserInfo) => {
//             queryClient.setQueryData(['users'], (prevUsers) => [
//                 ...prevUsers,
//                 {
//                     ...newUserInfo,
//                     id: (Math.random() + 1).toString(36).substring(7),
//                 },
//             ]);
//         },
//     });
// }

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

// function useUpdateUser() {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: async (user) => {
//             await new Promise((resolve) => setTimeout(resolve, 1000));
//             return Promise.resolve();
//         },
//         onMutate: (newUserInfo) => {
//             queryClient.setQueryData(['users'], (prevUsers) =>
//                 prevUsers.map((prevUser) =>
//                     prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
//                 ),
//             );
//         },
//     });
// }

// function useDeleteUser() {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: async (userId) => {
//             await new Promise((resolve) => setTimeout(resolve, 1000));
//             return Promise.resolve();
//         },
//         onMutate: (userId) => {
//             queryClient.setQueryData(['users'], (prevUsers) =>
//                 prevUsers.filter((user) => user.id !== userId),
//             );
//         },
//     });
// }

const queryClient = new QueryClient();

const AnalyticsWithProviders = () => (
    <QueryClientProvider client={queryClient}>
        <Analytics />
    </QueryClientProvider>
);

export default AnalyticsWithProviders;

const validateRequired = (value) => !!value.length;

function validateUser(user) {
    return {
        name: !validateRequired(user.name) ? 'Name is Required' : '',
        type: !validateRequired(user.type) ? 'Type is Required' : '',
        source: !validateRequired(user.source) ? 'Source is Required' : '',
        numberOfMeetings: isNaN(user.numberOfMeetings) ? 'Number of Meetings is Required' : '',
        numberOfCalls: isNaN(user.numberOfCalls) ? 'Number of Calls is Required' : '',
        numberOfQuotations: isNaN(user.numberOfQuotations) ? 'Number of Quotations is Required' : '',
        numberOfProjectsSold: isNaN(user.numberOfProjectsSold) ? 'Number of Projects Sold is Required' : '',
    };
}
