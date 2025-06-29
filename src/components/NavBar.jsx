function NavBar({ dateString, darkMode, setDarkMode }) {
  return (
    // Top navigation bar (fixed)
    <nav className="fixed top-0 left-0 w-full z-30 transition-colors bg-white border-b border-gray-200 text-black dark:bg-gray-800 dark:border-gray-700 dark:text-white">
      <div className="max-w-4xl mx-auto flex flex-row items-center justify-between px-2 sm:px-4 h-16 gap-2">
        {/* App title and logo */}
        <div className="font-semibold text-base sm:text-lg tracking-tight select-none flex items-center gap-2">
          <span>Yann's To-Do List</span>
          <span role="img" aria-label="logo" className="text-xl sm:text-2xl">
            🚀
          </span>
        </div>
        {/* Centered current date */}
        <div className="flex-1 flex justify-center items-center min-w-0">
          <span className="text-xs sm:text-sm font-medium select-none text-gray-700 dark:text-gray-300 truncate">
            {dateString}
          </span>
        </div>
        {/* Dark mode toggle button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode((v) => !v)}
            className="px-3 py-2 rounded-full transition font-bold focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={darkMode ? "#fff" : "#222"}
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1.5" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22.5" />
              <line x1="4.22" y1="4.22" x2="5.99" y2="5.99" />
              <line x1="18.01" y1="18.01" x2="19.78" y2="19.78" />
              <line x1="1.5" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22.5" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.99" y2="18.01" />
              <line x1="18.01" y1="5.99" x2="19.78" y2="4.22" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
