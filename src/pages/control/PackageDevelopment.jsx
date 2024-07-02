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
} from "@mui/material";
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { MaterialReactTable } from "material-react-table";
import ControlRfASB from "components/RequestAsBuilt"; // Assuming ControlRfASB is in the same directory
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const PackageDevelopment = () => {
  const [data, setData] = useState([]);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [descriptionData, setDescriptionData] = useState({});
  const [isTechnicalRFQModalOpen, setIsTechnicalRFQModalOpen] = useState(false);
  const [applications, setApplications] = useState([
    {
      title: "",
      items: [
        { name: "", stockCode: "", price: "", quantity: "", description: "" },
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isAsBuiltModalOpen, setIsAsBuiltModalOpen] = useState(false); // State for controlling As-Built modal
  const [selectedRow, setSelectedRow] = useState(null); // State to store selected row for As-Built request
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false); // State for controlling file upload dialog
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {

    // Simulated data fetch
    const fetchData = () => {
      // Replace with actual API call or data retrieval logic
      return [
        {
          id: 1,
          clientName: "Client A",
          location: "Location A",
          date: "2024-06-30",
          status: "requested",
          asBuiltDate: "",
        },
        {
          id: 2,
          clientName: "Client B",
          location: "Location B",
          date: "2024-07-01",
          status: "pending planning cost",
          asBuiltDate: "",
        },
        {
          id: 3,
          clientName: "Client C",
          location: "Location C",
          date: "2024-07-02",
          status: "planning and cost in progress",
          asBuiltDate: "",
        },
        {
          id: 4,
          clientName: "Client D",
          location: "Location D",
          date: "2024-06-30",
          status: "technical package in progress",
          asBuiltDate: "",
        },
        {
          id: 5,
          clientName: "Client E",
          location: "Location E",
          date: "2024-06-30",
          status: "pending planing and cost",
          asBuiltDate: "",
        },
      ];
    };

    setData(fetchData());
  }, []);

  const handleAsBuiltRequest = (row) => {
    // Open As-Built modal and set selected row
    setIsAsBuiltModalOpen(true);
    setSelectedRow(row);
  };

  const handleCloseAsBuiltModal = () => {
    // Close As-Built modal
    setIsAsBuiltModalOpen(false);
    setSelectedRow(null);
  };

  const handleStart = (row) => {
    // Handle start action
    console.log("Start planning and cost for row:", row.original);
  };

  const handleOpenUploadDialog = (row) => {
    // Open file upload dialog
    setIsUploadDialogOpen(true);
    setSelectedRow(row);
  };

  const handleCloseUploadDialog = () => {
    // Close file upload dialog
    setIsUploadDialogOpen(false);
    setSelectedRow(null);
  };

  const handleFileChange1 = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleFileChange2 = (event) => {
    setFile2(event.target.files[0]);
  };

  const handleSubmitFiles = () => {
    // Handle submit files action
    console.log("Submit files for row:", selectedRow.original);
    console.log("File 1:", file1);
    console.log("File 2:", file2);
    handleCloseUploadDialog();
  };

  const columns = useMemo(
    () => [
      { accessorKey: "clientName", header: "Client Name" },
      { accessorKey: "location", header: "Location" },
      { accessorKey: "date", header: "Date" },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => <Chip label={cell.getValue()} color="primary" />,
      },
      { accessorKey: "asBuiltDate", header: "As-Built Date" },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            {row.original.status === "requested" && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleAsBuiltRequest(row)}
              >
                Request As-Built
              </Button>
            )}
            {row.original.status === "pending planning cost" && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleStart(row)}
              >
                Start
              </Button>
            )}
            {row.original.status === "planning and cost in progress" && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleOpenUploadDialog(row)}
              >
                Submit
              </Button>
            )}
          </Box>
        ),
      },
    ],
    [data, file1, file2]
  );

  return (
    <Box m="20px">
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

      {/* As-Built Request Dialog */}
      <Dialog
        open={isAsBuiltModalOpen}
        onClose={handleCloseAsBuiltModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Request As-Built</DialogTitle>
        <Divider />
        <DialogContent>
          {selectedRow && <ControlRfASB id={selectedRow.original.id} />}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            onClick={handleCloseAsBuiltModal}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* File Upload Dialog */}
      <Dialog
        open={isUploadDialogOpen}
        onClose={handleCloseUploadDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Submit Files</DialogTitle>
        <Divider />
        <DialogContent>
          <Box mb={2}>
            <Button
              component="label"
              variant="contained"
              color="secondary"
              
              fullWidth
            >
              <Box sx={{color:colors.primary[500], display:'flex', justifyContent:"center",alignItems:"center",gap:"5px" }} >
              <CloudUploadIcon /> 
              <Typography>
              Upload File 1
              </Typography>
              </Box>
              <input type="file" hidden onChange={handleFileChange1} />
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              component="label"
              variant="contained"
              color="secondary"
              fullWidth
            >
              <Box sx={{color:colors.primary[500], display:'flex', justifyContent:"center",alignItems:"center",gap:"5px" }} >
              <CloudUploadIcon /> 
              <Typography>
              Upload File 2
              </Typography>
              </Box>
              <input type="file" hidden onChange={handleFileChange2} />
            </Button>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            onClick={handleCloseUploadDialog}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitFiles}
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PackageDevelopment;
