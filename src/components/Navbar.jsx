// // import React from "react";



// // const Navbar = () => {
// //   const [darkMode, setDarkMode] = useState(false);

// //   const handleToggle = () => {
// //     setDarkMode(!darkMode);
// //     document.documentElement.classList.toggle("dark");
// //   };

// //   return (
// //     <nav className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-[260px] w-[calc(100%-250px)] z-10">
      
// //       {/* Dashboard Link on the left side */}
// //       <div className="flex items-center space-x-4">
// //         <a className="text-gray-700 text-lg font-semibold" href="/">
// //           Dashboard
// //         </a>
// //       </div>

// //       {/* Centered Search Input */}
// //       <div className="absolute left-1/2 transform -translate-x-1/2">
// //         <input
// //           type="text"
// //           placeholder="Search..."
// //           className="border rounded px-4 py-2"
// //         />
// //       </div>

// //       {/* Right Side Icons and Profile */}
// //       <div className="flex items-center ml-auto space-x-4">
// //         <div className="space-x-2">
// //           <a className="text-white w-full text-left" >
// //             🌙
// //           </a>
// //           <a className="text-white w-full text-left" href="/notification">
// //             🔔
// //           </a>
// //         </div>
        
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;




// import React, { useState } from "react";

// const Navbar = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   const handleToggle = () => {
//     setDarkMode(!darkMode);
//     if (darkMode) {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     } else {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     }
//   };

//   // Map the current route to a page name
//   const getPageName = () => {
//     switch (location.pathname) {
//       case '/':
//         return 'Dashboard';
//       case '/directory':
//         return 'Employee';
//       case '/perfomance':
//         return 'Performance';
//       case '/profile/:name':
//         return 'Profile';
//       case '/department-management':
//         return 'Department';
//       // Add more cases as needed
//       default:
//         return 'Dashboard'; // Default name
//     }
//   };

//   return (
//     <nav className="flex justify-between items-center rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md fixed top-2 left-[260px] w-[calc(100%-250px)] z-10">
//       {/* Dashboard Link on the left side */}
//       <div className="flex items-center space-x-4">
//         <a className="text-gray-700 text-lg font-semibold" href="/">
//           Dashboard
//         </a>
//       </div>

//       <div className="flex items-center ml-auto space-x-4">
//         <div className="flex space-x-4">
//           <button
//             onClick={handleToggle}
//             className="text-gray-700 dark:text-gray-200 text-lg"
//           >
//             {darkMode ? "☀️" : "🌙"}
//           </button>
//           <a
//             className="text-gray-700 dark:text-gray-200 text-lg"
//             href="/notification"
//           >
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
            {darkMode ? "☀️" : "🌙"}
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
