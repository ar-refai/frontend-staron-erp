import React, { useState, useEffect } from 'react';
import { Box, Button, Divider, Modal, TextField, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import * as XLSX from 'xlsx';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';
import dayjs from 'dayjs';
import { styled, useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 40,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    size: 120,
  }),
  columnHelper.accessor('hr_code', {
    header: 'Employee ID',
    size: 120,
  }),
  columnHelper.accessor('department', {
    header: 'Department',
    size: 150,
  }),
  columnHelper.accessor('salary', {
    header: 'Salary',
    size: 100,
  }),
  columnHelper.accessor('workdays', {
    header: 'Possible Working Days',
    size: 150,
  }),
  columnHelper.accessor('holidays', {
    header: 'Holidays',
    size: 100,
  }),
  columnHelper.accessor('attendance', {
    header: 'Actual Working Days',
    size: 150,
  }),
  columnHelper.accessor('additions', {
    header: 'Additions',
    size: 120,
  }),
  columnHelper.accessor('deductions', {
    header: 'Deductions',
    size: 100,
  }),
  columnHelper.accessor('dailyrate', {
    header: 'Daily Rate',
    size: 100,
  }),
  columnHelper.accessor('paiddays', {
    header: 'Paid Days',
    size: 100,
  }),
  columnHelper.accessor('MedicalInsurance', {
    header: 'Medical Insurance',
    size: 150,
  }),
  columnHelper.accessor('SocialInsurance', {
    header: 'Social Insurance',
    size: 150,
  }),
  columnHelper.accessor('tax', {
    header: 'Tax',
    size: 100,
  }),
  columnHelper.accessor('TotalPay', {
    header: 'Gross Pay',
    size: 100,
  }),
  columnHelper.accessor('TotalLiquidPay', {
    header: 'Total \n Liquid Pay',
    size: 100,
  }),
];

const generateDummyData = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let data = [];
  for (let i = 0; i < 20; i++) {
    const month = months[Math.floor(Math.random() * months.length)];
    data.push({
      id: i + 1,
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
}

const Payroll = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(dayjs());
  const [data, setData] = useState(generateDummyData());
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

    defaultColumn: {
      minSize: 20, //allow columns to get smaller than default
      maxSize: 900, //allow columns to get larger than default
      size: 260, //make columns wider by default
    },
    muiSelectCheckboxProps: {
      color: 'secondary',
    },
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    enableColumnResizing: true,
    initialState: { density: 'comfortable' },

    muiLinearProgressProps: {
      color: 'secondary',
    },
    muiCircularProgressProps: {
      color: 'secondary',
    },
    muiTableContainerProps: { sx: { maxHeight: '800px', backgroundColor: colors.primary[400] } },
    muiTableHeadCellProps: { sx: { backgroundColor: colors.primary[400]},
  },
    muiTableBodyCellProps: { sx: { backgroundColor: colors.primary[400] } },
    muiTableBodyProps: {
      sx: {
        //stripe the rows, make odd rows a darker color
        '& tr:nth-of-type(odd) > td': {
          backgroundColor: colors.primary[500],
        },
      },
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
        {/* <Button
          variant="outlined"
          onClick={() => setShowUploadModal(true)}
          startIcon={<FileDownloadIcon />}

          sx={{
            backgroundColor: colors.greenAccent[400],
            "&:hover" : {
              backgroundColor: colors.greenAccent[300]
            }
          }}
        >
          Import Excel Sheet
        </Button> */}
        <Button
          onClick={handleExportData}
          startIcon={<FileUploadIcon />}
          sx={{
            backgroundColor: colors.greenAccent[400],
            fontWeight:'bold',
            fontSize: '13px',
            "&:hover" : {
              backgroundColor: colors.greenAccent[300]
            }
          }}
        >
          Export Excel Sheet
        </Button>
        
      </Box>
    ),
  });

  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-12 col-md-4">
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
                </div>
              </div>
              <div className="table-responsive">
                <MaterialReactTable table={table} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Upload Excel File */}
      {/* <Modal 
        open={showUploadModal} 
        onClose={() => 
        setShowUploadModal(false)}>
        <Box sx={{ 
          p: 4, 
          bgcolor: colors.primary[600], 
          border:`2px solid ${colors.blueAccent[300]}`, 
          margin: 'auto', 
          mt: 2, 
          width: '500px' ,
          borderRadius: '1px',
          display: 'flex',
          flexDirection: 'column',
              justifyContent: 'center',
          }}>
          <Typography variant="h6" component="h2">
            Upload Your Excel File:
          </Typography>
          <Divider  
          sx={{
            marginBlock:2,
            backgroundColor:colors.blueAccent[300]  
            }} />
          <input
            type="file"
            accept=".xlsx, .xls"
          
            onChange={handleUpload}
          />
          <Divider  
          sx={{
            marginTop:2,
            backgroundColor:colors.blueAccent[300]  
            }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="outlined"
            style={{
              backgroundColor:colors.redAccent[300]
            }}
            onClick={() => setShowUploadModal(false)}>Close</Button>
          </Box>
        </Box>
      </Modal> */}
    </>
  );
};

export default Payroll;
