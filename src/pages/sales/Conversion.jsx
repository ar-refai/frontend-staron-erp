import React, { useMemo, useState } from 'react';
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
    IconButton,
    Tooltip,
    useTheme,
    Typography,
    Divider
} from '@mui/material';
import { tokens } from 'theme';
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json"
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';

// Sample conversion data
const fakeData = [
    {
        id: '1',
        name: 'Alice Johnson',
        location: 'New York',
        date: '2023-06-15',
        status: 'sold',
        description: 'A detailed description of the conversion.',
        details: 'More detailed information about Alice Johnson\'s conversion project.',
    },
    {
        id: '2',
        name: 'Bob Smith',
        location: 'California',
        date: '2023-06-18',
        status: 'rejected',
        description: 'A detailed description of the conversion.',
        details: 'More detailed information about Bob Smith\'s conversion project.',
    },
    {
        id: '3',
        name: 'Carol Williams',
        location: 'Texas',
        date: '2023-06-20',
        status: 'sold',
        description: 'A detailed description of the conversion.',
        details: 'More detailed information about Carol Williams\'s conversion project.',
    },
    // Add more sample data as needed
];

const Conversion = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState('');

    const handleOpenDialog = (details) => {
        setSelectedDetails(details);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedDetails('');
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'location',
                header: 'Location',
            },
            {
                accessorKey: 'date',
                header: 'Date',
            },
            {
                accessorKey: 'status',
                header: 'Status',
                Cell: ({ cell }) => (
                    <Chip
                        label={cell.getValue()}
                        color={cell.getValue() === 'sold' ? 'success' : 'error'}
                        sx={{
                            width: '80px',
                            fontSize: '15px'
                        }}
                        variant="outlined"
                    />
                ),
            },
            {
                accessorKey: 'description',
                header: 'Description',
            },
            {
                accessorKey: 'details',
                header: 'Details',
                Cell: ({ cell }) => (
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleOpenDialog(cell.getValue())}
                    >
                        Show More
                    </Button>
                ),
            },
        ],
        []
    );

    const { data: fetchedUsers = [], isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers } = useGetUsers();

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
        state: {
            isLoading: isLoadingUsers,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },
    });

    return (
        <>
            <MaterialReactTable table={table} />
            
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <Box
                sx={{
                    backgroundColor: colors.grey[800],
                    borderRadius: '5px',
                }}
                >

                <DialogTitle>
                    <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
                    <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
                                        Project Details
                    </Box>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography variant="body1">
                        {selectedDetails}
                    </Typography>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleCloseDialog}
                    >
                        Close
                    </Button>
                </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

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

const ConversionWithProviders = () => (
    <QueryClientProvider client={queryClient}>
        <Conversion />
    </QueryClientProvider>
);

export default ConversionWithProviders;
