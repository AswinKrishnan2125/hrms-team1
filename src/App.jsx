

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import EmployeeDetails from './components/Profile.jsx';
import QuickLinks from './components/QuickLinks.jsx';
import EmployeeTable from './components/Directory.jsx';
import Department from './components/Department.jsx'
import LeaveForm from './components/Leave.jsx';
import LeaveTable from './components/LeaveApproval.jsx';
import LeaveHistory from './components/LeaveHistory.jsx';


function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuickLinks/>}/>
        <Route path="/directory" element={<EmployeeTable/>}/>
        <Route path="/leave" element={<LeaveForm/>}/>
        <Route path="/profile/:name" element={<EmployeeDetails/>}/>
        <Route path="/department-management" element={<Department/>}/>
        <Route path="/leave-approval" element={<LeaveTable/>}/>
        <Route path="/leave-history" element={<LeaveHistory/>}/>
      </Routes>
    </Router>
   
  )
}

export default App
