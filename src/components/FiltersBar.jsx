function FiltersBar({
  showTasks,
  setShowTasks,
  showDone,
  setShowDone,
  showImportant,
  setShowImportant,
  normalTasksCount,
  doneTasksCount,
  importantTasksCount,
  onAddTask,
}) {
  return (
    // Filters bar for toggling task lists
    <div className="flex flex-wrap gap-2 sm:gap-3 items-center mb-8 w-full bg-transparent">
      {/* Tasks filter button (shows normal tasks) */}
      {normalTasksCount > 0 && (
        <button
          onClick={() => setShowTasks((v) => !v)}
          className={`flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full font-semibold border shadow transition
            ${
              showTasks
                ? "bg-transparent hover:bg-gray-100 border-gray-300 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                : "bg-transparent border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
            }
            focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700
          `}
          type="button"
          title="Show/hide tasks"
        >
          <span className="text-lg" role="img" aria-label="tasks">
            📋
          </span>
          Tasks
          <span
            className={`inline-block min-w-6 px-2 py-0.5 rounded-full text-xs font-bold text-center
              ${
                showTasks
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
              }
            `}
          >
            {normalTasksCount}
          </span>
        </button>
      )}

      {/* Important filter button (shows important tasks) */}
      {importantTasksCount > 0 && (
        <button
          onClick={() => setShowImportant((v) => !v)}
          className={`flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full font-semibold border shadow transition
            ${
              showTasks
                ? "bg-transparent hover:bg-gray-100 border-gray-300 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                : "bg-transparent border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
            }
            focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-700
          `}
          type="button"
          title="Show/hide important tasks"
        >
          <span role="img" aria-label="important" className="text-lg">
            🔥
          </span>
          Important
          <span
            className={`inline-block min-w-6 px-2 py-0.5 rounded-full text-xs font-bold text-center
              ${
                showImportant
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
              }
            `}
          >
            {importantTasksCount}
          </span>
        </button>
      )}
      {/* Done filter button (shows done tasks) */}
      {doneTasksCount > 0 && (
        <button
          onClick={() => setShowDone((v) => !v)}
          className={`flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full font-semibold border shadow transition
      ${
        showTasks
          ? "bg-transparent hover:bg-gray-100 border-gray-300 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          : "bg-transparent border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
      }
      focus:outline-none focus:ring-2 focus:ring-green-200 dark:focus:ring-green-700
    `}
          type="button"
          title="Show/hide done tasks"
        >
          <span className="text-lg" role="img" aria-label="done">
            ✅
          </span>
          Done
          <span
            className={`inline-block min-w-6 px-2 py-0.5 rounded-full text-xs font-bold text-center
        ${
          showDone
            ? "bg-green-600 text-white"
            : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
        }
      `}
          >
            {doneTasksCount}
          </span>
        </button>
      )}
      {/* Add task button */}
      <button
        aria-label="Add task"
        onClick={onAddTask}
        className=" ml-auto px-4 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full border border-gray-300 font-semibold shadow transition bg-transparent hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
        type="button"
      >
        <span className="inline-flex items-center text-xl font-bold">+</span>
        <span className="hidden sm:inline">Add task</span>
      </button>
    </div>
  );
}

export default FiltersBar;
