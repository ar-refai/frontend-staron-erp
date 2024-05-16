import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

// Menu Icon 
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// Dashboard Icon
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
// Attendance Icon
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
// Requests Icon
import MarkunreadMailboxOutlinedIcon from '@mui/icons-material/MarkunreadMailboxOutlined';
// Requests Requirments Icon
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
// Target && Performance Icon
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';

// HR Icons
// _Employee repo
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
// _TimeSheet
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
// _Request Approval
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
// _Requirement Approval
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
// _Payroll
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
// _Incentive Remuneration
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
// _Leave Balance
import FollowTheSignsOutlinedIcon from '@mui/icons-material/FollowTheSignsOutlined';
// _Warning Log
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[400],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.primary[400]} !important`, // Change hover color here
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar 
      collapsed={isCollapsed} 
      backgroundColor={`${colors.primary[400]} !important`} 
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Staron
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`/assets/user.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
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
              General
            </Typography>
            <Item
              title="Attendance"
              to="/team"
              icon={<ChecklistOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Requests"
              to="/contacts"
              icon={<MarkunreadMailboxOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Requirment Requests"
              to="/invoices"
              icon={<LocalShippingOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="Targets & Performance"
              to="/invoices"
              icon={<QueryStatsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Specific
            </Typography>

            <Item
              title="Employee Repository"
              to="/form"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Timesheet"
              to="/calendar"
              icon={<ListAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Requests Approvals"
              to="/faq"
              icon={<FactCheckOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
                title="Requirments Approvals"
                to="/faq"
                icon={<AssignmentTurnedInOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            <Item
              title="Payroll"
              to="/faq"
              icon={<LocalAtmOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Incentive Remuneration"
              to="/faq"
              icon={<PriceChangeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Leave Balance"
              to="/faq"
              icon={<FollowTheSignsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Warning Log"
              to="/faq"
              icon={<SmsFailedOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            

            
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar