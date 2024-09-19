import { ShowAllPayroll } from "apis/HumanRecourse/Payroll";

const showAllPayrollRecords = async (date) => {
  try {
    const formattedDate = date.format("YYYY-MM");
    const response = await ShowAllPayroll({ date: formattedDate });
    // console.log(response);
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 204
    ) {
      // Check if response.data is an array
      const payrollData = Array.isArray(response.data) ? response.data : [];
      return payrollData;
      // setData(payrollData);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default ShowAllPayrollRecords