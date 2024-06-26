import { Box, IconButton, InputBase, useTheme, Tooltip } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LightLogo from "../../assets/light-logo.png";
import DarkLogo from "../../assets/dark-logo.png";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';


import { logout } from "api";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const handleLogout = async () => {
        try {
            // Make an API request to log out the user
            await logout();
            // Remove the authentication token from local storage or cookie
            localStorage.removeItem('token');
            // Redirect to the login page after logout
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Box
            display={'flex'}
            justifyContent={"space-between"}
            alignItems="center"
            p={2}
        >
            {/* Logo */}
            <Box>
                {theme.palette.mode === 'dark' ? (
                    <img src={LightLogo} alt="Logo" style={{ height: 40, marginLeft: 10 }} />
                ) : (
                    <img src={DarkLogo} alt="Logo" style={{ height: 40, marginLeft: 10 }} />
                )}
            </Box>
            
            <Box display="flex">
                {/* Search Bar */}
                <Box
                    display='flex'
                    alignItems="center"
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    px={1}
                >
                    <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        placeholder="Search.."
                    />
                    <IconButton type="button">
                        <SearchIcon />
                    </IconButton>
                </Box>
                
                <Tooltip title="Change Mode">
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlinedIcon />
                        ) : (
                            <LightModeOutlinedIcon />
                        )}
                    </IconButton>
                </Tooltip>
                
                <Tooltip title="Notifications">
                    <IconButton>
                        <NotificationsOutlinedIcon />
                    </IconButton>
                </Tooltip>
                
                <Tooltip title="Profile">
                    <IconButton>
                        <PersonOutlinedIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Logout">
                    <IconButton onClick={handleLogout}>
                        <ForwardOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}

export default Navbar;
