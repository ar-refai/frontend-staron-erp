// Payroll.js
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { tokens } from '../../theme';
import { ShowAllPayroll } from 'apis/HumanRecourse/Payroll';
import { PayrollColumns } from './Payroll Components/PayrollColumns';
import PayrollFilters from './Payroll Components/PayrollFilters';
import PayrollTotals from './Payroll Components/PayrollTotals';
import PayrollActions from './Payroll Components/PayrollActions';
import PayrollTable from './Payroll Components/PayrollTable';
import PayrollReviewModal from './Payroll Components/PayrollReviewModal';
import * as XLSX from 'xlsx';

const Payroll = () => {
  // Status wall starts here
  const [searchQuery, setSearchQuery] = useState(dayjs());
  const [data, setData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [totals, setTotals] = useState({
    totalLiquidPayment: 0,
    totalGrossPayment: 0,
    totalTaxPayment: 0,
    totalMedicalInsurancePayment: 0,
    totalSocialInsurancePayment: 0,
  });
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // Get the columns from outer file 
  const columns = PayrollColumns();

  // Fetch data and set search to today 
  useEffect(() => {
    const today = dayjs();
    fetchPayrollRecords(today);
    setSearchQuery(today);
  }, []);

  // fetching data 
  const fetchPayrollRecords = async (date) => {
    try {
      const formattedDate = date.format('YYYY-MM');
      const response = await ShowAllPayroll({ date: formattedDate });
      if ([200, 201, 204].includes(response.status)) {
        const payrollData = Array.isArray(response.data) ? response.data : [];
        setData(payrollData);
        setFilteredData(payrollData);
        calculateTotals(payrollData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // calculate totals 
  const calculateTotals = (payrollData) => {
    const totalLiquidPay = payrollData.reduce(
      (total, payroll) => total + parseFloat(payroll.TotalLiquidPay || 0),
      0
    );
    const totalGrossPay = payrollData.reduce(
      (total, payroll) => total + parseFloat(payroll.TotalPay || 0),
      0
    );
    const totalTax = payrollData.reduce(
      (total, payroll) => total + parseFloat(payroll.tax || 0),
      0
    );
    const totalSocialInsurance = payrollData.reduce(
      (total, payroll) => total + parseFloat(payroll.SocialInsurance || 0),
      0
    );
    const totalMedicalInsurance = payrollData.reduce(
      (total, payroll) => total + parseFloat(payroll.MedicalInsurance || 0),
      0
    );

    setTotals({
      totalLiquidPayment: totalLiquidPay,
      totalGrossPayment: totalGrossPay,
      totalTaxPayment: totalTax,
      totalMedicalInsurancePayment: totalMedicalInsurance,
      totalSocialInsurancePayment: totalSocialInsurance,
    });
  };

  // listen to month change 
  const handleMonthChange = (newValue) => {
    setSearchQuery(newValue);
    setTotals({
      totalLiquidPayment: 0,
      totalGrossPayment: 0,
      totalTaxPayment: 0,
      totalMedicalInsurancePayment: 0,
      totalSocialInsurancePayment: 0,
    });
    fetchPayrollRecords(newValue);
  };

  // listen to dept changes
  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
    if (department) {
      const newFilteredData = data.filter((row) => row.user.department === department);
      setFilteredData(newFilteredData);
      calculateTotals(newFilteredData);
    } else {
      setFilteredData(data);
      calculateTotals(data);
    }
  };

  // exporting as Execl file 
  const handleExportData = () => {
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

    // Log the export data to check if it's correct
    console.log('Export Data:', exportData);

    // Totals
    const totalLiquidPay = data.reduce((total, payroll) => total + parseFloat(payroll.TotalLiquidPay), 0);
    const totalGrossPay = data.reduce((total, payroll) => total + parseFloat(payroll.TotalPay), 0);
    const totalTax = data.reduce((total, payroll) => total + parseFloat(payroll.tax), 0);
    const totalSocialInsurance = data.reduce((total, payroll) => total + parseFloat(payroll.SocialInsurance), 0);
    const totalMedicalInsurance = data.reduce((total, payroll) => total + parseFloat(payroll.MedicalInsurance), 0);

    const totals = {
      Name: 'Totals',
      'Employee ID': '',
      Department: '',
      Salary: '',
      'Possible Working Days': '',
      Holidays: '',
      'Actual Working Days': '',
      Additions: '',
      Deductions: '',
      'Daily Rate': '',
      'Paid Days': '',
      'Medical Insurance': Number(totalMedicalInsurance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      'Social Insurance': Number(totalSocialInsurance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      Tax: Number(totalTax).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      'Gross Pay': Number(totalGrossPay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      'Total Liquid Pay': Number(totalLiquidPay).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    };

    exportData.push(totals);

    // Create and export Excel file
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PayrollData');
    XLSX.writeFile(workbook, 'PayrollData.xlsx');
  };


  // open review modal
  const handleReviewPayroll = () => {
    setReviewModalOpen(true);
  };

  // close review modal
  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
  };

  return (
    <>
      <Box sx={{ padding: '16px' }}>

        {/* Filters Search and Department  */}
        <PayrollFilters
          searchQuery={searchQuery}
          onMonthChange={handleMonthChange}
          data={data}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={handleDepartmentChange}
        />

        {/* Totals section */}
        <PayrollTotals
          totals={totals}
          selectedDepartment={selectedDepartment}
          colors={colors}
        />
        {/* Payroll actions  */}
        <PayrollActions
          onReviewPayroll={handleReviewPayroll}
          onExportData={handleExportData}
          colors={colors}
        />

        {/* Material react table */}
        <PayrollTable columns={columns} data={filteredData} colors={colors} />

      </Box>

      {/* Review Modal */}
      <PayrollReviewModal
        showReviewModal={reviewModalOpen}
        handleCloseReviewModal={handleCloseReviewModal}
        filteredData={filteredData}
      />
      
    </>
  );
};

export default Payroll;
