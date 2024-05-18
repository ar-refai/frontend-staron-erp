import Navbar from "./pages/global/Navbar";
import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from './pages/global/Sidebar';
import HR from './pages/hr/HR';
import Sales from './pages/sales/Sales';
import Finance from './pages/finance/Finance';
import Technical from './pages/technical/Technical';
import Operation from './pages/operation/Operation';
import Control from "./pages/control/Control";
import SupplyChain from './pages/supply_chain/SupplyChain';
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
import {useState} from 'react';

function App() {
  const [theme, colorMode] = useMode();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
          <main className="content">
          <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/hr" element={<HR/>} />
              <Route path="/sales" element={<Sales/>} />
              <Route path="/finance" element={<Finance/>} />
              <Route path="/technical" element={<Technical/>} />
              <Route path="/operation" element={<Operation/>} />
              <Route path="/control" element={<Control/>} />
              <Route path="/supply-chain" element={<SupplyChain/>} />




            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
