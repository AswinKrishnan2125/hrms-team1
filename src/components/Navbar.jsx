


import React, { useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-[260px] w-[calc(100%-250px)] z-10">
      
      {/* Dashboard Link on the left side */}
      

      {/* Centered Search Input */}
      {/* <div className="absolute left-1/2 transform -translate-x-1/2">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-4 py-2"
        />
      </div> */}

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
