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
    Divider,
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
  import Lottie from 'lottie-react';
  import Document from "../../assets/lottie/document.json"

  // Sample stakeholder data
  const fakeData = [
    {
      id: '1',
      name: 'Mohamed Shaban',
      phoneNumber: '01143104499',
      email: 'mohamedgmshaban@gmail.com',
      company: 'Staron Egypt',
      position: 'Software',
      source: 'Mr. Hussein El Behairy',
      type: 'Sub Contractor',
    },
    {
      id: '2',
      name: 'John Doe',
      phoneNumber: '01234567890',
      email: 'john.doe@StakeholdersListing.com',
      company: 'TechCorp',
      position: 'Manager',
      source: 'LinkedIn',
      type: 'Vendor',
    },
    {
      id: '2',
      name: 'John Doe',
      phoneNumber: '01234567890',
      email: 'john.doe@StakeholdersListing.com',
      company: 'TechCorp',
      position: 'Manager',
      source: 'LinkedIn',
      type: 'Vendor',
    },
    {
      id: '2',
      name: 'John Doe',
      phoneNumber: '01234567890',
      email: 'john.doe@StakeholdersListing.com',
      company: 'TechCorp',
      position: 'Manager',
      source: 'LinkedIn',
      type: 'Vendor',
    },
    {
      id: '2',
      name: 'John Doe',
      phoneNumber: '01234567890',
      email: 'john.doe@StakeholdersListing.com',
      company: 'TechCorp',
      position: 'Manager',
      source: 'LinkedIn',
      type: 'Vendor',
    },
    {
      id: '2',
      name: 'John Doe',
      phoneNumber: '01234567890',
      email: 'john.doe@StakeholdersListing.com',
      company: 'TechCorp',
      position: 'Manager',
      source: 'LinkedIn',
      type: 'Vendor',
    },
    {
      id: '2',
      name: 'John Doe',
      phoneNumber: '01234567890',
      email: 'john.doe@StakeholdersListing.com',
      company: 'TechCorp',
      position: 'Manager',
      source: 'LinkedIn',
      type: 'Vendor',
    },
    {
      id: '2',
      name: 'John Doe',
      phoneNumber: '01234567890',
      email: 'john.doe@StakeholdersListing.com',
      company: 'TechCorp',
      position: 'Manager',
      source: 'LinkedIn',
      type: 'Vendor',
    },
    {
      id: '2',
      name: 'John Doe',
      phoneNumber: '01234567890',
      email: 'john.doe@StakeholdersListing.com',
      company: 'TechCorp',
      position: 'Manager',
      source: 'LinkedIn',
      type: 'Vendor',
    },
    {
      id: '2',
      name: 'John Doe',
      phoneNumber: '01234567890',
      email: 'john.doe@StakeholdersListing.com',
      company: 'TechCorp',
      position: 'Manager',
      source: 'LinkedIn',
      type: 'Vendor',
    },
    
    // Add more sample data as needed
  ];

  const StakeholdersListing = () => {
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
          accessorKey: 'phoneNumber',
          header: 'Phone Number',
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.phoneNumber,
            helperText: validationErrors?.phoneNumber,
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                phoneNumber: undefined,
              }),
          },
        },
        {
          accessorKey: 'email',
          header: 'Email Address',
          muiEditTextFieldProps: {
            type: 'email',
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
          accessorKey: 'position',
          header: 'Position',
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.position,
            helperText: validationErrors?.position,
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                position: undefined,
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
      ],
      [validationErrors],
    );

    const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
    const { data: fetchedUsers = [], isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers } = useGetUsers();
    const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
    const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

    const handleCreateUser = async ({ values, table }) => {
      const newValidationErrors = validateUser(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await createUser(values);
      table.setCreatingRow(null);
    };

    const handleSaveUser = async ({ values, table }) => {
      const newValidationErrors = validateUser(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await updateUser(values);
      table.setEditingRow(null);
    };

    const openDeleteConfirmModal = (row) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        deleteUser(row.original.id);
      }
    };

    const table = useMaterialReactTable({
      columns,
      data: fetchedUsers,
      createDisplayMode: 'modal',
      editDisplayMode: 'modal',
      enableEditing: true,
      getRowId: (row) => row.id,
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
      muiToolbarAlertBannerProps: isLoadingUsersError
        ? {
            color: 'error',
            children: 'Error loading data',
          }
        : undefined,
      muiTableContainerProps: {
        sx: {
          minHeight: '500px',
        },
      },
      onCreatingRowCancel: () => setValidationErrors({}),
      onCreatingRowSave: handleCreateUser,
      onEditingRowCancel: () => setValidationErrors({}),
      onEditingRowSave: handleSaveUser,
      renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
        <Box
        sx={{
          bgcolor: colors.grey[800],
          borderRadius: "5px",
        }}
        >
          <DialogTitle variant="h6">
<Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
  <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
            Create New Stakeholder
</Box>
          
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {internalEditComponents}
          </DialogContent>
          <Divider />
          <DialogActions>
            <MRT_EditActionButtons table={table} row={row} />
          </DialogActions>
        </Box>
      ),
      renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
        <Box
        sx={{
          background:`${colors.grey[800]} !important`,
          borderRadius:'5px',
        }}
        >
          <DialogTitle variant="h6">
            <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
              <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
                        Edit Stakeholder
            </Box>
          
          </DialogTitle>
          <Divider/>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {internalEditComponents}
          </DialogContent>
          <Divider/>
          <DialogActions>
            <MRT_EditActionButtons table={table} row={row} />
          </DialogActions>
        </Box>
      ),
      renderRowActions: ({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      renderTopToolbarCustomActions: ({ table }) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            table.setCreatingRow(true);
          }}
        >
          Create New Stakeholder
        </Button>
      ),
      state: {
        isLoading: isLoadingUsers,
        isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
        showAlertBanner: isLoadingUsersError,
        showProgressBars: isFetchingUsers,
      },
    });

    return <MaterialReactTable table={table} />;
  };

  function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.resolve();
      },
      onMutate: (newUserInfo) => {
        queryClient.setQueryData(['users'], (prevUsers) => [
          ...prevUsers,
          {
            ...newUserInfo,
            id: (Math.random() + 1).toString(36).substring(7),
          },
        ]);
      },
    });
  }

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

  function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.resolve();
      },
      onMutate: (newUserInfo) => {
        queryClient.setQueryData(['users'], (prevUsers) =>
          prevUsers?.map((prevUser) =>
            prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
          ),
        );
      },
    });
  }

  function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (userId) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.resolve();
      },
      onMutate: (userId) => {
        queryClient.setQueryData(['users'], (prevUsers) =>
          prevUsers?.filter((user) => user.id !== userId),
        );
      },
    });
  }

  const queryClient = new QueryClient();

  const StakeholdersListingWithProviders = () => (
    <QueryClientProvider client={queryClient}>
      <StakeholdersListing />
    </QueryClientProvider>
  );

  export default StakeholdersListingWithProviders;

  const validateRequired = (value) => !!value.length;
  const validateEmail = (email) =>
    !!email.length &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );

  function validateUser(user) {
    return {
      name: !validateRequired(user.name) ? 'Name is Required' : '',
      phoneNumber: !validateRequired(user.phoneNumber)
        ? 'Phone Number is Required'
        : '',
      email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
      company: !validateRequired(user.company) ? 'Company is Required' : '',
      position: !validateRequired(user.position) ? 'Position is Required' : '',
      source: !validateRequired(user.source) ? 'Source is Required' : '',
      type: !validateRequired(user.type) ? 'Type is Required' : '',
    };
  }
