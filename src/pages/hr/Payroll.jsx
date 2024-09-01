import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import * as XLSX from 'xlsx';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import dayjs from 'dayjs';
import { tokens } from '../../theme';
import { ShowAllPayroll } from 'apis/HumanRecourse/Payroll';
import styled from '@emotion/styled';




const Payroll = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(dayjs());
  const [data, setData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  // Customized Item
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? colors.primary[500] : colors.primary[200],
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const columns = useMemo(
    () => [
      { accessorKey: 'user.name', header: 'Name' },
      {
        accessorKey: 'user.hr_code',
        header: 'Employee ID',
        size: 120,
      },
      {
        accessorKey: 'user.department',
        header: 'Department',
        size: 200,
      },
      {
        accessorKey: 'user.salary',
        header: 'Salary' 
      },
      {
        accessorKey: 'workdays',
        header: 'Possible Working Days',
        size: 200,
      },
      {
        accessorKey: 'holidays',
        header: 'Holidays',
        size: 200,
      },
      {
        accessorKey: 'attendance',
        header: 'Actual Working Days',
        size: 200,
      },
      {
        accessorKey: 'additions',
        header: 'Additions',
        size: 120,
      },
      {
        accessorKey: 'deductions',
        header: 'Deductions',
        size: 200,
      },
      {
        accessorKey: 'dailyrate',
        header: 'Daily Rate',
        size: 200,
      },
      {
        accessorKey: 'paiddays',
        header: 'Paid Days',
        size: 200,
      },
      {
        accessorKey: 'MedicalInsurance',
        header: 'Medical Insurance',
        size: 200,
      },
      {
        accessorKey: 'SocialInsurance',
        header: 'Social Insurance',
        size: 200,
      },
      { accessorKey: 'tax', header: 'Tax' },
      {
        accessorKey: 'TotalPay',
        header: 'Gross Pay',
        size: 200,
      },
      {
        accessorKey: 'TotalLiquidPay',
        header: 'Total \n Liquid Pay',
        size: 200,
      },
    ],
    []
  );

  useEffect(() => {
    const today = dayjs();
    showAllPayrollRecords(today);
    setSearchQuery(today);
  }, []);

  const showAllPayrollRecords = async (date) => {
    try {
      const formattedDate = date.format('YYYY-MM');
      const response = await ShowAllPayroll({ date: formattedDate });
      console.log(response);
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        // Check if response.data is an array
        const payrollData = Array.isArray(response.data) ? response.data : [];
        setData(payrollData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleExportData = () => {
    // Prepare data with additional Name column for Excel export
    const exportData = data.map((row) => ({
      Name: row.user.name,
      'Employee ID': row.user.hr_code,
      Department: row.user.department,
      Salary: row.user.salary,
      'Possible Working Days': row.workdays,
      Holidays: row.holidays,
      'Actual Working Days': row.attendance,
      Additions: row.additions,
      Deductions: row.deductions,
      'Daily Rate': row.dailyrate,
      'Paid Days': row.paiddays,
      'Medical Insurance': row.MedicalInsurance,
      'Social Insurance': row.SocialInsurance,
      Tax: row.tax,
      'Gross Pay': row.TotalPay,
      'Total Liquid Pay': row.TotalLiquidPay,
    }));

    // Add summary row for the selected department
    const summaryRow = {
      Name: 'Total',
      'Employee ID': '',
      Department: selectedDepartment,
      Salary: '',
      'Possible Working Days': '',
      Holidays: '',
      'Actual Working Days': '',
      Additions: '',
      Deductions: '',
      'Daily Rate': '',
      'Paid Days': '',
      'Medical Insurance': calculateTotal('MedicalInsurance'),
      'Social Insurance': calculateTotal('SocialInsurance'),
      Tax: calculateTotal('tax'),
      'Gross Pay': calculateTotal('TotalPay'),
      'Total Liquid Pay': calculateTotal('TotalLiquidPay'),
    };

    exportData.push(summaryRow);

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PayrollData');
    XLSX.writeFile(workbook, 'PayrollData.xlsx');
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
    showAllPayrollRecords(newValue);
  };

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    const newFilteredData = data.filter((row) => row.user.department === department);
    setFilteredData(newFilteredData);
  };

  // General function to calculate totals for different fields
  const calculateTotal = useCallback(
    (field) => {
      const total = filteredData.reduce(
        (sum, row) => sum + parseFloat(row[field] || 0),
        0
      );
      return Math.floor(total).toLocaleString();
    },
    [filteredData]
  );

  const calculateTotalLiquidPay = useCallback(() => {
    return calculateTotal('TotalLiquidPay');
  }, [calculateTotal]);

  const calculateTotalGrossPay = useCallback(() => {
    return calculateTotal('TotalPay');
  }, [calculateTotal]);

  const calculateTotalTax = useCallback(() => {
    return calculateTotal('tax');
  }, [calculateTotal]);

  const calculateTotalSocialInsurance = useCallback(() => {
    return calculateTotal('SocialInsurance');
  }, [calculateTotal]);

  const calculateTotalMedicalInsurance = useCallback(() => {
    return calculateTotal('MedicalInsurance');
  }, [calculateTotal]);

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    muiSelectCheckboxProps: {
      color: 'secondary',
    },
    enableColumnFilterModes: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
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
    muiTableContainerProps: {
      sx: { maxHeight: '600px', backgroundColor: colors.primary[400], overflowX: 'auto' },
    },
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
        <Box sx={{display:"flex", justifyContent:"start", alignItems:"end", gap:'20px'}}>

        {/* Department select input for total liquid pay */}
        <FormControl variant="filled" sx={{ minWidth: 200, marginTop: 2 }}>
          <InputLabel id="department-select-label">Department</InputLabel>
          <Select
            labelId="department-select-label"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: colors.primary[200],
              },
              '& .MuiOutlinedInput-root': {
                '&:hover > fieldset': {
                  borderColor: colors.redAccent[200],
                },
              },
              '& .MuiSvgIcon-root': {
                color: colors.redAccent[400],
              },
              '& .MuiFilledInput-root:before': {
                borderBottomColor: colors.redAccent[300],
              },
              '& .MuiFilledInput-root:after': {
                borderBottomColor: colors.redAccent[300],
              },
              '& .MuiFilledInput-root:hover:not(.Mui-disabled):before': {
                borderBottomColor: colors.redAccent[300],
              },
            }}
          >
            {/* Check if data is an array before mapping */}
            {Array.isArray(data) &&
              [...new Set(data.map((row) => row.user.department))].map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={'Month and Year'}
            views={['month', 'year']}
            value={searchQuery}
            onChange={handleMonthChange}
            slots={{
              textField: (params) => <TextField {...params} variant='filled' size='medium' />,
            }}
            sx={{
              '& .MuiInputLabel-root.Mui-focused': {
                color: colors.primary[200],
              },
              '& .MuiOutlinedInput-root': {
                '&:hover > fieldset': {
                  borderColor: colors.primary[200],
                },
              },
              '& .MuiSvgIcon-root': {
                color: colors.redAccent[400],
              },
              '& .MuiFilledInput-root:before': {
                borderBottomColor: colors.redAccent[300],
              },
              '& .MuiFilledInput-root:after': {
                borderBottomColor: colors.redAccent[300],
              },
              '& .MuiFilledInput-root:hover:not(.Mui-disabled):before': {
                borderBottomColor: colors.redAccent[300],
              },
            }}
            />
        </LocalizationProvider>
        </Box>

        <Stack direction={"row"} justifyContent={"space-between"}  spacing={2} mt={2} mb={2}>
          <Item>
            <Typography variant="h6">
              Total Liquid Pay for {selectedDepartment}: EGP {calculateTotalLiquidPay()}
            </Typography>
          </Item>

          <Item>
            <Typography variant="h6">
              Total Gross Pay for {selectedDepartment}:  EGP {calculateTotalGrossPay()}
            </Typography>
          </Item>

          <Item>
            <Typography variant="h6">
              Total Tax for {selectedDepartment}: EGP {calculateTotalTax()}
            </Typography>
          </Item>
          <Item>

            <Typography variant="h6">
              Total Social Insurance for {selectedDepartment}: EGP {calculateTotalSocialInsurance()}
            </Typography>
          </Item>
          <Item>
{/* some random comment 22222 */}
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Total Medical Insurance for {selectedDepartment}: EGP {calculateTotalMedicalInsurance()}
            </Typography>
          </Item>
        </Stack>

        <MaterialReactTable table={table} />
      </Box>

      <Dialog open={showUploadModal} onClose={() => setShowUploadModal(false)}>
        <DialogTitle>Upload Your Excel File</DialogTitle>
        <Divider sx={{ backgroundColor: colors.blueAccent[300] }} />
        <DialogContent sx={{ color: colors.grey[200], paddingBlock: '20px' }}>
          <input type='file' accept='.xlsx, .xls' onChange={handleUpload} />
        </DialogContent>
        <Divider sx={{ backgroundColor: colors.blueAccent[300] }} />
        <DialogActions>
          <Button
            variant='outlined'
            style={{
              backgroundColor: colors.redAccent[300],
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
