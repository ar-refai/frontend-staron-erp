import Navbar from "./pages/global/Navbar";
import { ColorModeContext, useMode } from "./theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from './pages/global/Sidebar';
import HR from './pages/hr/HR';
import Sales from './pages/sales/Sales';
import Finance from './pages/finance/Finance';
import Technical from './pages/technical/Technical';
import Operation from './pages/operation/Operation';
import Control from "./pages/control/Control";
import SupplyChain from './pages/supply_chain/SupplyChain';
import { Route, Routes } from "react-router-dom";
import Dashboard  from "./pages/dashboard/Dashboard";
import { useState } from 'react';
import AllEmployee from "./pages/hr/EmplyeesList";
import Attendance from "./pages/general/Attendance";
import Requests from "./pages/general/Requests";
import RequirementRequests from "./pages/general/RequirementRequests";
import TargetAndPerformence from "./pages/general/TargetAndPerformence";
import AttendanceTimesheet from "./pages/hr/Timesheet";
import WarningLog from "./pages/hr/WarningLog";
import LeaveBalance from "./pages/hr/LeaveBalance";
import IncentiveRemuneration from "./pages/hr/IncentiveRemuneration";
import Payroll from "./pages/hr/Payroll";
import RequirmentsApproval from "./pages/hr/RequirmentsApproval";
import RequestsApproval from "./pages/hr/RequestsApproval";


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
              <Container maxWidth="2xl">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/requirement-requests" element={<RequirementRequests />} />
              <Route path="/target-performance" element={<TargetAndPerformence />} />

              <Route path="/hr" element={<HR />}>
                <Route path="employees-list" element={<AllEmployee />} />
                <Route path="timesheet" element={<AttendanceTimesheet />} />
                <Route path="requests-approval" element={<RequestsApproval />} />
                <Route path="requirments-approval" element={<RequirmentsApproval />} />
                <Route path="payroll" element={<Payroll />} />
                <Route path="incentive-remuneration" element={<IncentiveRemuneration />} />
                <Route path="leave-balance" element={<LeaveBalance />} />
                <Route path="warning-log" element={<WarningLog />} />

              </Route>
              <Route path="/sales" element={<Sales />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/technical" element={<Technical />} />
              <Route path="/operation" element={<Operation />} />
              <Route path="/control" element={<Control />} />
              <Route path="/supply-chain" element={<SupplyChain />} />
            </Routes>
              </Container>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
