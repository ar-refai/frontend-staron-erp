import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import React from 'react'
import { tokens } from 'theme';
import Lottie from 'lottie-react';
import Document from "../../../assets/lottie/document.json";
import { useTheme } from '@emotion/react';
import WarningTimeLine from './WarningTimeLine';

const warnings = [
    {
        date:'17-12-2024',
        description: '1/2 hour late'
    },
    {
        date:'27-12-2024',
        description: '1/2 hour late'
    },
    {
        date:'30-12-2024',
        description: '1/2 hour late'
    }
];
const WarningHistoryDialog = ({historyDialogOpen , handleClose ,selectedEmployee , historyColumns , employeeLogs }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    
    <Dialog open={historyDialogOpen} onClose={handleClose} maxWidth="lg" fullWidth>
                <Box
                    sx={{
                        bgcolor: colors.grey[800],
                        borderRadius: '5px'
                    }}>
                    <DialogTitle>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                            <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                            Warning History for {selectedEmployee?.name}
                        </Box>
                    </DialogTitle>
                    <Divider />

                    <DialogContent>
                        {/* <MaterialReactTable
                            columns={historyColumns}
                            data={employeeLogs}
                            enableColumnOrdering
                            enableColumnActions={false}
                            muiTablePaperProps={{
                                elevation: 2,
                                sx: {
                                    borderRadius: '20px',
                                    padding: '20px 0 0 0',
                                },
                            }}
                            muiTableContainerProps={{ sx: { maxHeight: '600px', backgroundColor: colors.primary[400] } }}
                            muiTableHeadCellProps={{ sx: { backgroundColor: colors.grey[900] } }}
                            muiTableBodyCellProps={{ sx: { backgroundColor: colors.grey[800] } }}
                            muiTableBodyProps={{ sx: { backgroundColor: colors.grey[800] } }}
                            muiBottomToolbarProps={({ table }) => ({
                                sx: { backgroundColor: colors.grey[800] },
                            })}
                            mrtTheme = {(theme) => ({
                                baseBackgroundColor: colors.grey[700],
                                draggingBorderColor: theme.palette.secondary.main,
                            })}
                        /> */}
                        <WarningTimeLine 
                            warnings = {warnings}
                        />
                    </DialogContent>
                    <Divider />

                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>


  )
}

export default WarningHistoryDialog