import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { ThemeColor } from 'components/ThemeColor'
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ShowAllPayrollRecords from './ShowAllPayrollRecords';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const PayrollDepartment = ({ data, setData }) => {
    // search query   
    const [searchQuery, setSearchQuery] = useState(dayjs());
    // department filtering 
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    // totals   
    const [totalLiquidPayment, setTotalLiquidPayment] = useState(0);
    const [totalGrossPayment, setTotalGrossPayment] = useState(0);
    const [totalTaxPayment, setTotalTaxPayment] = useState(0);
    const [totalMedicalInsurancePayment, setTotalMedicalInsurancePayment] =
        useState(0);
    const [totalSocialInsurancePayment, setTotalSocialInsurancePayment] =
        useState(0);

    useEffect(() => {
        const today = dayjs();
        setSearchQuery(today);
    }, []);

    const colors = ThemeColor();
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
    return calculateTotal("TotalLiquidPay");
  }, [calculateTotal]);

  const calculateTotalGrossPay = useCallback(() => {
    return calculateTotal("TotalPay");
  }, [calculateTotal]);

  const calculateTotalTax = useCallback(() => {
    return calculateTotal("tax");
  }, [calculateTotal]);

  const calculateTotalSocialInsurance = useCallback(() => {
    return calculateTotal("SocialInsurance");
  }, [calculateTotal]);

  const calculateTotalMedicalInsurance = useCallback(() => {
    return calculateTotal("MedicalInsurance");
  }, [calculateTotal]);

    const handleMonthChange = (newValue) => {
        setSearchQuery(newValue);
        setData(ShowAllPayrollRecords(newValue));
        const totalLiquidPay = data.reduce((total, payroll) => {
            return total + parseFloat(payroll.TotalLiquidPay);
        }, 0);
        setTotalLiquidPayment(totalLiquidPay);

        const totalGrossPay = data.reduce((total, payroll) => {
            return total + parseFloat(payroll.TotalPay);
        }, 0);
        setTotalGrossPayment(totalGrossPay);

        const totalTax = data.reduce((total, payroll) => {
            return total + parseFloat(payroll.tax);
        }, 0);
        setTotalTaxPayment(totalTax);

        const totalSocialInsurance = data.reduce((total, payroll) => {
            return total + parseFloat(payroll.SocialInsurance);
        }, 0);
        setTotalSocialInsurancePayment(totalSocialInsurance);

        const totalMedicalInsurance = data.reduce((total, payroll) => {
            return total + parseFloat(payroll.MedicalInsurance);
        }, 0);
        setTotalMedicalInsurancePayment(totalMedicalInsurance);
    };

    const handleDepartmentChange = (event) => {
        const department = event.target.value;
        setSelectedDepartment(department);
        const newFilteredData = data.filter(
            (row) => row.user.department === department
        );
        setFilteredData(newFilteredData);
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
                gap: "20px",
            }}
        >
            {/* Department select input for total liquid pay */}
            <FormControl variant="filled" sx={{ minWidth: 200, marginTop: 2 }}>
                <InputLabel id="department-select-label">Department</InputLabel>
                <Select
                    labelId="department-select-label"
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    sx={{
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.primary[200],
                        },
                        "& .MuiOutlinedInput-root": {
                            "&:hover > fieldset": {
                                borderColor: colors.redAccent[200],
                            },
                        },
                        "& .MuiSvgIcon-root": {
                            color: colors.redAccent[400],
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
                >
                    {/* Check if data is an array before mapping */}
                    {Array.isArray(data) &&
                        [...new Set(data.map((row) => row.user.department))].map(
                            (department) => (
                                <MenuItem key={department} value={department}>
                                    {department}
                                </MenuItem>
                            )
                        )}
                </Select>
            </FormControl>

            {/* Search Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={"Month and Year"}
                    views={["month", "year"]}
                    value={searchQuery}
                    onChange={handleMonthChange}
                    slots={{
                        textField: (params) => (
                            <TextField {...params} variant="filled" size="medium" />
                        ),
                    }}
                    sx={{
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: colors.primary[200],
                        },
                        "& .MuiOutlinedInput-root": {
                            "&:hover > fieldset": {
                                borderColor: colors.primary[200],
                            },
                        },
                        "& .MuiSvgIcon-root": {
                            color: colors.redAccent[400],
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
        </Box>
    )
}

export default PayrollDepartment