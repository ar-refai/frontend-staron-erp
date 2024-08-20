import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, Typography, useTheme } from '@mui/material'
import * as React from 'react'
import { tokens } from 'theme';
import TagIcon from '@mui/icons-material/Tag';
import { Link } from 'react-router-dom';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';

const Collection = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: colors.primary[400]
  }));
  
  function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  return (
    <Box>
       {/* Header */}
       <Box component="div" sx={{ p: 1, px: 2, textAlign: "center" ,bgcolor:colors.primary[600]}}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
            <TagIcon sx={{ color: colors.redAccent[500], fontSize: '35px' }} />
            <Typography variant='h5' sx={{ textTransform: "uppercase", color: colors.grey[100] }}>
              Collection
            </Typography>
          </Box>
          <Link
            to='/finance/finance-treasury-collection'
          >
            <IconButton
              color="secondary"
              aria-label="add to shopping cart">
              <RecommendOutlinedIcon color='secondary' sx={{ fontSize: '25px' }} />
            </IconButton>
          </Link>
        </Box>
      </Box>
      <Grid item xs={12} md={6}>
          <Demo>
            <List dense={false}>
              {generate(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <RecommendOutlinedIcon color='secondary' />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <RecommendOutlinedIcon color='secondary' />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={'Secondary text' }
                  />
                </ListItem>,
              )}
            </List>
          </Demo>
        </Grid>

    </Box>
  )
}

export default Collection