import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
const ControlLinks = [
    {
        title: "Monthly FrameWork",
        to: "/control/monthly-framework",
        icon: <CalendarTodayOutlinedIcon />,
    },
    {
        title: "Productivity Tracking",
        to: "/control/productivity-tracking",
        icon: <AssessmentOutlinedIcon />,
    },
    {
        title: "Procurement Requests",
        to: "/control/procurement-requests",
        icon: <ProductionQuantityLimitsOutlinedIcon />,
    },
    {
        title: "Warehouse Requests",
        to: "/control/warehouse-requests",
        icon: <WarehouseOutlinedIcon />,
    },
    {   
        title: "PackageDevelopment",
        to: "/control/package-development", 
        icon: <AssignmentOutlinedIcon /> },
    
];

export default ControlLinks;
