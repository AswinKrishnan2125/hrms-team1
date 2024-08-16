import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-[260px] w-[calc(100%-250px)] z-10">
      
      {/* Dashboard Link on the left side */}
      <div className="flex items-center space-x-4">
        <a className="text-gray-700 text-lg font-semibold" href="/">
          Dashboard
        </a>
      </div>

      {/* Centered Search Input */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-4 py-2"
        />
      </div>

      {/* Right Side Icons and Profile */}
      <div className="flex items-center ml-auto space-x-4">
        <div className="space-x-2">
          <a className="text-white w-full text-left" href="/notification">
            🌙
          </a>
          <a className="text-white w-full text-left" href="/notification">
            🔔
          </a>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
