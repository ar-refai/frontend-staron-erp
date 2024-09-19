// PayrollActions.js
import React from 'react';
import { Box, Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const PayrollActions = ({ onReviewPayroll, onExportData, colors }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '16px',
                padding: '8px',
                flexWrap: 'wrap',
            }}
        >
            <Button
                onClick={onReviewPayroll}
                startIcon={<FileUploadIcon />}
                variant='outlined'
                color='secondary'
                sx={{
                    fontWeight: 'bold',
                    fontSize: '13px',
                }}
            >
                Review Payroll
            </Button>
            <Button
                onClick={onExportData}
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
    );
};

export default PayrollActions;
