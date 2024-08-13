import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { tokens } from 'theme';
import TagIcon from '@mui/icons-material/Tag';
import { Link } from 'react-router-dom';

const MainJournal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  return (
    <>
      <Grid item >
        <Box
          component="div"
          sx={{
            display: "inline-block",
            p: 1,
            // border: 2,
            // borderColor: "primary.main",
            textAlign: "center",
            width: "100%",
            bgcolor: colors.primary[600],
            '&:hover': {
              bgcolor: colors.primary[500],
            },
            borderRadius: "5px",
          }}
        >

          <Box component="div" sx={{ p: 1, px:2, textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{display:"flex",justifyContent:'center',alignItems:"center"}}>
                <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }}/>
                <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
                Main Journal
                </Typography>
              </Box>
              <Link
                to='/finance/finance-main-journal'
              >
              <IconButton 
              color="secondary" 
              aria-label="add to shopping cart">
                <ArrowCircleRightOutlinedIcon  sx={{fontSize:'25px'}}/>
              </IconButton>
                </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  )
}

export default MainJournal