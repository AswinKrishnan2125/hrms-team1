

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import BasicTable from './components/Directory.jsx'
import EmployeeDetails from './components/Profile.jsx';


// import { Directions } from '@mui/icons-material';


import QuickLinks from './components/QuickLinks.jsx';
import EmployeeTable from './components/Directory.jsx';
import DepartmentTable from './components/Department.jsx';
import Payroll from './components/Payroll.jsx';
import PerformanceReviewForm from './components/Perfomance.jsx';


// import EmployeeForm from './components/EmployeeForm'
function App() {
 

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<BasicTable/>}/> */}
        <Route path="/" element={<QuickLinks/>}/>
        <Route path="/performance" element={<PerformanceReviewForm/>}/>
        <Route path="/payroll" element={<Payroll/>}/>
        <Route path="/directory" element={<EmployeeTable/>}/>
        <Route path="/profile/:name" element={<EmployeeDetails/>}/>
        <Route path="/department-management" element={<DepartmentTable/>}/>
      </Routes>
      
    </Router>
   
  )
}

export default App
