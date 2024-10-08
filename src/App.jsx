
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import BasicTable from './components/Directory.jsx'
import EmployeeDetails from './components/Profile.jsx';
import { useState, useEffect } from 'react';

// import { Directions } from '@mui/icons-material';

import QuickLinks from './components/QuickLinks.jsx';
import EmployeeTable from './components/Directory.jsx';
import DepartmentTable from './components/Department.jsx';
import Payroll from './components/Payroll.jsx';
import PerformanceReviewForm from './components/Perfomance.jsx';
import LeaveForm from './components/Leave.jsx';
import LeaveTable from './components/LeaveApproval.jsx';
import PayrollDashboard from './components/PayrollDashboard.jsx';
import PayrollReport from './components/PayrollReport.jsx';
import PerformanceAnalytics from './components/PerformanceDashboard.jsx';
import Role from './components/Roles.jsx';
import Reports from './components/Report.jsx';
import LoginPage from './components/Login.jsx';
import EmployeeReport from './components/EmpReport.jsx';
import LeaveHistory from './components/LeaveHistory.jsx';
import Notification from './components/Notification.jsx';



// import EmployeeForm from './components/EmployeeForm'
function App() {
 
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={<QuickLinks />} />
        <Route path="/performance-management" element={<PerformanceReviewForm />} />
        <Route path="/performance-analytics" element={<PerformanceAnalytics />} />
        <Route path="/payroll" element={<Payroll/>}/>
        <Route path="/roles" element={<Role/>}/>
        <Route path="/reports" element={<Reports/>}/>
        <Route path="/empreport" element={<EmployeeReport/>}/>
        <Route path="/payroll-dashboard" element={<PayrollDashboard/>}/>
        <Route path="/leave" element={<LeaveForm/>}/>
        <Route path="/leave-history" element={<LeaveHistory/>}/>
        <Route path="/leave-approval" element={<LeaveTable/>}/>
        <Route path="/payroll-report" element={<PayrollReport/>}/>
        <Route path="/directory" element={<EmployeeTable/>}/>
        <Route path="/profile/:name" element={<EmployeeDetails/>}/>
        <Route path="/department-management" element={<DepartmentTable/>}/>
        <Route path="/notification" element={<Notification/>}/>
      </Routes>
      
    </Router>
   
  )
}

export default App
