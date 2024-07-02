import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
    Box,
    Button,
    Chip,
    DialogActions,
    IconButton,
    MenuItem,
    Modal,
    Stack,
    TextField,
    Tooltip,
    Avatar,
    Card,
    Divider,
    Typography,
} from "@mui/material";
import { Edit, AccountCircle } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { MaterialReactTable } from "material-react-table";
import { ShowAllSupplyerData } from "../../apis/SupplyChainApi/SupplyerApi";

const SuppliersListing = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'create'
    const [selectedRow, setSelectedRow] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const suppliersFromApi = await ShowAllSupplyerData();
                setTableData(suppliersFromApi.data);
            } catch (error) {
                console.error('Error fetching suppliers data:', error);
                // Handle error if necessary
            }
        };

        fetchData();
        const interval = setInterval(() => {
            setLoading(false);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    console.log(tableData);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleCreateNewRow = (values) => {
        tableData.push(values);
        setTableData([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        try {
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
                accessorKey: "name",
                header: "Name",
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: "phone",
                header: "Phone Number",
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: "company",
                header: "Company",
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: "location",
                header: "Location",
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: "source",
                header: "Source",
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: "additondata",
                header: "Addition",
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: "Job_role",
                header: "Job Role",
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
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
                state={{ isLoading: loading }}
                muiCircularProgressProps={{
                    color: 'secondary',
                    thickness: 5,
                    size: 55,
                }}
                muiSkeletonProps={{
                    animation: 'pulse',
                    height: 28,
                }}
                muiLinearProgressProps={{
                    color: 'secondary',
                }}
                enableColumnOrdering
                enableEditing
                enableStickyHeader
                enableStickyFooter
                muiPaginationProps={{
                    color: 'secondary',
                    rowsPerPageOptions: [10, 20, 30],
                    shape: 'rounded',
                    variant: 'outlined',
                }}
                paginationDisplayMode='pages'
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
                        onClick={() => handleOpenModal('create')}
                        variant="outlined"
                        color="secondary"
                    >
                        Add Supplier
                    </Button>
                )}
            />

            <SupplierModal
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

const SupplierModal = ({ open, mode, onClose, onSubmit, selectedRow, columns }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ""] = selectedRow ? selectedRow[column.accessorKey] : "";
            return acc;
        }, {})
    );

    useEffect(() => {
        if (selectedRow) {
            const newValues = columns.reduce((acc, column) => {
                acc[column.accessorKey ?? ""] = selectedRow[column.accessorKey] ?? "";
                return acc;
            }, {});
            setValues(newValues);
        }
    }, [selectedRow, columns]);

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
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
                    width: 600,
                    bgcolor: colors.primary[700],
                    color: colors.primary[200],
                    border: `3px solid ${colors.greenAccent[300]}`,
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '10px',
                }}
            >
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    {mode === 'create' ? "Add Supplier" : mode === 'edit' ? "Edit Supplier" : "Supplier Profile"}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        {columns.map((column) => (
                            column.accessorKey !== 'id' && (
                                <TextField
                                    key={column.accessorKey}
                                    name={column.accessorKey}
                                    label={column.header}
                                    value={values[column.accessorKey] ?? ""}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        readOnly: mode === 'view',
                                    }}
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    color='secondary'
                                />
                            )
                        ))}
                    </Stack>

                    <DialogActions sx={{ mt: 2 }}>
                        <Button onClick={onClose} variant="outlined" color="secondary">
                            {mode === 'view' ? "Close" : "Cancel"}
                        </Button>
                        {mode !== 'view' && (
                            <Button type="submit" variant="contained" color="secondary">
                                {mode === 'create' ? "Add" : "Save"}
                            </Button>
                        )}
                    </DialogActions>
                </form>
            </Box>
        </Modal>
    );
};

export default SuppliersListing;
