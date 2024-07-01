import React from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
const SalesLinks = [
    {
        title: "Funnel Work Flow",
        to: "/sales/funnel-workflow",
        icon: <FilterAltIcon />,
    },
    {
        title: "Stakeholders Listing",
        to: "/sales/stakeholders-listing",
        icon: <RecentActorsIcon />,
    },
    {
        title: "Analytics",
        to: "/sales/analytics",
        icon: <AccountTreeIcon />,
    },
    {
        title: "Activity Log",
        to: "/sales/activity-log",
        icon: <WebStoriesIcon />,
    },
    {
        title: "Conversion",
        to: "/sales/conversion",
        icon: <RefreshIcon />,
    },


    
];

export default SalesLinks;
