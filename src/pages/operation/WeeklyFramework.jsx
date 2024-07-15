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
  Divider,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import Lottie from 'lottie-react';
import Document from "../../assets/lottie/document.json"

const WeeklyFramework = () => {
  const [data, setData] = useState([]);
  const [isActualModalOpen, setIsActualModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [file, setFile] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // Simulated data fetch
    const fetchData = () => {
      // Replace with actual API call or data retrieval logic
      return [
        {
          id: 1,
          Date: "2024-06-30",
          Plan: { link: "/path/to/plan1.pdf", label: "Plan A" },
          Actual: { link: "/path/to/actual1.pdf", label: "Actual A" },
        },
        {
          id: 2,
          Date: "2024-07-01",
          Plan: { link: "/path/to/plan2.pdf", label: "Plan B" },
          Actual: { link: "/path/to/actual2.pdf", label: "Actual B" },
        },
        {
          id: 3,
          Date: "2024-07-02",
          Plan: { link: "/path/to/plan3.pdf", label: "Plan C" },
          Actual: { link: "/path/to/actual3.pdf", label: "Actual C" },
        },
      ];
    };

    setData(fetchData());
  }, []);

  const handleEditActual = (row) => {
    // Implement edit actual functionality here
    console.log("Edit Actual for row:", row);
  };

  const handleOpenActualModal = (row) => {
    setSelectedRow(row);
    setIsActualModalOpen(true);
  };

  const handleCloseActualModal = () => {
    setSelectedRow(null);
    setIsActualModalOpen(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmitActual = () => {
    // Implement submit actual functionality here
    console.log("Submit actual for row:", selectedRow);
    console.log("File:", file);
    handleCloseActualModal();
  };

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "Date", header: "Date" },
      {
        accessorKey: "Plan",
        header: "Plan",
        Cell: ({ row }) => (
          <a href={row.original.Plan.link} target="_blank" rel="noopener noreferrer">
            {row.original.Plan.label}
          </a>
        ),
      },
      {
        accessorKey: "Actual",
        header: "Actual",
        Cell: ({ row }) => (
          <a href={row.original.Actual.link} target="_blank" rel="noopener noreferrer">
            {row.original.Actual.label}
          </a>
        ),
      },
      {
        accessorKey: "Action",
        header: "Action", 
        Cell: ({ row }) => (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleOpenActualModal(row)}
          >
            edit actual
          </Button>
        ),
      },
    ],
    [data]
  );

  return (
    <Box m="20px">
      {/* Upload Plan Button */}
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<CloudUploadIcon />}
        onClick={() => setIsActualModalOpen(true)}
        sx={{ marginBottom: "20px" }}
      >
        Upload Actual
      </Button>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableFacetedValues={true}
        enableStickyHeader={true}
        columnFilterDisplayMode="popover"
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
            backgroundColor: "#f0f0f0", // Change table background color
          },
        }}
        muiTableContainerProps={{
          sx: {
            maxHeight: "600px",
            backgroundColor: colors.primary[400] , // Change table background color
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            backgroundColor: colors.primary[400] 
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            backgroundColor: colors.primary[400] 
          },
        }}
        muiTableBodyProps={{
          sx: {
            backgroundColor: colors.primary[400] 
          },
        }}
        muiBottomToolbarProps={({ table }) => ({
          sx: {
            backgroundColor: colors.primary[400] 
          },
        })}
      />

      {/* Plan Modal */}
      <Dialog
        open={isActualModalOpen}
        onClose={handleCloseActualModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle> 
          
<Box sx={{display:"flex" , flexDirection:"row"  , alignItems:"center" ,gap:"10px" , textTransform:"uppercase"}}>
                <Lottie style={{width:'30px',display:'flex' }} animationData={Document}/>

          Edit Actual 
                </Box>


        </DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            label="Plan"
            defaultValue={selectedRow ? selectedRow.original.Plan.label : ""}
            variant="outlined"
            fullWidth
            margin="normal"
            disabled
          />
          <Button
            component="label"
            variant="outlined"
            color="secondary"
            fullWidth
          >
            Upload Actual File (Optional)
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleCloseActualModal} color="error" variant="outlined">
            Close
          </Button>
          <Button onClick={handleSubmitActual} color="secondary" variant="outlined">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WeeklyFramework;
