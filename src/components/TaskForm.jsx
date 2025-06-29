import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("normal");

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onAddTask({
        title: trimmedTitle,
        description,
        deadline,
        status: "todo",
        priority,
      });
      setTitle("");
      setDescription("");
      setDeadline("");
      setPriority("normal");
    }
  };

  return (
    // Task creation form
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Task title input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Task title"
        required
        autoFocus
      />
      {/* Task description input */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
        placeholder="Description (optional)"
        maxLength="50"
        rows={2}
      />
      {/* Task deadline input */}
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-200"
        min={new Date().toISOString().slice(0, 10)}
      />
      {/* Task priority select */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option value="normal">Normal</option>
        <option value="important">Important</option>
      </select>
      {/* Submit button */}
      <button
        type="submit"
        className="mt-2 px-4 py-2 rounded-lg bg-blue-400 text-white font-semibold shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        Add
      </button>
    </form>
  );
}

export default TaskForm;
