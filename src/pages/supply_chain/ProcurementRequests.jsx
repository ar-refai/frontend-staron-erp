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
  List,
  Collapse,
  IconButton,
} from "@mui/material";
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { MaterialReactTable } from "material-react-table";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TransitionGroup } from "react-transition-group";
import DeleteIcon from "@mui/icons-material/Delete";
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json"

const ProcurementRequests = () => {
  const [data, setData] = useState([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    priority: '',
    deadline: '',
    time: '',
    from: '',
    to: [],
    description: '',
    status: ''
  });
  const [formErrorData, setFormErrorData] = useState({});
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // Simulated data fetch
    const fetchData = () => {
      // Replace with actual API call or data retrieval logic
      return [
        { id: 1, date: "2024-06-30", priority: "High", deadline: "2024-07-05", time: "10:00", from: "Location A", to: "Location B", description: "Description A", status: "pending control approval" },
        { id: 2, date: "2024-07-01", priority: "Medium", deadline: "2024-07-06", time: "12:00", from: "Location C", to: "Location D", description: "Description B", status: "in progress" },
        { id: 3, date: "2024-07-01", priority: "high", deadline: "2024-07-07", time: "12:00", from: "Location D", to: "Location E", description: "Description B", status: "in progress" },
        { id: 4, date: "2024-07-01", priority: "Medium", deadline: "2024-07-06", time: "12:00", from: "Location C", to: "Location D", description: "Description B", status: "completed" },
        { id: 5, date: "2024-07-01", priority: "high", deadline: "2024-07-07", time: "12:00", from: "Location D", to: "Location E", description: "Description B", status: "in progress" },
        
        // More data...
      ];
    };

    setData(fetchData());
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddToLocation = () => {
    if (formData.to.length < 5) {
      setFormData({
        ...formData,
        to: [...formData.to, ""]
      });
    }
  };

  const handleRemoveToLocation = () => {
    if(formData.to.length === 1 ) 
      return;
    const newToLocations = [...formData.to];
    newToLocations.pop();
    setFormData({
      ...formData,
      to: newToLocations
    });
  };

  const handleToLocationChange = (index, value) => {
    const newToLocations = [...formData.to];
    newToLocations[index] = value;
    setFormData({
      ...formData,
      to: newToLocations
    });
  };

  const handleOpenRequestModal = () => {
    formData.to[0] = "";
    setIsRequestModalOpen(true);
  };

  const handleCloseRequestModal = () => {
    formData.to.length = 1;
    if(formData.to[0])
      formData.to[0] = "";
    setIsRequestModalOpen(false);
    setFormErrorData({});
  };
  
  const handleSubmitRequest = (event) => {
    event.preventDefault();
    if (!formData.priority || !formData.time || !formData.from || !formData.to.length || !formData.description) {
      const errors = {};
      if (!formData.priority) errors.priority = "The Priority is required";
      if (!formData.time) errors.time = "The time is required";
      if (!formData.from) errors.from = "The from location is required";
      if (!formData.to.length) errors.to = "The to location is required";
      if (!formData.description) errors.description = "The description is required";
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
      { accessorKey: "id", header: "ID" },
      { accessorKey: "date", header: "Date" },
      { accessorKey: "priority", header: "Priority" },
      { accessorKey: "deadline", header: "Deadline" },
      { accessorKey: "time", header: "Time" },
      { accessorKey: "from", header: "From" },
      { accessorKey: "to", header: "To" },
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => <Chip label={cell.getValue()} color="primary" />,
      },
    ],
    []
  );

  return (
    <Box m="20px">
      
      <Button variant="outlined" color="secondary" sx={{mb:'10px'}} onClick={handleOpenRequestModal}>
        Request Procurement
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
          elevation: 2, //change the mui box shadow
          //customize paper styles
          sx: {
            borderRadius: "20px",
          },
        }}
        muiTableContainerProps={{ 
          sx: { 
            maxHeight: "600px", 
            backgroundColor: colors.primary[400] 
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

      {/* Request Procurement Dialog */}
      <Dialog
        open={isRequestModalOpen}
        onClose={handleCloseRequestModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" , gap:"10px" , textTransform:"uppercase"}}>
       
<Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
                <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>
            Request Procurement
                </Box>
          </Box>          
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box mb={2}>
            <TextField
              label="Priority"
              name="priority"
              select
              value={formData.priority}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              SelectProps={{ native: true }}
              error={!!formErrorData.priority}
              helperText={formErrorData.priority}
            >
              <option value=""></option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </TextField>
            <TextField
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!formErrorData.time}
              helperText={formErrorData.time}
            />
            <TextField
              label="From"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!formErrorData.from}
              helperText={formErrorData.from}
            />
            {formData.to.map((toLocation, index) => (
              <Box key={index} display="flex" alignItems="center">
                <TextField
                  label={`To Location ${index + 1}`}
                  name="to"
                  value={toLocation}
                  onChange={(e) => handleToLocationChange(index, e.target.value)}
                  fullWidth
                  margin="normal"
                  error={!!formErrorData.to}
                  helperText={formErrorData.to}
                />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  title="Delete"
                  onClick={() => handleRemoveToLocation(index)}
                  sx={{ width: 'auto' }}
                  color='error'
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button variant="outlined" color="secondary" onClick={handleAddToLocation}>
              Add Location
            </Button>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={3}
              error={!!formErrorData.description}
              helperText={formErrorData.description}
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

export default ProcurementRequests;
