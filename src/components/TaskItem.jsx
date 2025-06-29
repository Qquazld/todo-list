import { useState, useEffect } from "react";

function TaskItem({
  task,
  onDelete,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onEditTask,
  onUpdateStatus,
}) {
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDeadline, setEditDeadline] = useState(task.deadline);
  const [editPriority, setEditPriority] = useState(task.priority);

  // Reset edit fields when editing starts or task changes
  useEffect(() => {
    if (isEditing) {
      setEditTitle(task.title);
      setEditDescription(task.description);
      setEditDeadline(task.deadline);
      setEditPriority(task.priority);
    }
  }, [isEditing, task]);

  // Handle edit form submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle) {
      onEditTask(task.id, {
        ...task,
        title: trimmedTitle,
        description: editDescription,
        deadline: editDeadline,
        priority: editPriority,
      });
    } else {
      onCancelEdit();
    }
  };

  // Toggle task done/undone
  const handleCheckboxChange = () => {
    onUpdateStatus(task.id, task.status === "done" ? "todo" : "done");
  };

  // Compute deadline info for display
  let deadlineInfo = null;
  if (task.deadline) {
    const today = new Date();
    const deadlineDate = new Date(task.deadline);
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);
    const diffMs = deadlineDate - today;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      deadlineInfo = (
        <span className="text-xs text-blue-600 dark:text-blue-300 ml-4">
          {diffDays} day{diffDays > 1 ? "s" : ""} left
        </span>
      );
    } else if (diffDays === 0) {
      deadlineInfo = (
        <span className="text-xs text-red-600 dark:text-red-400 font-semibold ml-4">
          Today !
        </span>
      );
    } else {
      deadlineInfo = (
        <span className="text-xs text-red-600 dark:text-red-400 font-semibold ml-4">
          Overdue!
        </span>
      );
    }
  }

  // --- UI ---

  // Edit mode: show edit form
  if (isEditing) {
    return (
      <li className="bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm px-3 py-3 mb-2">
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
            placeholder="Task title"
            required
            autoFocus
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm resize-none bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
            placeholder="Description (optional)"
            rows={2}
          />
          <div className="flex gap-2">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm bg-white dark:bg-gray-900 text-black dark:text-white"
            >
              <option value="normal">Normal</option>
              <option value="important">Important</option>
            </select>
            <input
              type="date"
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
              className="border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm bg-white dark:bg-gray-900 text-black dark:text-white"
              min={new Date().toISOString().slice(0, 10)}
            />
          </div>
          <div className="flex gap-2 mt-1">
            <button
              type="submit"
              className="px-3 py-1 rounded-lg border border-blue-300 bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900  dark:text-white dark:text-gray-300 font-semibold text-xs hover:bg-red-400 dark:hover:bg-red-800 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  // Classes for task item and text
  let textClass =
    "mr-2 flex-1 text-base font-medium truncate transition text-black dark:text-white";
  let liClass =
    "bg-neutral-50 px-2 py-2 sm:px-3 sm:py-3 text-sm sm:text-base dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm mb-2 hover:shadow-md transition group";

  // Style for done tasks
  if (task.status === "done") {
    textClass +=
      " line-through text-gray-400 dark:text-gray-500 font-semibold opacity-80";
    liClass +=
      " bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-700";
  }

  // Display task item
  return (
    <li className={liClass}>
      <div className="flex items-center gap-2">
        {/* Checkbox to mark task as done */}
        <input
          type="checkbox"
          checked={task.status === "done"}
          onChange={handleCheckboxChange}
          className="accent-green-600 w-5 h-5 rounded focus:ring-2 focus:ring-blue-200 transition"
        />
        {/* Task title */}
        <span className={textClass}>{task.title}</span>
        {/* Deadline info */}
        {deadlineInfo}
        {/* Edit button */}
        <button
          onClick={() => onStartEdit(task.id)}
          className="ml-2 p-1 rounded"
          title="Edit"
        >
          <span className="text-lg">✏️</span>
        </button>
        {/* Delete button */}
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 rounded "
          title="Delete"
        >
          <span className="text-lg">🗑️</span>
        </button>
      </div>
      {/* Task description */}
      {task.description && (
        <div className="ml-7 mt-1 text-sm text-gray-500 dark:text-gray-300 truncate">
          {task.description}
        </div>
      )}
    </li>
  );
}

export default TaskItem;
