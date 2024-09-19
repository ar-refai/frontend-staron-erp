import { useMemo } from "react";

export function PayrollColumns() {
    const columns = useMemo(
        () => [
            {
                accessorKey: "user.name",
                header: "Name",
            },
            {
                accessorKey: "user.hr_code",
                header: "HR Code",
                size: 120,
            },
            {
                accessorKey: "user.department",
                header: "Department",
                size: 200,
            },
            {
                accessorKey: "user.salary",
                header: "Salary",
            },
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
    return columns;
}

