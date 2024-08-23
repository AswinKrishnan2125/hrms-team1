

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasicTable from './components/Directory.jsx'
import EmployeeDetails from './components/Profile.jsx';
import QuickLinks from './components/QuickLinks.jsx';
import EmployeeTable from './components/Directory.jsx';
import Department from './components/Department.jsx'
import Perfomance from './components/Perfomance.jsx'
// import EmployeeForm from './components/EmployeeForm'
function App() {
 

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<BasicTable/>}/> */}
        <Route path="/" element={<QuickLinks/>}/>
        <Route path="/directory" element={<EmployeeTable/>}/>

        {/* <Route path="/add" element={<EmployeeForm/>}/> */}
        <Route path="/profile/:name" element={<EmployeeDetails/>}/>
        <Route path="/department-management" element={<Department/>}/>
        <Route path="/perfomance" element={<Perfomance/>}/>
      </Routes>
    </Router>
   
  )
}

export default App
