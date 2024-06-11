    import React, { useCallback, useMemo, useState } from "react";
    import {
        Box,
        Button,
        Chip,
        Collapse,
        DialogActions,
        IconButton,
        MenuItem,
        Modal,
        Stack,
        TextField,
        Tooltip,
        Avatar,
        Card,
        CardActions,
        CardContent,
        Divider,
        Typography,
    } from "@mui/material";
    import { Edit, AccountCircle, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
    import { fakeData as data } from "./makeData"; // Make sure to import other necessary data such as usStates if needed
    import { useTheme } from "@emotion/react";
    import { tokens } from "../../theme";
    import { MaterialReactTable } from "material-react-table";

    const departments = [
        "HR",
        "Technical Office",
        "Sales",
        "Supply Chain",
        "Warehouse",
        "Operation",
        "Carpenter",
        "Solid Surface Factory Worker",
        "Site Engineer",
        "Financial Department",
        "IT",
        "Administration",
        "Buffet",
        "Software Department",
    ];

    const EmployeeList = () => {
        const [modalOpen, setModalOpen] = useState(false);
        const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'create'
        const [selectedRow, setSelectedRow] = useState(null);
        const [tableData, setTableData] = useState(() => data);
        const [validationErrors, setValidationErrors] = useState({});

        const theme = useTheme();
        const colors = tokens(theme.palette.mode);

        const handleCreateNewRow = (values) => {
            tableData.push(values);
            setTableData([...tableData]);
        };

        const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
            try {
                if (!row || !row.index) {
                    throw new Error("Row data is not available.");
                }

                if (!Object.keys(validationErrors).length) {
                    tableData[row.index] = values;
                    setTableData([...tableData]);
                    exitEditingMode();
                }
            } catch (error) {
                console.error("Failed to save row edits:", error);
            }
        };

        const handleCancelRowEdits = () => {
            setValidationErrors({});
        };

        const getCommonEditTextFieldProps = useCallback(
            (cell) => {
                return {
                    error: !!validationErrors[cell.id],
                    helperText: validationErrors[cell.id],
                };
            },
            [validationErrors]
        );

        const columns = useMemo(
            () => [
                {
                    accessorKey: "id",
                    header: "ID",
                    enableColumnOrdering: false,
                    enableEditing: false,
                    enableSorting: false,
                    size: 80,
                },
                {
                    accessorKey: "image",
                    header: "Image",
                    Cell: ({ cell }) => (
                        <img
                            src={cell.getValue()}
                            alt="Employee"
                            style={{ width: "40px", borderRadius: "50%" }}
                        />
                    ),
                },
                {
                    accessorKey: "fullName",
                    header: "Full Name",
                    size: 140,
                    muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                        ...getCommonEditTextFieldProps(cell),
                    }),
                },
                {
                    accessorKey: "department",
                    header: "Department",
                    muiTableBodyCellEditTextFieldProps: {
                        select: true,
                        children: departments.map((department) => (
                            <MenuItem key={department} value={department}>
                                {department}
                            </MenuItem>
                        )),
                    },
                },
                {
                    accessorKey: "jobRole",
                    header: "Job Role",
                    muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                        ...getCommonEditTextFieldProps(cell),
                    }),
                },
                {
                    accessorKey: "status",
                    header: "Status",
                    Cell: ({ cell }) => (
                        <Chip
                            variant="outlined"
                            label={cell.getValue() === "active" ? "Active" : "Inactive"}
                            color={cell.getValue() === "active" ? "info" : "error"}
                            style={{ width: "80px", fontSize: "12px" }}
                        />
                    ),
                    muiTableBodyCellEditTextFieldProps: {
                        select: true,
                        children: ["active", "inactive"].map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        )),
                    },
                },
            ],
            [getCommonEditTextFieldProps]
        );

        const handleOpenModal = (mode, row) => {
            setModalMode(mode);
            setSelectedRow(row);
            setModalOpen(true);
        };

        const handleCloseModal = () => {
            setModalOpen(false);
            setSelectedRow(null);
        };

        return (
            <>
                <MaterialReactTable
    displayColumnDefOptions={{
        "mrt-row-actions": {
            muiTableHeadCellProps: {
                align: "center",
            },
            size: 120,
        },
    }}
    columns={columns}
    data={tableData}
    editingMode="modal"
    enableColumnOrdering
    enableEditing
    enableStickyHeader
    enableStickyFooter
    muiPaginationProps= {{
        color: 'secondary',
        rowsPerPageOptions: [10, 20, 30],
        shape: 'rounded',
        variant: 'outlined',
   }}
    paginationDisplayMode= 'pages'
    onEditingRowSave={handleSaveRowEdits}
    onEditingRowCancel={handleCancelRowEdits}
    muiTablePaperProps={{
        elevation: 2,
        sx: {
            borderRadius: '20px',
        },
    }}
    muiTableContainerProps={{ sx: { maxHeight: '600px', backgroundColor: colors.primary[400] } }}
    muiTableHeadCellProps={{ sx: { backgroundColor: colors.primary[400] } }}
    muiTableBodyCellProps={{ sx: { backgroundColor: colors.primary[400] } }}
    muiTableBodyProps={{ sx: { backgroundColor: colors.primary[400] } }}
    muiBottomToolbarProps={({ table }) => ({
        sx: { backgroundColor: colors.primary[400] },
    })}
    renderRowActions={({ row, table }) => (
        <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Profile">
                <IconButton color="secondary" onClick={() => handleOpenModal('view', row.original)}>
                    <AccountCircle />
                </IconButton>
            </Tooltip>
            <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => handleOpenModal('edit', row.original)}>
                    <Edit />
                </IconButton>
            </Tooltip>
        </Box>
    )}
    renderTopToolbarCustomActions={() => (
        <Button
            sx={{
                color: colors.primary[200], backgroundColor: colors.blueAccent[900],
                '&:hover': {
                    color: colors.primary[800],
                    backgroundColor: colors.primary[100]
                }
            }}
            onClick={() => handleOpenModal('create')}
            variant="contained"
        >
            Onboard New Employee
        </Button>
    )}
