import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box, Typography, Divider, Grid, CircularProgress, Avatar, Paper
} from "@mui/material";
import { ShowBankProfile } from "apis/FainanceApi/TreasuryRequests";
import { useTheme } from "@mui/material/styles";
import { tokens } from "theme";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import TagIcon from '@mui/icons-material/Tag';

const BankProfile = () => {
    const { id } = useParams();
    const [bankData, setBankData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const fetchBankProfile = async () => {
            try {
                const response = await ShowBankProfile(id);
                if (response.status === 200) {
                    setBankData(response.data);
                } else {
                    setError("Failed to load bank profile.");
                }
            } catch (err) {
                setError("An error occurred while fetching the bank profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchBankProfile();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    const treasuryColumns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "debit_id", header: "Debit ID" },
        { accessorKey: "debit_account_description", header: "Debit Account Description" },
        { accessorKey: "credit_id", header: "Credit ID" },
        { accessorKey: "credit_account_description", header: "Credit Account Description" },
        { accessorKey: "description", header: "Description" },
        { accessorKey: "value", header: "Value" },
        { accessorKey: "type", header: "Type" },
        { accessorKey: "collection_date", header: "Collection Date" },
        { accessorKey: "collection_type", header: "Collection Type" },
        { accessorKey: "status", header: "Status" },
    ];

    const journalColumns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "invoice_group_id", header: "Invoice Group ID" },
        { accessorKey: "date", header: "Date" },
        { accessorKey: "debit_id", header: "Debit ID" },
        { accessorKey: "debit_account_description", header: "Debit Account Description" },
        { accessorKey: "credit_id", header: "Credit ID" },
        { accessorKey: "credit_account_description", header: "Credit Account Description" },
        { accessorKey: "value", header: "Value" },
        { accessorKey: "description", header: "Description" },
        { accessorKey: "invoice_id", header: "Invoice ID" },
    ];

    return (
        <Box sx={{ padding: 4 }}>
            <Paper sx={{ padding: 4, bgcolor: colors.primary[400], borderRadius: 2, boxShadow: 3 }}>
                <Divider />
                <Grid container sx={{ mt: 2 }} spacing={3}>
                    <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                        <Avatar
                            src={``} // Add bank logo URL if available
                            alt={bankData.name}
                            sx={{ width: 128, height: 128, mb: 2, mx: "auto" }}
                        />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {bankData.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Bank ID: {bankData.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" color={colors.primary[200]}>Bank Code:</Typography>
                                <Typography variant="body1">{bankData.code}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" color={colors.primary[200]}>Parent ID:</Typography>
                                <Typography variant="body1">{bankData.parent_id}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" color={colors.primary[200]}>Balance:</Typography>
                                <Typography variant="body1">${bankData.balance}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" color={colors.primary[200]}>Debit:</Typography>
                                <Typography variant="body1">${bankData.debit}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" color={colors.primary[200]}>Credit:</Typography>
                                <Typography variant="body1">${bankData.credit}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" color={colors.primary[200]}>Branch:</Typography>
                                <Typography variant="body1">{bankData.brance}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider sx={{ marginY: 4 }} />

                {bankData.mainjournal.length > 0 && (
                    <Box sx={{ marginBottom: 4 }}>
                        <Box component="div" sx={{ p: 1, px: 2,mb:2, borderRadius:'10px', textAlign: "center", bgcolor: colors.primary[500] }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                                    <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }} />
                                    <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
                                        Main Journal Entries
                                    </Typography>
                                </Box>

                            </Box>
                        </Box>

                        <MaterialReactTable
                            columns={journalColumns}
                            data={bankData.mainjournal}
                            muiSkeletonProps={{
                                animation: "wave",
                            }}
                            muiSearchTextFieldProps={{
                                size: "small",
                                variant: "outlined",
                            }}
                            muiPaginationProps={{
                                color: "secondary",
                                rowsPerPageOptions: [10, 20, 30, 40],
                                shape: "rounded",
                                variant: "outlined",
                            }}
                            muiBottomToolbarProps={({ table }) => ({
                                sx: { backgroundColor: colors.primary[400] },
                            })}
                            muiTablePaperProps={{
                                elevation: 2,
                                sx: {
                                    borderRadius: "20px",
                                },
                            }}
                            muiTableContainerProps={{
                                sx: {
                                    backgroundColor: colors.primary[400],
                                },
                            }}
                            muiTableHeadCellProps={{
                                sx: {
                                    backgroundColor: colors.primary[400],
                                },
                            }}
                            muiTableBodyCellProps={{
                                sx: {
                                    backgroundColor: colors.primary[400],
                                },
                            }}
                            muiTableBodyProps={{
                                sx: {
                                    backgroundColor: colors.primary[400],
                                },
                            }}
                        />
                    </Box>
                )}
                <Divider />
                {bankData.TresuryAccount.length > 0 && (
                    <Box sx={{ marginTop: 4 }}>
                        <Box component="div" sx={{ p: 1, px: 2,mb:2, borderRadius:'10px', textAlign: "center", bgcolor: colors.primary[500] }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                                    <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }} />
                                    <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
                                    Treasury Accounts
                                    </Typography>
                                </Box>

                            </Box>
                        </Box>
                        <MaterialReactTable
                            columns={treasuryColumns}
                            data={bankData.TresuryAccount}
                            muiSkeletonProps={{
                                animation: "wave",
                            }}
                            muiSearchTextFieldProps={{
                                size: "small",
                                variant: "outlined",
                            }}
                            muiPaginationProps={{
                                color: "secondary",
                                rowsPerPageOptions: [10, 20, 30, 40],
                                shape: "rounded",
                                variant: "outlined",
                            }}
                            muiBottomToolbarProps={({ table }) => ({
                                sx: { backgroundColor: colors.primary[400] },
                            })}
                            muiTablePaperProps={{
                                elevation: 2,
                                sx: {
                                    borderRadius: "20px",
                                },
                            }}
                            muiTableContainerProps={{
                                sx: {
                                    backgroundColor: colors.primary[400],
                                },
                            }}
                            muiTableHeadCellProps={{
                                sx: {
                                    backgroundColor: colors.primary[400],
                                },
                            }}
                            muiTableBodyCellProps={{
                                sx: {
                                    backgroundColor: colors.primary[400],
                                },
                            }}
                            muiTableBodyProps={{
                                sx: {
                                    backgroundColor: colors.primary[400],
                                },
                            }}
                        />
                    </Box>
                )}
                <Divider  sx={{mt:3}}/>
            </Paper>
        </Box>
    );
};

export default BankProfile;
