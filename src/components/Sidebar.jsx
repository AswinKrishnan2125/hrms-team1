


import React from "react";
import EventIcon from '@mui/icons-material/Event';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import LogoutIcon from '@mui/icons-material/Logout';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Sidebar = () => {
  const navigate = useNavigate(); // Hook for navigation (React Router)

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue); // Navigate to the selected page
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-gray-800 flex flex-col">
      <div className="flex flex-col items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="profile"
          className="rounded-full w-10 h-10 mb-4"
          style={{ marginTop: '15px' }} 
        />
        <h1 className="text-white text-center block py-2 px-4 rounded">Employee Name</h1>
      </div>

      <div className="flex items-center justify-center h-screen">
        <ul className="space-y-6">
          
         
           
          <li>
            <a
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              href="/leave-management"
            >
              <BeachAccessIcon className="mr-2" />
              Leave Management
            </a>
          </li>
          <li>
            <a
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              href="/payroll"
            >
              <AttachMoneyIcon className="mr-2" />
              Payroll
            </a>
          </li>
          <li>
            <a
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              href="/attendance"
            >
              <AccessTimeIcon className="mr-2" />
              Attendance
            </a>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              href="/performance-management"
            >
              <AssessmentIcon className="mr-2" />
              Performance Management
            </Link>
          </li>
          <li>
            <a
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              href="/reports"
            >
              <ReportIcon className="mr-2" />
              Reports
            </a>
          </li>
          <li>
            <a
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              href="/settings"
            >
              <SettingsIcon className="mr-2" />
              Settings
            </a>
          </li>
          <li>
            <a
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              href="/help-support"
            >
              <HelpOutlineIcon className="mr-2" />
              Help & Support
            </a>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/logout"
            >
              <LogoutIcon className="mr-2" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;