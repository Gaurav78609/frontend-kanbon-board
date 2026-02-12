import { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { mockApi } from "../api/mockApi";

const initialTasks = [
  { id: "1", title: "Learn React", status: "todo" },
  { id: "2", title: "Build Kanban Board", status: "inprogress" },
];

             /* DRAGGABLE TASK */
function DraggableTask({ task, onDelete }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex justify-between items-center p-2 mb-2 rounded bg-gray-800 text-white"
    >
      {/* DRAG HANDLE  */}
      <span
        {...listeners}
        {...attributes}
        className="cursor-move select-none"
      >
        {task.title}
      </span>

      {/* DELETE BUTTON */}
      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 px-2 py-1 rounded text-sm hover:bg-red-600"
      > Delete
      </button>
    </div>
  );
}

                  /*COLUMN */
function Column({ id, title, tasks, onDelete }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-xl shadow p-4 min-h-[300px]"
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {tasks.map((task) => (
        <DraggableTask
          key={task.id}
          task={task}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

           /*  BOARD  */
export default function Board({ user }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

        /* ADD TASK */
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: newTask,
        status: "todo",
      },
    ]);

    setNewTask("");
  };

  /* MOVE TASK (Optimistic + Rollback) */
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const previousTasks = [...tasks];

    // optimistic update
    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id
          ? { ...task, status: over.id }
          : task
      )
    );

    try {
      await mockApi();
    } catch (err) {
      setTasks(previousTasks);
      setError("Failed to move task");
      setTimeout(() => setError(""), 3000);
    }
  };

  /* DELETE TASK (Optimistic + Rollback) */
  const handleDelete = async (taskId) => {
    const previousTasks = [...tasks];

    setTasks((prev) =>
      prev.filter((task) => task.id !== taskId)
    );

    try {
      await mockApi();
    } catch (err) {
      setTasks(previousTasks);
      setError(" Failed to delete task");
      setTimeout(() => setError(""), 3000);
    }
  };

  const filterTasks = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Kanban Board – {user}
        </h1>

        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* ADD TASK */}
        <div className="mb-6 flex gap-2">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task..."
            className="border px-3 py-2 rounded w-64"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column
            id="todo"
            title="To Do"
            tasks={filterTasks("todo")}
            onDelete={handleDelete}
          />

          <Column
            id="inprogress"
            title="In Progress"
            tasks={filterTasks("inprogress")}
            onDelete={handleDelete}
          />

          <Column
            id="done"
            title="Done"
            tasks={filterTasks("done")}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </DndContext>
  );
}
