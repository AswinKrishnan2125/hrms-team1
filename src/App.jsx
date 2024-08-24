import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuickLinks from './components/QuickLinks.jsx';
import PerformanceReviewForm from './components/Perfomance.jsx';
import Payroll from './components/Payroll.jsx';
import EmployeeTable from './components/Directory.jsx';
import LeaveForm from './components/Leave.jsx';
import LeaveHistory from './components/LeaveHistory.jsx';
import EmployeeDetails from './components/Profile.jsx';
import Department from './components/Department.jsx';
import LeaveApproval from './components/LeaveApproval.jsx'; // Ensure this component exists

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuickLinks />} />
        <Route path="/performance" element={<PerformanceReviewForm />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/directory" element={<EmployeeTable />} />
        <Route path="/leave" element={<LeaveForm />} />
        <Route path="/leave-history" element={<LeaveHistory />} />
        <Route path="/profile/:name" element={<EmployeeDetails />} />
        <Route path="/department-management" element={<Department />} />
        <Route path="/leave-approval" element={<LeaveApproval />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
