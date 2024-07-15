import { useCallback, useMemo, useState, useEffect } from "react";
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
    Typography,
    Avatar,
    Card,
    Divider,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { ShowAllstockData } from "../../apis/SupplyChainApi/StockApi";
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json"


const StockLogs = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'create'
    const [selectedRow, setSelectedRow] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestsFromApi = await ShowAllstockData();
                setTableData(requestsFromApi.data);
            } catch (error) {
                console.error('Error fetching treasury request data:', error);
            }
        };
        console.log("#".repeat(33))
        console.log(tableData)
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

    const handleDeleteRow = (row) => {
        const updatedData = tableData.filter((_, index) => index !== row.index);
        setTableData(updatedData);
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
          { accessorKey: "code", header: "Code", size: 100 },

            { accessorKey: "color", header: "Color", size: 140 },
            { accessorKey: "quantity", header: "Quantity", size: 80 },
            { accessorKey: "category.name", header: "Category"},
            { accessorKey: "unit", header: "Unit", size: 80 },
            { accessorKey: "priceperunit", header: "Price Per Unit", size: 100 },
            { accessorKey: "lastpriceforit", header: "Last Price", size: 100 },
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
                        muiTableHeadCellProps: { align: "center" },
                        size: 120,
                    },
                }}
                columns={columns}
                data={tableData}
                editingMode="modal"
                state={{ isLoading: loading }}
                muiCircularProgressProps={{ color: 'secondary', thickness: 5, size: 55 }}
                muiSkeletonProps={{ animation: 'pulse', height: 28 }}
                muiLinearProgressProps={{ color: 'secondary' }}
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
                muiTablePaperProps={{ elevation: 2, sx: { borderRadius: '20px' } }}
                muiTableContainerProps={{ sx: { maxHeight: '600px', backgroundColor: colors.primary[400] } }}
                muiTableHeadCellProps={{ sx: { backgroundColor: colors.primary[400] } }}
                muiTableBodyCellProps={{ sx: { backgroundColor: colors.primary[400] } }}
                muiTableBodyProps={{ sx: { backgroundColor: colors.primary[400] } }}
                muiBottomToolbarProps={({ table }) => ({ sx: { backgroundColor: colors.primary[400] } })}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => handleOpenModal('edit', row.original)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="left" title="Delete">
                            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                <Delete />
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
                        Add New Request
                    </Button>
                )}
            />

            <TreasuryRequestModal
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

const TreasuryRequestModal = ({ open, mode, onClose, onSubmit, selectedRow, columns }) => {
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
                    bgcolor: colors.grey[800],
                    color: colors.grey[200],
                    border: `1px solid ${colors.greenAccent[500]}`,
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '100%',
                    overflow: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderRadius: '10px'
                }}
            >
                <Typography variant="h6" sx={{ textTransform: "uppercase", fontWeight: 'bold' }} component="h3">
                            
                <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
                <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
                                    {mode === 'edit' ? 'Edit Request' : mode === 'create' ? 'Add New Request' : 'Request Details'}
                </Box>
                </Typography>
                <Divider />
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        {columns.map((column) => (
                            <TextField
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                value={values[column.accessorKey] || ""}
                                onChange={handleInputChange}
                                select={column.muiTableBodyCellEditTextFieldProps?.select}
                                children={column.muiTableBodyCellEditTextFieldProps?.children}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    readOnly: mode === 'view',
                                }}
                            />
                        ))}
                    <Divider />
                    </Stack>
                    {mode !== 'view' && (
                        <DialogActions sx={{ p: '1.25rem' }}>
                            <Button onClick={onClose} color="error" variant="outlined">
                                Cancel
                            </Button>
                            <Button type="submit" color="secondary" variant="outlined">
                                Save
                            </Button>
                        </DialogActions>
                    )}
                </form>
            </Box>
        </Modal>
    );
};

export default StockLogs;
