import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./pages/global/Navbar";
import Sidebar from './pages/global/Sidebar';
import { ColorModeContext, useMode } from "./theme";
import HR from './pages/hr/HR';
import Sales from './pages/sales/Sales';
import Finance from './pages/finance/Finance';
import Technical from './pages/technical/Technical';
import Operation from './pages/operation/Operation';
import Control from "./pages/control/Control";
import SupplyChain from './pages/supply_chain/SupplyChain';
// General
import Dashboard from "./pages/dashboard/Dashboard";
import Attendance from "./pages/general/Attendance";
import Requests from "./pages/general/Requests";
import RecruitmentRequests from "./pages/general/RecruitmentRequests";
import TargetAndPerformence from "./pages/general/TargetAndPerformence";
import Login from "pages/login/login";
// Human Resources
import AttendanceTimesheet from "./pages/hr/Timesheet";
import AllEmployee from "./pages/hr/EmplyeesList";
import WarningLog from "./pages/hr/WarningLog";
import LeaveBalance from "./pages/hr/LeaveBalance";
import IncentiveRemuneration from "./pages/hr/IncentiveRemuneration";
import Payroll from "./pages/hr/Payroll";
import RecruitmentApproval from "./pages/hr/RecruitmentApproval";
import RequestsApproval from "./pages/hr/RequestsApproval";
// Sales
import FunnelWorkFlow from "pages/sales/FunnelWorkFlow";
import StakeholdersListing from "pages/sales/StakeholdersListing";
import Analytics from "pages/sales/Analytics";
import ActivityLogs from "pages/sales/ActivityLogs";
// Technical
import QuotationGenerationFramework from "pages/technical/QuotationGenerationFramework";
// Control
import MonthlyFramework from 'pages/control/MonthlyFramework';
import ProductivityTracking from 'pages/control/ProductivityTracking';
import ProcurementRequests from 'pages/control/ProcurementRequests';
import WarehouseRequests from 'pages/control/WarehouseRequests';
import PackageDevelopment from 'pages/control/PackageDevelopment';
// SupplyChain
import SupplyProcurementRequests from 'pages/supply_chain/ProcurementRequests';
import SupplyWarehouseRequests from 'pages/supply_chain/WarehouseRequests';
import SupplyersListing from 'pages/supply_chain/SupplyersListing';
import StockLog from 'pages/supply_chain/StockLog';
import TreasuryRequests from 'pages/supply_chain/TreasuryRequests';
// Operation
import OperationProcurementRequests from 'pages/operation/ProcurementRequests';
import OperationMonthlyFramework from 'pages/operation/MonthlyFramework';
import OperationWeeklyFramework from 'pages/operation/WeeklyFramework';
import OperationPackageDevelopment from 'pages/operation/PackageDevelopment';
import OperationWarehouseRequests from 'pages/operation/WarehouseRequests';
// Finance
import FinanceProcurementRequests from 'pages/finance/ProcurementRequests';
import FinanceStockListing from "pages/finance/StockListing";
import FinanceStockLog from 'pages/finance/StockLog';
import FinanceConversionValidation from "pages/finance/ConversionValidation.jsx";
import FinanceWarehouseRequests from "pages/finance/WarehouseRequests";
import FinanceFinancialReports from "pages/finance/FinancialReports"; 

