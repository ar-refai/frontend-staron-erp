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
import { Typography, Box, ListItem, ListItemIcon, ListItemText, Collapse, ListSubheader, ListItemButton } from '@mui/material';
import MarkunreadMailboxOutlinedIcon from '@mui/icons-material/MarkunreadMailboxOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

// Importing icons
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import HRLinks from './HrLinks';
import TagIcon from '@mui/icons-material/Tag';
import SalesLinks from './SalesLinks';
import TechLinks from './TechLinks';
import ControlLinks from './ControlLinks';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import SupplyChainLinks from './SupplyChainLinks';
import OperationLinks from './OperationLinks';
import FinanceLinks from './FinanceLinks';
import AdministrationLinks from './AdministrationLinks';

const filteredItems = ControlLinks.filter(
  (item) => item.to === "/control/productivity-tracking" || item.to === "/control/procurement-requests"
);

const Item = ({ title, to, icon, selected, setSelected }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = JSON.parse(localStorage.getItem('staron_user'));
  // console.log("#".repeat(44));
  // console.log(`https://erpsystem.darakoutlet.com/${user.profileimage}`);
  // console.log("#".repeat(44));

  // console.log(user.supervisor);


  return (
    <LightTooltip title={title}>
      <ListItem
        button
        selected={selected === title}
        onClick={() => setSelected(title)}
        component={Link}
        to={to}
        sx={{
          color: colors.grey[200],
          '&.Mui-selected': {
            backgroundColor: colors.primary[900],
            color: colors.redAccent[400]
          },
          '&.Mui-selected:hover': {
            backgroundColor: theme.palette.mode === 'light' ? colors.primary[800] : colors.primary[500],
          },
          '&:hover': {
            backgroundColor: theme.palette.mode === 'light' ? colors.primary[800] : colors.primary[500],
          }
        }}
      >
        <ListItemIcon sx={{ color: selected === title ? colors.redAccent[400] : colors.grey[300] }}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </LightTooltip>
  );
};


