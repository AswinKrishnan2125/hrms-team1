
import React from "react";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-gray-800 flex flex-col ">
      
     
      <div className="flex flex-col items-center">
        
        <img
        src="https://via.placeholder.com/40"
        alt="profile"
        className="rounded-full w-8 h-8 mb-4"
        style={{ marginTop: '0px' }} // Apply 10px top margin
      />
      <h3>Employee Name</h3>

      </div>

      <div className="flex items-center justify-center h-screen">
  <ul className="space-y-6">
    <li>
      <a
        className="text-white text-center block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
        href="/directory"
      >
        Employee
      </a>
    </li>
    <li>
      <a
        className="text-white text-center block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
        href="/event"
      >
        Event
      </a>
    </li>
    <li>
      <a
        className="text-white text-center block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
        href="/leave-management"
      >
        Leave Management
      </a>
    </li>
    <li>
      <a
        className="text-white text-center block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
        href="/payroll"
      >
        Payroll
      </a>
    </li>
    <li>
      <a
        className="text-white text-center block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
        href="/attendance"
      >
        Attendance
      </a>
    </li>
    <li>
      <a
        className="text-white text-center block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
        href="/logout"
      >
        Logout
      </a>
    </li>
  </ul>
</div>

      
    </div>
  );
};

export default Sidebar;
