
import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link from react-router-dom
import EventIcon from '@mui/icons-material/Event';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom"; // If using React Router for navigation

const Sidebar = () => {
  const navigate = useNavigate(); // Hook for navigation

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
          className="rounded-full w-20 h-20 mb-4"
          style={{ marginTop: '40px' }} 
        />
        <h1 className="text-white text-center block py-2 px-4 rounded">Employee Name</h1>
      </div>

      <div className="flex items-center justify-center h-screen">
        <ul className="space-y-6">
          <li>
            <select
              className="text-white bg-gray-800 text-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              onChange={handleSelectChange}
            >
              <option value="/">Employee Management</option>
              <option value="/department-management">Department</option>
              <option value="/directory">Employee List</option>
            </select>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/event"
            >
              <EventIcon className="mr-2" />
              Event
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/leave-management"
            >
              <BeachAccessIcon className="mr-2" />
              Leave Management
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/payroll"
            >
              <AttachMoneyIcon className="mr-2" />
              Payroll
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/attendance"
            >
              <AccessTimeIcon className="mr-2" />
              Attendance
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/performance-management"
            >
              <AssessmentIcon className="mr-2" />
              Performance Management
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/reports"
            >
              <ReportIcon className="mr-2" />
              Reports
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/settings"
            >
              <SettingsIcon className="mr-2" />
              Settings
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/help-support"
            >
              <HelpOutlineIcon className="mr-2" />
              Help & Support
            </Link>
          </li>
          <li>
            <a
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              href="/performance-management"
            >
              <AssessmentIcon className="mr-2" />
              Performance Management
            </a>
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