import React from "react";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import Brightness7OutlinedIcon from '@mui/icons-material/Brightness7Outlined';

const FinanceLinks = [
    {
        title: "Accounting Hub",
        to: "/finance/finance-accounting-hub",
        icon: <ArticleOutlinedIcon />,
    },
    {
        title: "Liquidity Pivot",
        to: "/finance/finance-treasury",
        icon: <CasesOutlinedIcon />,
    },
    {
        title: "Organizational Panel",
        to: "/finance/organizational-panel",
        icon: <Brightness7OutlinedIcon />,
    },
    
];

export default FinanceLinks;
