import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import inputBase from "@mui/material";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon  from "@mui/icons-material/DarkModeOutlined";
import { NotificationsModeOutlinedIcon } from "@mui/icons-material/LightModeOutlined";
import { SettingsModeOutlinedIcon } from "@mui/icons-material/LightModeOutlined";
import { PersonModeOutlinedIcon } from "@mui/icons-material/LightModeOutlined";
import { SearchModeOutlinedIcon } from "@mui/icons-material/LightModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";


const Navbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box
            display={'flex'}
            justifyContent={"space-between"}
            p={2}
            sx={{backgroundColor: colors.primary[400]}}
            >
            {/* Search Bar */}
            <Box
                display='flex'
                backgroundColor={colors.primary[400]}
                borderRadius="3px">
                <InputBase
                    sx={{ ml: 2, flex: 1 }}
                    placeholder="Search.." />


                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box display="flex">
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
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>

        </Box>

    )
}

export default Navbar 