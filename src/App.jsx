import { useState, useEffect } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import FiltersBar from "./components/FiltersBar";
import Modal from "./components/Modal";

const LOCAL_STORAGE_KEY = "todo-app-tasks";

function App() {
  // State for all tasks, loaded from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // State for editing, modal, filters, and dark mode
  const [editingId, setEditingId] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showTasks, setShowTasks] = useState(true);
  const [showImportant, setShowImportant] = useState(true);
  const [showDone, setShowDone] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Persist tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Toggle dark mode class on body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Business logic
  // Add a new task to the list
  const addTask = ({ title, description, deadline, status, priority }) => {
    const task = {
      id: Date.now(),
      title: title || "",
      description: description || "",
      deadline: deadline || "",
      status: status || "todo",
      priority: priority || "normal",
    };
    setTasks([...tasks, task]);
  };

  // Remove a task by id
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingId === id) setEditingId(null);
  };

  // Update the status (done/todo) of a task
  const updateTaskStatus = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // Edit a task's content
  const editTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
    setEditingId(null);
  };

  // Handlers for form and editing actions
  const handleAddTask = (taskData) => {
    addTask(taskData);
    setShowTaskForm(false);
  };
  const handleDeleteTask = (id) => deleteTask(id);
  const handleUpdateTaskStatus = (id, newStatus) =>
    updateTaskStatus(id, newStatus);
  const handleStartEdit = (id) => setEditingId(id);
  const handleCancelEdit = () => setEditingId(null);
  const handleEditTask = (id, updatedTask) => editTask(id, updatedTask);

  // Filter tasks by type for each section
  const normalTasks = tasks.filter(
    (t) => t.status !== "done" && t.priority !== "important"
  );
  const importantTasks = tasks.filter(
    (t) => t.status !== "done" && t.priority === "important"
  );
  const doneTasks = tasks.filter((t) => t.status === "done");

  // Format today's date for the NavBar
  const today = new Date();
  const dateString = today.toLocaleDateString("en-EN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-gray-900 text-black dark:text-white">
      {/* Top navigation bar */}
      <NavBar
        dateString={dateString}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Modal for adding a new task */}
      <Modal open={showTaskForm} onClose={() => setShowTaskForm(false)}>
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-black dark:text-white">
          Add a new task
        </h2>
        <TaskForm onAddTask={handleAddTask} onlyUrgentOrNormal />
      </Modal>

      <main className="flex-1 flex flex-col items-center pt-20 px-4 sm:px-8">
        <div className="w-full max-w-4xl flex flex-col gap-8 mt-6">
          {/* Empty state if no tasks */}
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-24">
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-200">
                No tasks yet. Add one to get started!
              </p>

              <button
                aria-label="Add task"
                onClick={() => setShowTaskForm(true)}
                className="px-5 py-2 rounded-full border border-gray-300 font-semibold shadow transition bg-transparent hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                type="button"
              >
                + Add a task
              </button>
            </div>
          ) : (
            <>
              {/* Filters bar for toggling task lists */}
              <FiltersBar
                showTasks={showTasks}
                setShowTasks={setShowTasks}
                showDone={showDone}
                setShowDone={setShowDone}
                showImportant={showImportant}
                setShowImportant={setShowImportant}
                normalTasksCount={normalTasks.length}
                doneTasksCount={doneTasks.length}
                importantTasksCount={importantTasks.length}
                onAddTask={() => setShowTaskForm(true)}
              />
              <div className="flex flex-col gap-8 w-full">
                {/* Important tasks section */}
                {showImportant && importantTasks.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-lg sm:text-xl font-bold text-red-600 flex items-center gap-1">
                        🔥 Important
                      </h2>
                      <span className="text-xs bg-red-100 text-red-600 rounded px-2 py-0.5">
                        {importantTasks.length}
                      </span>
                    </div>
                    <TaskList
                      tasks={importantTasks}
                      onDelete={handleDeleteTask}
                      onUpdateStatus={handleUpdateTaskStatus}
                      editingId={editingId}
                      onStartEdit={handleStartEdit}
                      onCancelEdit={handleCancelEdit}
                      onEditTask={handleEditTask}
                    />
                  </section>
                )}
                {/* Normal tasks section */}
                {showTasks && normalTasks.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-lg sm:text-xl font-bold text-blue-700 flex items-center gap-1">
                        🗒️ Tasks
                      </h2>
                      <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5">
                        {normalTasks.length}
                      </span>
                    </div>
                    <TaskList
                      tasks={normalTasks}
                      onDelete={handleDeleteTask}
                      onUpdateStatus={handleUpdateTaskStatus}
                      editingId={editingId}
                      onStartEdit={handleStartEdit}
                      onCancelEdit={handleCancelEdit}
                      onEditTask={handleEditTask}
                    />
                  </section>
                )}
                {/* Done tasks section */}
                {showDone && doneTasks.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-lg sm:text-xl font-bold text-green-700 flex items-center gap-1">
                        ✅ Done
                      </h2>
                      <span className="text-xs bg-green-100 text-green-700 rounded px-2 py-0.5">
                        {doneTasks.length}
                      </span>
                    </div>
                    <TaskList
                      tasks={doneTasks}
                      onDelete={handleDeleteTask}
                      onUpdateStatus={handleUpdateTaskStatus}
                      editingId={editingId}
                      onStartEdit={handleStartEdit}
                      onCancelEdit={handleCancelEdit}
                      onEditTask={handleEditTask}
                    />
                  </section>
                )}
                {/* Message if no filter is active */}
                {!showTasks && !showImportant && !showDone && (
                  <div className="flex flex-col items-center justify-center mt-24">
                    <p className="text-lg mb-4 text-gray-700 dark:text-gray-200">
                      No lists selected.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