/>

                <EmployeeModal
                    open={modalOpen}
                    mode={modalMode}
                    onClose={handleCloseModal}
                    onSubmit={modalMode === 'create' ? handleCreateNewRow : handleSaveRowEdits}
                    selectedRow={selectedRow}
                    columns={columns}
                />
            </>
        );
    };

    const EmployeeModal = ({ open, mode, onClose, onSubmit, selectedRow, columns }) => {
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        const [values, setValues] = useState(() =>
            columns.reduce((acc, column) => {
                acc[column.accessorKey ?? ""] = selectedRow ? selectedRow[column.accessorKey] : "";
                return acc;
            }, {})
        );
        const [expanded, setExpanded] = useState(false);

        const handleExpandClick = () => {
            setExpanded(!expanded);
        };

        const handleInputChange = (e) => {
            setValues({ ...values, [e.target.name]: e.target.value });
        };

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setValues({ ...values, image: reader.result });
                };
                reader.readAsDataURL(file);
            }
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(values);
            onClose();
        };

        return (
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 900,
                        bgcolor: colors.primary[700],
                        color: colors.primary[200],
                        border: `3px solid ${colors.greenAccent[300]}`,
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        borderRadius: '10px'
                    }}
                >
                    <Typography variant="h6" sx={{
                        textTransform: "uppercase",
                        fontWeight: 'bold',
                    }} component="h2">
                        {mode === 'edit' ? 'Edit Employee' : mode === 'create' ? 'Onboard New Employee' : 'Employee Profile'}
                    </Typography>
                    <Box>
                        <Card sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            p: 2,
                            backgroundColor: colors.primary[800]
                        }}>
                            {mode === 'view' ? (
                                <>
                                    <Avatar
                                        alt="Employee Photo"
                                        src={selectedRow?.image}
                                        sx={{ width: 150, height: 150, mb: 2 }}
                                    />
                                    <Typography variant="h5" sx={{
                                        textTransform: "uppercase",
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}>
                                        {selectedRow?.fullName}
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        mt: 2,
                                        mb: 2
                                    }}>
                                        <Typography sx={{ opacity: '75%' }}>
                                            {selectedRow?.department}
                                        </Typography>
                                        <Typography sx={{ opacity: '75%' }}>
                                            {selectedRow?.jobRole}
                                        </Typography>
                                        <Typography sx={{ opacity: '75%' }}>
                                            {selectedRow?.status === 'active' ? 'Active' : 'Inactive'}
                                        </Typography>
                                    </Box>
                                    <CardContent>
                                        <Typography variant="h6" sx={{
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                        }}>
                                            For More Information Expand:
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton
                                            onClick={handleExpandClick}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </CardActions>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <Divider><Chip label="Employee Id:" size="small" /></Divider>
                                            <Typography>{selectedRow?.id}</Typography>
                                            <Divider><Chip label="Full Name:" size="small" /></Divider>
                                            <Typography>{selectedRow?.fullName ? selectedRow?.fullName : "ـــــ"}</Typography>
                                        </CardContent>
                                    </Collapse>
                                </>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <Stack sx={{ width: '100%', gap: '1.5rem' }}>
                                        {columns.map((column) => (
                                            <TextField
                                                key={column.accessorKey}
                                                label={column.header}
                                                name={column.accessorKey}
                                                value={values[column.accessorKey]}
                                                onChange={handleInputChange}
                                                select={column.muiTableBodyCellEditTextFieldProps?.select}
                                                children={column.muiTableBodyCellEditTextFieldProps?.children}
                                            />
                                        ))}
                                        <TextField
                                            type="file"
                                            label="Upload Image"
                                            InputLabelProps={{ shrink: true }}
                                            inputProps={{ accept: "image/*" }}
                                            onChange={handleFileChange}
                                        />
                                    </Stack>
                                    <DialogActions sx={{ p: '1.25rem',display:'flex',justifyContent:'center' }}>
                                        <Button sx={{ color: colors.primary[100], background: colors.blueAccent[600], '&:hover': { color: colors.primary[100], backgroundColor: colors.blueAccent[800] } }} type="submit" variant="contained">
                                            {mode === 'edit' ? 'Save Changes' : 'Onboard Employee'}
                                        </Button>
                                    </DialogActions>
                                </form>
                            )}
                        </Card>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClose}
                        sx={{
                            alignSelf: 'center',
                            backgroundColor: colors.greenAccent[600],
                            "&:hover": {
                                backgroundColor: colors.greenAccent[700],
                            },
                        }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        );
    };

    export default EmployeeList;
