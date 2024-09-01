import { Box, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from 'theme';
import TagIcon from '@mui/icons-material/Tag';
import { Link } from 'react-router-dom';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Rents = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <Box>
            {/* Header */}
            <Box component="div" sx={{ p: 1, px: 2, textAlign: "center", bgcolor: colors.primary[600] }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                        <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }} />
                        <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
                            Rents
                        </Typography>
                    </Box>
                    <Link
                        to='/administration/rents'
                    >
                        <IconButton
                            color="secondary"
                            aria-label="add to shopping cart">
                            <ArrowCircleRightOutlinedIcon sx={{ fontSize: '25px' }} />
                        </IconButton>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Rents