// import React from "react";



// const Navbar = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   const handleToggle = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle("dark");
//   };

//   return (
//     <nav className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-[260px] w-[calc(100%-250px)] z-10">
      
//       {/* Dashboard Link on the left side */}
//       <div className="flex items-center space-x-4">
//         <a className="text-gray-700 text-lg font-semibold" href="/">
//           Dashboard
//         </a>
//       </div>

//       {/* Centered Search Input */}
//       <div className="absolute left-1/2 transform -translate-x-1/2">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border rounded px-4 py-2"
//         />
//       </div>

//       {/* Right Side Icons and Profile */}
//       <div className="flex items-center ml-auto space-x-4">
//         <div className="space-x-2">
//           <a className="text-white w-full text-left" >
//             🌙
//           </a>
//           <a className="text-white w-full text-left" href="/notification">
//             🔔
//           </a>
//         </div>
        
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NotificationPopup from "./Notpop";

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
      case '/performance-analytics':
        return 'Performance Analytics';
      case '/payroll':
        return 'Payroll';
        case '/reports':
        return 'Reports';
        case '/roles':
        return 'Roll';
        case '/payroll-dashboard':
        return 'Payroll Dashboard';
        case '/payroll-report':
        return 'Payroll Report';
      case '/department-management':
        return 'Department';
      case '/performance-management':
        return 'Performance Review';
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
          {/* <a className="text-gray-700 text-lg">
            
          </a>
          <NotificationPopup /> */}
          <div className="relative">
  <a 
    className="text-gray-700 text-lg hover:text-gray-900 transition-colors duration-300 ease-in-out"
    aria-label="Notifications"
  >
    
  </a>
  <NotificationPopup 
    className="absolute top-10 right-0 w-64 p-4 bg-white shadow-lg rounded-lg border border-gray-200"
  />
</div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;