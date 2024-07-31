import React from "react";
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import FollowTheSignsOutlinedIcon from '@mui/icons-material/FollowTheSignsOutlined';
import SmsFailedOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';


const HRLinks = [
    {
        title: "Employee Repository",
        to: "/hr/employees-list",
        icon: <PeopleOutlinedIcon />,
    },
    { title: "Timesheet", to: "/hr/timesheet", icon: <ListAltOutlinedIcon /> },
    // {
    //     title: "Requests Approval",
    //     to: "/hr/requests-approval",
    //     icon: <FactCheckOutlinedIcon />,
    // },
    // {
    //     title: "Recruitment Approval",
    //     to: "/hr/recruitment-approval",
    //     icon: <AssignmentTurnedInOutlinedIcon />,
    // },
    { 
        title: "Payroll",
        to: "/hr/payroll",
        icon: <LocalAtmOutlinedIcon /> },
    {
        title: "Incentive Remuneration",
        to: "/hr/incentive-remuneration",
        icon: <PriceChangeOutlinedIcon />,
    },
    {
        title: "Leave Balance",
        to: "/hr/leave-balance",
        icon: <FollowTheSignsOutlinedIcon />,
    },
    {   
        title: "Warning Log",
        to: "/hr/warning-log", 
        icon: <SmsFailedOutlinedIcon /> },
];

export default HRLinks;