const drawerWidth = 240;


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    padding: '4px 10px',
    position: 'absolute',
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
  const [openControlCollapse, setOpenControlCollapse] = React.useState(false);
  const user = JSON.parse(localStorage.getItem('staron_user'));

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState('');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  function handleOpenControlSettings() {
    setOpenControlCollapse(!openControlCollapse);
  }


  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: colors.primary[400],
            border: theme.palette.mode === 'dark' ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0,.15)",
            borderRadius: '30px',
            transform: 'scale(.99)',
            marginLeft: '10px'
          }
        }}

      >
        <DrawerHeader open={open}>
          {open && (
            <Typography key={1} variant="h3" color={colors.grey[100]}>
              Control Panel
            </Typography>
          )}
          <IconButton onClick={handleDrawerToggle}>
            {open ? (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />) : <MenuIcon sx={{ margin: "auto" }} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Don't Delete this */}
          <Typography

            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            {open ? (
              <Box
                sx={{ display: 'flex', justifyContent: 'start', fontSize: '16px', cursor: 'default', alignItems: 'center', color: colors.primary[100], letterSpacing: '2px', fontWeight: 'bold' }}>
                <TagIcon sx={{ color: colors.redAccent[500], fontSize: '30px' }} /> GENERAL
              </Box>) : <Box sx={{ cursor: 'default' }}>
              <Typography sx={{ display: 'flex', color: colors.redAccent[500], fontSize: '30px', justifyContent: 'start' }}> ـــ </Typography>
            </Box> // Change cursor to pointer when hovered

            }
          </Typography> 
           <Item
            key={"dashboard"}
            title="Dashboard"
            to="/global/dashboard"
            icon={<SpaceDashboardOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          {/* <Item
            key={"attendance"}

            title="Attendance"
            to="/global/attendance"
            icon={<ChecklistOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          /> */}
          <Item
            key={"requests"}

            title="Requests"
            to="/global/requests"
            icon={<MarkunreadMailboxOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          {!user.supervisor && 
          <Item
            key={"recuirtment"}

            title="Recruitment Requests"
            to="/global/recruitment-requests"
            icon={<LocalShippingOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          }

          {/* <Item
            key={"performance"}

            title="Targets & Performance"
            to="/global/target-performance"
            icon={<QueryStatsOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />  */}

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            {open ? (
              <Box sx={{ display: 'flex', justifyContent: 'start', fontSize: '16px', cursor: 'default', alignItems: 'center', color: colors.primary[100], letterSpacing: '2px', fontWeight: 'bold' }}>
                <TagIcon sx={{ color: colors.redAccent[500], fontSize: '30px' }} /> SPECIFIC
              </Box>)
              : (
                <Box sx={{ cursor: 'default' }}>
                  <Typography sx={{ display: 'flex', color: colors.redAccent[500], fontSize: '30px', justifyContent: 'start' }}> ـــ </Typography>
                </Box> // Change cursor to pointer when hovered
              )}

          </Typography>
          
          {user?.hraccess === "1" && HRLinks.map((item, index) => (
            <Item
              key={item.title}
              title={item.title}
              to={item.to}
              icon={item.icon}
              selected={selected}
              setSelected={setSelected}
            />))}

          {user?.salesaccess === "1" && SalesLinks.map((item, index) => (
            <Item
              key={item.title}
              title={item.title}
              to={item.to}
              icon={item.icon}
              selected={selected}
              setSelected={setSelected}
            />
          ))}

          {user?.technicalaccess === "1" && TechLinks.map((item, index) => (
            <Item
              key={item.title}
              title={item.title}
              to={item.to}
              icon={item.icon}
              selected={selected}
              setSelected={setSelected}
            />
          ))}

          {/* Weekly Control Items */}
          {user?.controlaccess === "1"&& (

          
          <Box>
          
          <List
            sx={{ width: '100%', maxWidth: 360 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleOpenControlSettings}>
              <ListItemIcon>
                <ArchiveOutlinedIcon />
              </ListItemIcon>
              <ListItemText sx={{ color: colors.grey[200] }} primary="Weekly Framework" />
              {openControlCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openControlCollapse} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {filteredItems.map((item, index) => (
                  <Box key={item.title} pl={2}>
                    <Item
                      key={index}
                      title={item.title}
                      to={item.to}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </Box>
                ))}
              </List>
            </Collapse>
          </List>
          {/* REst of control items  */}
          {ControlLinks.map((item, index) => {
            if (item.to === "/control/productivity-tracking" || item.to === "/control/procurement-requests")
              return <></>

            return (<Item
              key={item.title}
              title={item.title}
              to={item.to}
              icon={item.icon}
              selected={selected}
              setSelected={setSelected}
            />)
          })}
          </Box>
          )}
          {user?.supplychainaccess === "1" && SupplyChainLinks.map((item, index) => {
            return (<Item
              key={item.title}
              title={item.title}
              to={item.to}
              icon={item.icon}
              selected={selected}
              setSelected={setSelected}
            />)
          })}
          
          {/* Operation Links */}
          {user?.operationaccess === "1" && OperationLinks.map((item, index) => {
            return (<Item
              key={item.title}
              title={item.title}
              to={item.to}
              icon={item.icon}
              selected={selected}
              setSelected={setSelected}
            />)
          })}
          {user?.financeaccess === "1" && FinanceLinks.map((item, index) => {
            return (<Item
              key={item.title}
              title={item.title}
              to={item.to}
              icon={item.icon}
              selected={selected}
              setSelected={setSelected}
              />
            )
          })}

          {user?.adminstrationaccess === "1" && AdministrationLinks.map((item, index) => {
            // there is a mis spelling in the adminstrationaccess note:::
            return (<Item
              key={item.title}
              title={item.title}
              to={item.to}
              icon={item.icon}
              selected={selected}
              setSelected={setSelected}
              />
            )
          })}

          {/* The User Signed in */}
          <ListItem
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 'auto', // Push the avatar to the bottom of the sidebar
              translate: open ? '-4px' : '0'
            }}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar
                alt="users name"
                src={`https://erpsystem.darakoutlet.com${user?.profileimage}`}
                sx={{
                  width: open ? '50px' : '40px',
                  height: open ? '50px' : '40px',
                  transition: 'all ease .4s'
                }}
              />
              {/* {true && console.log(`https://erpsystem.darakoutlet.com${user.profileimage}`)} */}
            </StyledBadge>
            {open && (
              <>
                <ListItemText
                  primary={user?.name}
                  sx={{
                    marginTop: open ? '15px' : 0,
                    marginLeft: open ? '0' : '18px',
                    fontSize: '12px',
                    color: colors.primary[100]

                  }} />
                <ListItemText
                  primary={user?.department}
                  sx={{
                    marginLeft: open ? '0' : '18px',
                    color: colors.primary[200],
                    transform: 'translateY(-10px)',
                    fontSize: '10px',
                  }} />
              </>
            )}
          </ListItem>


        </List>
      </Drawer>
    </>
  );
}
