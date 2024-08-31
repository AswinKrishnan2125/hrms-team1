import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import RolesIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import { auth, db } from '../fireBaseConfig'; // Import Firebase configuration
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Sidebar = () => {
  const navigate = useNavigate(); // Hook for navigation (React Router)
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const employeeRef = doc(db, 'Employee', user.uid); // Fetch from Employee collection
        const docSnap = await getDoc(employeeRef);

        if (docSnap.exists()) {
          setUserName(docSnap.data().name); // Assuming 'name' field exists
        }
      }
    };

    fetchUserName();
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue); // Navigate to the selected page
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase Authentication
      navigate('/'); // Redirect to the login page after successful logout
    } catch (error) {
      console.error('Error signing out: ', error); // Handle any errors that occur during sign out
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-gray-800 flex flex-col">
      <div className="flex flex-col items-center py-2.5">
        <img
          src="https://via.placeholder.com/40"
          alt="profile"
          className="rounded-full w-10 h-10 mb-4"
        />
        <h1 className="text-white text-center block py-2 px-4 rounded">{userName || 'Loading...'}</h1>
      </div>

      <div className="flex flex-col flex-grow">
        <ul className="space-y-2 p-4">
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/"
            >
              <EventIcon className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/roles"
            >
              <RolesIcon className="mr-2" />
              Roles
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/directory"
            >
              <PeopleIcon className="mr-2" />
              Employee
            </Link>
          </li>
          <li>
            <Link
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              to="/department-management"
            >
              <BusinessIcon className="mr-2" />
              Department
            </Link>
          </li>
          <li>
            <select
              className="text-white bg-gray-800 text-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              onChange={handleSelectChange}
            >
              <option value="">Leave Management</option>
              <option value="/leave">Leave Request</option>
              <option value="/leave-approval">Leave Approval</option>
              <option value="/leave-history">Leave History</option>
            </select>
          </li>
          <li>
            <select
              className="text-white bg-gray-800 text-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              onChange={handleSelectChange}
            >
              <option value="">Payroll Management</option>
              <option value="/payroll-dashboard">Payroll Dashboard</option>
              <option value="/payroll">Payroll Records</option>
              <option value="/payroll-report">Payroll Report</option>
            </select>
          </li>
          <li>
            <a
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              href="/performance-analytics"
            >
              <AssessmentIcon className="mr-2" />
              Performance Management
            </a>
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
            <button
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200 w-full text-left"
              onClick={handleLogout}
            >
              <LogoutIcon className="mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
