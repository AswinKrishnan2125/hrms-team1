

import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import BasicTable from './components/Directory/Directory.jsx'
import EmployeeDetails from './components/Profile/Profile.jsx';
import EmployeeForm from './components/EmployeeForm'
function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BasicTable/>}/>
        <Route path="/add" element={<EmployeeForm/>}/>
        <Route path="/profile/:name" element={<EmployeeDetails/>}/>
      </Routes>
    </Router>
   
  )
}

export default App
