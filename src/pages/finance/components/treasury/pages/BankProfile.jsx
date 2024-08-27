import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Divider , Grid, CircularProgress, Avatar, Paper } from "@mui/material";
import { ShowBankProfile } from "apis/FainanceApi/TreasuryRequests";
import { useTheme } from "@mui/material/styles";
import { tokens } from "theme";

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

    return (
        <Box sx={{ padding: 4 }}>
            <Paper sx={{ padding: 4, bgcolor: colors.primary[400], borderRadius: 2, boxShadow: 3 }}>
            <Divider  sx={{ marginY: 4 }} />

                <Grid container spacing={3}>
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
                            <Divider />
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" color={colors.primary[200]}>Parent ID:</Typography>
                                <Typography variant="body1">{bankData.parent_id}</Typography>
                            </Grid>
                            <Divider />
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" color={colors.primary[200]}>Balance:</Typography>
                                <Typography variant="body1">${bankData.balance}</Typography>
                            </Grid>
                            <Divider />
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" color={colors.primary[200]}>Debit:</Typography>
                                <Typography variant="body1">${bankData.debit}</Typography>
                            </Grid>
                            <Divider />
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" color={colors.primary[200]}>Credit:</Typography>
                                <Typography variant="body1">${bankData.credit}</Typography>
                            </Grid>
                            <Divider />
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" color={colors.primary[200]}>Branch:</Typography>
                                <Typography variant="body1">{bankData.brance}</Typography>
                            </Grid>
                            <Divider />
                            
                        </Grid>
                    </Grid>
                </Grid>
                <Divider  sx={{ marginY: 4 }} />

                {bankData.mainjournal.length > 0 && (
                    <Box>
                        <Typography variant="h6" color={colors.primary[200]}>Main Journal Entries</Typography>
                        {/* Render main journal entries here */}
                    </Box>
                )}

                {bankData.TresuryAccount.length > 0 && (
                    <Box sx={{ marginTop: 4 }}>
                        <Typography variant="h6" color={colors.primary[200]}>Treasury Accounts</Typography>
                        {/* Render treasury accounts here */}
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default BankProfile;
