import React from "react";
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
const FinanceLinks = [
    {
        title: "Monthly Framework",
        to: "/finance/monthly-framework",
        icon: <ArticleOutlinedIcon />,
    },
    {
        title: "Financial Reports",
        to: "/finance/financial-reports",
        icon: <SummarizeOutlinedIcon />,
    },
    {
        title: "Stock Listing",
        to: "/finance/stock-listing",
        icon: <WarehouseOutlinedIcon />,
    },
    {
        title: "Stock Log",
        to: "/finance/stock-log",
        icon: <InventoryOutlinedIcon />,
    },
    {
        title: "Warehouse Requests",
        to: "/finance/warehouse-requests",
        icon: <Inventory2OutlinedIcon />,
    },
    {
        title: "Conversion Validation",
        to: "/finance/conversion-validation",
        icon: <BeenhereOutlinedIcon />,
    },
    {
        title: "Procurement Requests",
        to: "/finance/procurement-requests",
        icon: <ShoppingCartOutlinedIcon />,
    },

];

export default FinanceLinks;
