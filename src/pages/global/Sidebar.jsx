import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { Typography, Box, ListItem, ListItemIcon, ListItemText } from '@mui/material';

// Importing icons
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import MarkunreadMailboxOutlinedIcon from '@mui/icons-material/MarkunreadMailboxOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import FollowTheSignsOutlinedIcon from '@mui/icons-material/FollowTheSignsOutlined';
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ListItem
      button
      selected={selected === title}
      onClick={() => setSelected(title)}
      component={Link}
      to={to}
      sx={{
        color: colors.grey[200],
        '&.Mui-selected': {
          backgroundColor: colors.primary[800],
        },
        '&.Mui-selected:hover': {
          backgroundColor: colors.primary[600],
        },
        '&:hover': {
          backgroundColor: colors.primary[600],
        }
      }}
    >
      <ListItemIcon sx={{ color: colors.grey[400] }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

const drawerWidth = 240;

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    padding: '4px 10px'
  },
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme, open }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'space-between' : 'center',
  padding: theme.spacing(0, 1),
  marginLeft: open ? '12px' : 0,
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState('');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Drawer 
      variant="permanent" 
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: colors.primary[400],
          boxShadow:" 0px -9px 40px rgba(255, 255, 225, 0.1)"
        }
      }}
    
      >
        <DrawerHeader open={open}>
          {open && (
            <Typography variant="h3" color={colors.grey[100]}>
              Control Panel
            </Typography>
          )}
          <IconButton onClick={handleDrawerToggle}>
            {open ? (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />) : <MenuIcon sx={{ margin: "auto" }} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Item
            title="Dashboard"
            to="/"
            icon={<SpaceDashboardOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            {open ? (
              <Box>
                General
              </Box>) : <Box sx={{ cursor: 'default' }}>ـــ</Box> // Change cursor to pointer when hovered

            }
          </Typography>
          <Item
            title="Attendance"
            to="/attendance"
            icon={<ChecklistOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Requests"
            to="/requests"
            icon={<MarkunreadMailboxOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Requirment Requests"
            to="/requirment-requests"
            icon={<LocalShippingOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Item
            title="Targets & Performance"
            to="/targets-performance"
            icon={<QueryStatsOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            {open ? (
              <Box>
                Specific
              </Box>
            ) : (
              <Box sx={{ cursor: 'default' }}>ـــ</Box> // Change cursor to pointer when hovered
            )}

          </Typography>

          <Item
            title="Employee Repository"
            to="/employees"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Timesheet"
            to="/timesheet"
            icon={<ListAltOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Requests Approvals"
            to="/requests-approvals"
            icon={<FactCheckOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Requirments Approvals"
            to="/requirments-approvals"
            icon={<AssignmentTurnedInOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Payroll"
            to="/payroll"
            icon={<LocalAtmOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Incentive Remuneration"
            to="incentive-remuneration"
            icon={<PriceChangeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Leave Balance"
            to="/leave-balance"
            icon={<FollowTheSignsOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Warning Log"
            to="/warning-log"
            icon={<SmsFailedOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </List>
      </Drawer>
    </>
  );
}
