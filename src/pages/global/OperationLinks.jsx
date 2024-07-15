import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';

const OperationLinks = [
    {
        title: "Monthly Framework",
        to: "/operation/operation-monthly-framework",
        icon: <ArticleOutlinedIcon />,
    },
    {
        title: "Weekly Framework",
        to: "/operation/operation-weekly-framework",
        icon: <AssignmentOutlinedIcon />,
    },
    {
        title: "Procurement Requests",
        to: "/operation/operation-procurement-requests",
        icon: <ScheduleSendOutlinedIcon />,
    },
    {
        title: "Package Development",
        to: "/operation/operation-package-development",
        icon: <HourglassBottomOutlinedIcon />,
    },
    {
        title: "Warehouse Requests",
        to: "/operation/operation-warehouse-requests",
        icon: <FactoryOutlinedIcon />,
    },


    
];

export default OperationLinks;
