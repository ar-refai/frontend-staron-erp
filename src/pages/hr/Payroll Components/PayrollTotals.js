// PayrollTotals.js
import React from 'react';
import { Stack, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const PayrollTotals = ({ totals, selectedDepartment, colors }) => {
    const { totalLiquidPayment, totalGrossPayment, totalTaxPayment, totalMedicalInsurancePayment, totalSocialInsurancePayment } = totals;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? colors.primary[500] : colors.primary[200],
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const formatCurrency = (value) => {
        return Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <Stack direction="row" justifyContent="space-between" spacing={2} mt={2} mb={2}>
            {!selectedDepartment ? (
                <>
                    <Item>
                        <Typography variant="h6">
                            Total Liquid Pay : EGP {formatCurrency(totalLiquidPayment)}
                        </Typography>
                    </Item>

                    <Item>
                        <Typography variant="h6">
                            Total Gross Pay : EGP {formatCurrency(totalGrossPayment)}
                        </Typography>
                    </Item>

                    <Item>
                        <Typography variant="h6">
                            Total Tax : EGP {formatCurrency(totalTaxPayment)}
                        </Typography>
                    </Item>
                    <Item>
                        <Typography variant="h6">
                            Total Social Insurance : EGP {formatCurrency(totalSocialInsurancePayment)}
                        </Typography>
                    </Item>
                    <Item>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Total Medical Insurance : EGP {formatCurrency(totalMedicalInsurancePayment)}
                        </Typography>
                    </Item>
                </>
            ) : (
                <>
                    <Item>
                        <Typography variant="h6">
                            Total Liquid Pay for {selectedDepartment}: EGP {formatCurrency(totalLiquidPayment)}
                        </Typography>
                    </Item>

                    <Item>
                        <Typography variant="h6">
                            Total Gross Pay for {selectedDepartment}: EGP {formatCurrency(totalGrossPayment)}
                        </Typography>
                    </Item>

                    <Item>
                        <Typography variant="h6">
                            Total Tax for {selectedDepartment}: EGP {formatCurrency(totalTaxPayment)}
                        </Typography>
                    </Item>
                    <Item>
                        <Typography variant="h6">
                            Total Social Insurance for {selectedDepartment}: EGP {formatCurrency(totalSocialInsurancePayment)}
                        </Typography>
                    </Item>
                    <Item>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Total Medical Insurance for {selectedDepartment}: EGP {formatCurrency(totalMedicalInsurancePayment)}
                        </Typography>
                    </Item>
                </>
            )}
        </Stack>
    );
};

export default PayrollTotals;
