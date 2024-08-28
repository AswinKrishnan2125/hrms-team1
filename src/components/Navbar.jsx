

import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Map the current route to a page name
  const getPageName = () => {
    const path = location.pathname;

    if (path.startsWith('/profile/')) {
      return 'Profile'; // For dynamic routes like /profile/:name
    }

    switch (path) {
      case '/':
        return 'Dashboard';
      case '/directory':
        return 'Employee';
      case '/performance':
        return 'Performance';
      case '/payroll':
        return 'Payroll';
        case '/payroll-dashboard':
        return 'Payroll Dashboard';
        case '/payroll-report':
        return 'Payroll Report';
      case '/department-management':
        return 'Department';
      case '/performance-review':
        return 'Performance';
      // Add more cases as needed
      default:
        return 'Dashboard'; // Default name
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-[260px] w-[calc(100%-250px)] z-10">
      {/* Dashboard Link on the left side */}
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold">{getPageName()}</span>
      </div>

      {/* Right Side Icons and Profile */}
      <div className="flex items-center ml-auto space-x-4">
        <div className="flex space-x-4">
          <button
            onClick={handleToggle}
            className="text-gray-700 text-lg"
          >
            {darkMode ? "☀" : "🌙"}
          </button>
          <a className="text-gray-700 text-lg" href="/notification">
            🔔
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;