import React, { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { styled, useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';

const IncentiveRemuniration = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: 'Name', footer: 'Name' },
      { accessorKey: 'employeeId', header: 'Employee ID', footer: 'Employee ID' },
      { accessorKey: 'department', header: 'Department', footer: 'Department' },
      { accessorKey: 'possibleIncentivePayroll', header: 'Possible Incentive Payroll', footer: 'Possible Incentive Payroll' },
      { accessorKey: 'departmentRating', header: 'Department Rating', footer: 'Department Rating' },
      { accessorKey: 'presenceMargin', header: 'Presence Margin', footer: 'Presence Margin' },
      { accessorKey: 'supervisorGrade', header: 'Supervisor Grade', footer: 'Supervisor Grade' },
      { accessorKey: 'overallPerformanceRating', header: 'Overall Performance Rating', footer: 'Overall Performance Rating' },
      { accessorKey: 'maxPossibleIncentive', header: 'Maximum Possible Incentive', footer: 'Maximum Possible Incentive' },
      { accessorKey: 'incentiveRemunerationPayout', header: 'Incentive Remuneration Payout', footer: 'Incentive Remuneration Payout' },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        name: 'John Doe',
        employeeId: '12345',
        department: 'Engineering',
        possibleIncentivePayroll: '$100,000',
        departmentRating: 0.95,
        presenceMargin: '10%',
        supervisorGrade: 0.85,
        overallPerformanceRating: 0.92,
        maxPossibleIncentive: '$10,000',
        incentiveRemunerationPayout: '$9,000',
      },
      {
        name: 'Jane Smith',
        employeeId: '67890',
        department: 'Marketing',
        possibleIncentivePayroll: '$80,000',
        departmentRating: 0.88,
        presenceMargin: '12%',
        supervisorGrade: 0.75,
        overallPerformanceRating: 0.82,
        maxPossibleIncentive: '$8,000',
        incentiveRemunerationPayout: '$7,000',
      },
      {
        name: 'Alice Johnson',
        employeeId: '24680',
        department: 'Finance',
        possibleIncentivePayroll: '$90,000',
        departmentRating: 0.92,
        presenceMargin: '8%',
        supervisorGrade: 0.78,
        overallPerformanceRating: 0.85,
        maxPossibleIncentive: '$9,000',
        incentiveRemunerationPayout: '$8,000',
      },
      {
        name: 'Bob Brown',
        employeeId: '13579',
        department: 'HR',
        possibleIncentivePayroll: '$85,000',
        departmentRating: 0.82,
        presenceMargin: '11%',
        supervisorGrade: 0.65,
        overallPerformanceRating: 0.75,
        maxPossibleIncentive: '$7,000',
        incentiveRemunerationPayout: '$6,000',
      },
      {
        name: 'Ella Davis',
        employeeId: '97531',
        department: 'Sales',
        possibleIncentivePayroll: '$95,000',
        departmentRating: 0.89,
        presenceMargin: '9%',
        supervisorGrade: 0.72,
        overallPerformanceRating: 0.80,
        maxPossibleIncentive: '$9,500',
        incentiveRemunerationPayout: '$8,500',
      },
      {
        name: 'Charlie Wilson',
        employeeId: '11223',
        department: 'Customer Support',
        possibleIncentivePayroll: '$88,000',
        departmentRating: 0.75,
        presenceMargin: '10%',
        supervisorGrade: 0.60,
        overallPerformanceRating: 0.68,
        maxPossibleIncentive: '$7,500',
        incentiveRemunerationPayout: '$6,500',
      },
      {
        name: 'Grace Lee',
        employeeId: '44556',
        department: 'Operations',
        possibleIncentivePayroll: '$87,000',
        departmentRating: 0.78,
        presenceMargin: '7%',
        supervisorGrade: 0.55,
        overallPerformanceRating: 0.72,
        maxPossibleIncentive: '$6,500',
        incentiveRemunerationPayout: '$5,500',
      },
      {
        name: 'Oliver Martinez',
        employeeId: '77889',
        department: 'Research & Development',
        possibleIncentivePayroll: '$92,000',
        departmentRating: 0.94,
        presenceMargin: '10%',
        supervisorGrade: 0.87,
        overallPerformanceRating: 0.90,
        maxPossibleIncentive: '$9,200',
        incentiveRemunerationPayout: '$8,200',
      },
      
      // Add more dummy data as needed
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    columnFilterDisplayMode: 'popover',
    enablePagination : true,
    paginationDisplayMode: 'pages',
    muiTableContainerProps: { sx: { maxHeight: '800px' } },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor:
          theme.palette.mode === 'dark'
            ? colors.primary[400]
            : colors.primary[500],
      }),
    },
  });

  return <MaterialReactTable table={table} />;
};

export default IncentiveRemuniration;
