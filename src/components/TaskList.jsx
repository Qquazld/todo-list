import TaskItem from "./TaskItem";

function TaskList({ tasks, editingId, ...props }) {
  return (
    // List container for all tasks
    <ul className="w-full max-w-xl mx-auto flex flex-col gap-2">
      {tasks.length === 0 ? (
        // Empty state if no tasks to display
        <li className="bg-white text-black dark:bg-gray-900 dark:text-white text-center py-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          No tasks to display
        </li>
      ) : (
        // Render each task as a TaskItem
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            isEditing={editingId === task.id}
            {...props}
          />
        ))
      )}
    </ul>
  );
}

export default TaskList;
