import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check the user's preference on initial load
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const handleToggle = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <nav className="flex justify-between items-center rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md fixed top-2 left-[260px] w-[calc(100%-250px)] z-10">
      {/* Dashboard Link on the left side */}
      <div className="flex items-center space-x-4">
        <a
          className="text-gray-700 dark:text-gray-200 text-lg font-semibold"
          href="/"
        >
          Dashboard
        </a>
      </div>

      <div className="flex items-center ml-auto space-x-4">
        <div className="flex space-x-4">
          <button
            onClick={handleToggle}
            className="text-gray-700 dark:text-gray-200 text-lg"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <a
            className="text-gray-700 dark:text-gray-200 text-lg"
            href="/notification"
          >
            🔔
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
