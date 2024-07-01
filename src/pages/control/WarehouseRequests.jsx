import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Chip,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { MaterialReactTable } from "material-react-table";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TransitionGroup } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";

const WarehouseRequests = () => {
  const [data, setData] = useState([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    stockCode: '',
    type: '',
    quantity: '',
    source: '',
    cost: '',
    note: '',
    date: '',
  });
  const [formErrorData, setFormErrorData] = useState({});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // Simulated data fetch
    const fetchData = () => {
      // Replace with actual API call or data retrieval logic
      return [
        { id: 1, stockCode: "SC001", type: "Type A", quantity: 10, source: "Source A", cost: 100, note: "Note A", status: "pending", date: "2024-07-05" },
        { id: 2, stockCode: "SC002", type: "Type B", quantity: 20, source: "Source B", cost: 200, note: "Note B", status: "in progress", date: "2024-07-06" },
        // More data...
      ];
    };

    setData(fetchData());
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenRequestModal = () => {
    setIsRequestModalOpen(true);
  };

  const handleCloseRequestModal = () => {
    setIsRequestModalOpen(false);
    setFormErrorData({});
  };

  const handleSubmitRequest = (event) => {
    event.preventDefault();
    // Validation logic
    if (!formData.stockCode || !formData.type || !formData.quantity || !formData.source || !formData.cost || !formData.note || !formData.date) {
      const errors = {};
      if (!formData.stockCode) errors.stockCode = "Stock Code is required";
      if (!formData.type) errors.type = "Type is required";
      if (!formData.quantity) errors.quantity = "Quantity is required";
      if (!formData.source) errors.source = "Source is required";
      if (!formData.cost) errors.cost = "Cost is required";
      if (!formData.note) errors.note = "Note is required";
      if (!formData.date) errors.date = "Date is required";
      setFormErrorData(errors);
    } else {
      setFormErrorData({});
      // Handle form submission
      console.log("Form submitted:", formData);
      handleCloseRequestModal();
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "#" },
      { accessorKey: "stockCode", header: "Stock Code", editable: true },
      { accessorKey: "type", header: "Type", editable: true },
      { accessorKey: "quantity", header: "Quantity", editable: true },
      { accessorKey: "source", header: "Source", editable: true },
      { accessorKey: "cost", header: "Cost", editable: true },
      { accessorKey: "note", header: "Note", editable: true },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "date", header: "Date" },
    ],
    []
  );

  return (
    <Box m="20px">
      <Button variant="outlined" color="secondary" sx={{ mb: '10px' }} onClick={handleOpenRequestModal}>
        Warehouse Request
      </Button>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableFacetedValues={true}
        enableStickyHeader={true}
        columnFilterDisplayMode="popover"
        muiSkeletonProps={{
          animation: "wave",
        }}
        muiLinearProgressProps={{
          color: "secondary",
        }}
        muiCircularProgressProps={{
          color: "secondary",
        }}
        initialState={{
          showColumnFilters: true,
          showGlobalFilter: true,
        }}
        paginationDisplayMode="pages"
        positionToolbarAlertBanner="bottom"
        muiSearchTextFieldProps={{
          size: "small",
          variant: "outlined",
        }}
        muiPaginationProps={{
          color: "secondary",
          rowsPerPageOptions: [10, 20, 30],
          shape: "rounded",
          variant: "outlined",
        }}
        muiTablePaperProps={{
          elevation: 2,
          sx: {
            borderRadius: "20px",
          },
        }}
        muiTableContainerProps={{
          sx: {
            maxHeight: "600px",
            backgroundColor: colors.primary[400],
          }
        }}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: colors.primary[400]
          }
        }}
        muiTableBodyCellProps={{
          sx: {
            backgroundColor: colors.primary[400]
          }
        }}
        muiTableBodyProps={{
          sx: {
            backgroundColor: colors.primary[400]
          }
        }}
        muiBottomToolbarProps={({ table }) => ({
          sx: {
            backgroundColor: colors.primary[400]
          },
        })}
      />

      {/* Warehouse Request Dialog */}
      <Dialog
        open={isRequestModalOpen}
        onClose={handleCloseRequestModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
            Warehouse Request
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box mb={2}>
            <TextField
              label="Stock Code"
              name="stockCode"
              value={formData.stockCode}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!formErrorData.stockCode}
              helperText={formErrorData.stockCode}
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!formErrorData.quantity}
              helperText={formErrorData.quantity}
            />
            <TextField
              label="Source"
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!formErrorData.source}
              helperText={formErrorData.source}
            />
            <TextField
              label="Cost"
              name="cost"
              type="number"
              value={formData.cost}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!formErrorData.cost}
              helperText={formErrorData.cost}
            />
            <TextField
              label="Note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={3}
              error={!!formErrorData.note}
              helperText={formErrorData.note}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                onChange={handleInputChange}
                name="type"
                label="Type"
                error={!!formErrorData.type}
              >
                <MenuItem value="">Choose...</MenuItem>
                <MenuItem value="Type A">Type A</MenuItem>
                <MenuItem value="Type B">Type B</MenuItem>
                <MenuItem value="Type C">Type C</MenuItem>
              </Select>
              {formErrorData.type && <Typography variant="caption" color="error">{formErrorData.type}</Typography>}
            </FormControl>
            
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!formErrorData.date}
              helperText={formErrorData.date}
            />
          </Box>

        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleCloseRequestModal} color="error" variant="outlined">Close</Button>
          <Button onClick={handleSubmitRequest} color="secondary" variant="outlined">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WarehouseRequests;
