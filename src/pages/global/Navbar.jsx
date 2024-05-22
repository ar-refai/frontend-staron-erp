import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon  from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LightLogo from "../../assets/light-logo.png";
import DarkLogo from "../../assets/dark-logo.png";

const Navbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box
            display={'flex'}
            justifyContent={"space-between"}
            alignItems="center"
            p={2}
        >
            {/* Logo */}
            <Box>
                {
                    theme.palette.mode === 'dark' ?
                    <img src={LightLogo} alt="Logo" style={{ height: 40, marginLeft: 10 }} />
                    : 
                    <img src={DarkLogo} alt="Logo" style={{ height: 40, marginLeft: 10 }} />

                }
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
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Navbar;
