
// import React from "react";


// const Sidebar = () => {
//   return (
//     <div className="fixed top-0 left-0 h-full w-60 bg-gray-800 flex flex-col ">
      
     
//       <div className="flex flex-col items-center">
        
//         <img
//         src="https://via.placeholder.com/40"
//         alt="profile"
//         className="rounded-full w-20 h-20 mb-4"
//         style={{ marginTop: '40px' }} 
//       />
//       <h1 className="text-white text-center block py-2 px-4 rounded">Employee Name</h1>

//       </div>

//       <div className="flex items-center justify-center h-screen">
//   <ul className="space-y-6">
//     <li>
//       <a
//         className="text-white text-center block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
//         href="/directory"
//       >
        
//         Employee
//       </a>
//     </li>
//     <li>
//       <a
//         className="text-white text-center block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
//         href="/event"
//       >
               
//         Event
//       </a>
//     </li>
//     <li>
//       <a
//         className="text-white text-center block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
//         href="/leave-management"
//       >
//         Leave Management
//       </a>
//     </li>
//     <li>
//       <a
//         className="text-white text-center block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
//         href="/payroll"
//       >
//         Payroll
//       </a>
//     </li>
//     <li>
//       <a
//         className="text-white text-center block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
//         href="/attendance"
//       >
//         Attendance
//       </a>
//     </li>
//     <li>
//       <a
//         className="text-white text-center block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
//         href="/logout"
//       >
//         Logout
//       </a>
//     </li>
//   </ul>
// </div>

      
//     </div>
//   );
// };

// export default Sidebar;



import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
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
            <a
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              href="/directory"
            >
              <PersonIcon className="mr-2" />
              Employee
            </a>
          </li>
          <li>
            <a
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              href="/event"
            >
              <EventIcon className="mr-2" />
              Event
            </a>
          </li>
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
            <a
              className="text-white text-center flex items-center py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
              href="/logout"
            >
              <LogoutIcon className="mr-2" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
