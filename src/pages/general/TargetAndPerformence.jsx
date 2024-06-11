import React from 'react'
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import TagIcon from '@mui/icons-material/Tag';

const TargetAndPerformence = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (

        <>
            <Box
                sx={{
                    backgroundColor: colors.primary[400],
                    padding: '12px 40px',
                    margin: '20px ',
                    borderRadius: '10px',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <TagIcon sx={{ color: colors.redAccent[500], fontSize: '40px' }} />
                    <Typography
                        variant="h2"
                        sx={{
                            color: colors.primary[200],
                            marginLeft: '10px',
                            padding: '10px 12px',
                        }}
                    >
                        Target And Performence
                    </Typography>
                </Box>
            </Box>
            <div>TargetAndPerformence</div>
        </>
    )
}

export default TargetAndPerformence