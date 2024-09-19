import React from 'react'
import { useTheme } from "@mui/material";
import { tokens } from "../theme";


export const ThemeColor = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return colors
}
