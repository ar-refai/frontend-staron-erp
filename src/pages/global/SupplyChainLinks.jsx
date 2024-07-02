import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
const SupplyChainLinks = [
    {
        title: "Supplyers Listing",
        to: "/supply-chain/supplyers-listing",
        icon: <Person2OutlinedIcon />,
    },
    {
        title: "Stock Log",
        to: "/supply-chain/stock-log",
        icon: <InventoryOutlinedIcon />,
    },
    {
        title: "Treasury Requests",
        to: "/supply-chain/treasury-requests",
        icon: <Inventory2OutlinedIcon />,
    },
    {
        title: "Procurement Requests",
        to: "/supply-chain/procurement-requests",
        icon: <ShoppingCartOutlinedIcon />,
    },
    {
        title: "Warehouse Requests",
        to: "/supply-chain/warehouse-requests",
        icon: <WarehouseOutlinedIcon />,
    },


    
];

export default SupplyChainLinks;
