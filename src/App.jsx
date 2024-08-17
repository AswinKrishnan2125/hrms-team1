

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasicTable from './components/Directory.jsx'
import EmployeeDetails from './components/Profile.jsx';
import QuickLinks from './components/QuickLinks.jsx';

import { Directions } from '@mui/icons-material';
import EmployeeTable from './components/Directory.jsx';

// import EmployeeForm from './components/EmployeeForm'
function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuickLinks/>}/>
        <Route path="/directory" element={<EmployeeTable/>}/>
        {/* <Route path="/add" element={<EmployeeForm/>}/> */}
        <Route path="/profile/:name" element={<EmployeeDetails/>}/>
      </Routes>
    </Router>
   
  )
}

export default App
