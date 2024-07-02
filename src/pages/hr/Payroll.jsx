import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography, useTheme } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import * as XLSX from 'xlsx';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import dayjs from 'dayjs';
import { tokens } from '../../theme';

const generateDummyData = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let data = [];
  for (let i = 0; i < 20; i++) {
    const month = months[Math.floor(Math.random() * months.length)];
    data.push({
      name: `Employee ${i + 1}`,
      hr_code: `E00${i + 1}`,
      department: 'IT',
      salary: Math.floor(Math.random() * 5000) + 4000,
      workdays: 22,
      holidays: Math.floor(Math.random() * 5),
      attendance: 20,
      additions: Math.floor(Math.random() * 1000),
      deductions: Math.floor(Math.random() * 500),
      dailyrate: 200,
      paiddays: 20,
      MedicalInsurance: 200,
      SocialInsurance: 300,
      tax: 400,
      TotalPay: 5700,
      TotalLiquidPay: 48900,
      month: month
    });
  }
  return data;
};

const Payroll = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(dayjs());
  const [data, setData] = useState(generateDummyData());
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "hr_code",
        header: "Employee ID",
        size: 120,
      },
      {
        accessorKey: "department",
        header: "Department",
        size: 200,
      },
      { accessorKey: "salary", header: "Salary"},
      {
        accessorKey: "workdays",
        header: "Possible Working Days",
        size: 200,
      },
      {
        accessorKey: "holidays",
        header: "Holidays",
        size: 200,
      },
      {
        accessorKey: "attendance",
        header: "Actual Working Days",
        size: 200,
      },
      {
        accessorKey: "additions",
        header: "Additions",
        size: 120,
      },
      {
        accessorKey: "deductions",
        header: "Deductions",
        size: 200,
      },
      {
        accessorKey: "dailyrate",
        header: "Daily Rate",
        size: 200,
      },
      {
        accessorKey: "paiddays",
        header: "Paid Days",
        size: 200,
      },
      {
        accessorKey: "MedicalInsurance",
        header: "Medical Insurance",
        size: 200,
      },
      {
        accessorKey: "SocialInsurance",
        header: "Social Insurance",
        size: 200,
      },
      { accessorKey: "tax", header: "Tax" },
      {
        accessorKey: "TotalPay",
        header: "Gross Pay",
        size: 200,
      },
      {
        accessorKey: "TotalLiquidPay",
        header: "Total \n Liquid Pay",
        size: 200,
      },
    ],
    []
  );

  useEffect(() => {
    const today = dayjs();
    setSearchQuery(today);
  }, []);

  const handleExportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "PayrollData.xlsx");
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
      setShowUploadModal(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleMonthChange = (newValue) => {
    setSearchQuery(newValue);
    const filteredData = generateDummyData().filter(item => item.month === newValue.format('MMMM'));
    setData(filteredData);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    muiSelectCheckboxProps: {
      color: 'secondary',
    },
    enableColumnFilterModes:true,
    enableColumnPinning:true,
    enableFacetedValues:true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    enableColumnResizing: true,
    initialState: { density: 'spacious' },
    enableStickyHeader: true,
    muiLinearProgressProps: {
      color: 'secondary',
    },
    muiCircularProgressProps: {
      color: 'secondary',
    },
    muiTablePaperProps: {
      elevation: 2,
      sx: {
        borderRadius: '20px',
      },
    },
    muiTableContainerProps: { sx: { maxHeight: '600px', backgroundColor: colors.primary[400], overflowX: 'auto' } },
    muiTableHeadCellProps: { sx: { backgroundColor: colors.primary[400] } },
    muiTableBodyCellProps: { sx: { backgroundColor: colors.primary[400] } },
    muiTableBodyProps: { sx: { backgroundColor: colors.primary[400] } },
    muiBottomToolbarProps: ({ table }) => ({
      sx: { backgroundColor: colors.primary[400] },
    }),
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          onClick={handleExportData}
          startIcon={<FileUploadIcon />}
          variant='outlined'
          color='secondary'
          sx={{
            fontWeight: 'bold',
            fontSize: '13px',
          
          }}
        >
          Export Excel Sheet
        </Button>
      </Box>
    ),
  });

  return (
    <>
      <Box sx={{ padding: '16px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={'Month and Year'}
            views={['month', 'year']}
            value={searchQuery}
            onChange={handleMonthChange}
            slots={{
              textField: (params) => <TextField {...params} variant="filled" size="small" />
            }}
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.primary[200],
              },
              "& .MuiOutlinedInput-root": {
                "&:hover > fieldset": {
                  borderColor: colors.primary[200]
                },
              },
              "& .MuiSvgIcon-root": {
                color: colors.redAccent[400]
              },
              "& .MuiFilledInput-root:before": {
                borderBottomColor: colors.redAccent[300],
              },
              "& .MuiFilledInput-root:after": {
                borderBottomColor: colors.redAccent[300],
              },
              "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                borderBottomColor: colors.redAccent[300],
              },
            }}
          />
        </LocalizationProvider>

        <MaterialReactTable table={table} />
      </Box>

      <Dialog open={showUploadModal} onClose={() => setShowUploadModal(false)}>
        <DialogTitle>Upload Your Excel File</DialogTitle>
        <Divider sx={{ backgroundColor: colors.blueAccent[300] }} />
        <DialogContent sx={{ color: colors.grey[200], paddingBlock: '20px' }}>
          <input type="file" accept=".xlsx, .xls" onChange={handleUpload} />
        </DialogContent>
        <Divider sx={{ backgroundColor: colors.blueAccent[300] }} />
        <DialogActions>
          <Button
            variant="outlined"
            style={{
              backgroundColor: colors.redAccent[300]
            }}
            onClick={() => setShowUploadModal(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Payroll;