// Main Function
function App() {
  const [theme, colorMode] = useMode();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  function adjustZoom() {
    const zoomRange = document.getElementById('zoomRange');
    const zoomableDiv = document.getElementById('zoomableDiv');

    if (!zoomRange) {
        console.error('Element with ID "zoomRange" not found');
        return;
    }

    if (!zoomableDiv) {
        console.error('Element with ID "zoomableDiv" not found');
        return;
    }

    const zoomValue = parseFloat(zoomRange.value);
    const scaleFactor = Math.pow(10, zoomValue);
    zoomableDiv.style.transform = `scale(${scaleFactor})`;
}

  useEffect(() => {
    // Initial adjustment on page load
    adjustZoom();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
          {!isLoginPage && <Sidebar open={open} handleDrawerClose={handleDrawerClose} />}
            <main className="content">
            {!isLoginPage && <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />}
              <Container 
              maxWidth={false} 
              style={{ 
                  overflow: 'hidden', 
                  width: '100%',
                  
                }}>
                <Routes>

                  {/* Login Link */}
                  <Route path="/" element={<Login />} />

                  {/* General Links */}
                  <Route path="/global">
                    <Route path="dashboard" element={
                      <div className="zoomablediv" id="zoomableDiv">
                        <Dashboard />
                      </div>
                    } />
                    <Route path="attendance" element={
                      <div className="zoomablediv" id="zoomableDiv">
                        <Attendance />
                      </div>
                    } />
                    <Route path="requests" element={<Requests />} />
                    <Route path="recruitment-requests" element={<RecruitmentRequests />} />
                    <Route path="target-performance" element={<TargetAndPerformence />} />
                  </Route>

                  {/* HR Links */}
                  <Route path="/hr" element={<HR />}>
                    <Route path="employees-list" element={<AllEmployee />} />
                    <Route path="timesheet" element={<AttendanceTimesheet />} />
                    <Route path="requests-approval" element={<RequestsApproval />} />
                    <Route path="recruitment-approval" element={<RecruitmentApproval />} />
                    <Route path="payroll" element={<Payroll />} />
                    <Route path="incentive-remuneration" element={<IncentiveRemuneration />} />
                    <Route path="leave-balance" element={<LeaveBalance />} />
                    <Route path="warning-log" element={<WarningLog />} />
                  </Route>

                  {/* Sales Links */}
                  <Route path="/sales" element={<Sales />} >
                    <Route path="funnel-workflow" element={<FunnelWorkFlow />} />
                    <Route path="stakeholders-listing" element={<StakeholdersListing />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="activity-log" element={<ActivityLogs />} />
                  </Route>

                  {/* Technical Links */}
                  <Route path="/technical" element={<Technical />} >
                    <Route path="quotation-generation-framework" element={<QuotationGenerationFramework />} />
                  </Route>

                    {/* Control Links */}
                  <Route path="/control" element={<Control />} >
                  {/* Add control-related routes here */}
                  {/* Monthy Framework */}
                  <Route path="monthly-framework" element={<MonthlyFramework/>}/>
                  <Route path="package-development" element={<PackageDevelopment/>}/>
                  {/* Weekly Framework */}
                  <Route path="productivity-tracking" element={<ProductivityTracking/>}/>
                  <Route path="procurement-requests" element={<ProcurementRequests/>}/>
                  {/* Other Link */}
                  <Route path="warehouse-requests" element={<WarehouseRequests/>}/>
                  </Route>
                  
                  {/* Finance Links */}
                  <Route path="/finance" element={<Finance />} >
                    {/* Add Finance-related routes here */}
                    <Route path="finance-procurement-requests" element={<FinanceProcurementRequests />} />
                    <Route path="finance-financial-reports" element={<FinanceFinancialReports />} />
                    <Route path="finance-conversion-validation" element={<FinanceConversionValidation/>}/>
npm 
                  </Route>

                  {/* Operation Links */}
                  <Route path="/operation" element={<Operation />} >
                  {/* Add operation-related routes here */}
                  <Route path="operation-monthly-framework" element={<OperationMonthlyFramework />} />
                  <Route path="operation-weekly-framework" element={<OperationWeeklyFramework />} />
                  <Route path="operation-procurement-requests" element={<OperationProcurementRequests />} />
                  <Route path="operation-package-development" element={<OperationPackageDevelopment />} />
                  <Route path="operation-warehouse-requests" element={<OperationWarehouseRequests />} />

                  </Route>

                  

                  {/* Supply Chain Links */}
                  <Route path="/supply-chain" element={<SupplyChain />} >
                    {/* Add supply-chain-related routes here */}
                    <Route path="supplyers-listing" element={<SupplyersListing/>}/>
                    <Route path="stock-log" element={<StockLog/>}/>
                    <Route path="treasury-requests" element={<TreasuryRequests/>}/>
                    <Route path="procurement-requests" element={<SupplyProcurementRequests/>}/>
                    <Route path="warehouse-requests" element={<SupplyWarehouseRequests/>}/>
                  </Route>

                  {/* Supply Chain Links */}
                  <Route path="/warehouse" element={<SupplyChain />} >
                    {/* Add warehouse-related routes here */}
                    
                  </Route>

                </Routes>
              </Container>
            </main>
          </div>
          
          {/* {
            !isLoginPage &&
            <input
            id="zoomRange"
            className="c_OUdw"
            style={{
              position: "absolute",
              right: 10,
              bottom: 10,
              zIndex: 100,
            }}
            type="range"
            min="-0.5"
            max="0.5"
            step="0.001"
            aria-label="Zoom"
            aria-valuetext="10%"
            defaultValue="0"
            onInput={adjustZoom}
          />} */}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
