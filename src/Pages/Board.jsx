import { useState } from "react";
import { mockApi } from "../api/mockApi";

export default function Board({ user, onLogout }) {
  const [task, setTask] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);

  const [board, setBoard] = useState({
    todo: [],
    progress: [],
    done: [],
  });

  // ADD TASK (Optimistic)
  const addTask = async () => {
    if (!task.trim()) return;
    const prev = structuredClone(board);

    setBoard({ ...board, todo: [...board.todo, task] });
    setTask("");

    try {
      await mockApi();
    } catch {
      alert("Failed to add task");
      setBoard(prev);
    }
  };

  // MOVE TASK (Optimistic)
  const moveTask = async (task, from, to) => {
    const prev = structuredClone(board);

    setBoard({
      ...board,
      [from]: board[from].filter((t) => t !== task),
      [to]: [...board[to], task],
    });

    try {
      await mockApi();
    } catch {
      alert("Move failed");
      setBoard(prev);
    }
  };

  // DELETE TASK (Optimistic)
  const deleteTask = async (task, from) => {
    const prev = structuredClone(board);

    setBoard({
      ...board,
      [from]: board[from].filter((t) => t !== task),
    });

    try {
      await mockApi();
    } catch {
      alert("Delete failed");
      setBoard(prev);
    }
  };

  const Column = ({ title, items, from, accent }) => (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        if (!draggedTask || draggedTask.from === from) return;
        moveTask(draggedTask.task, draggedTask.from, from);
        setDraggedTask(null);
      }}
      className="bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 min-h-[320px]"
    >
      <h2 className={`text-lg font-semibold mb-4 ${accent}`}>
        {title}
      </h2>

      {items.length === 0 && (
        <p className="text-sm text-slate-400 italic">No tasks</p>
      )}

      {items.map((t, i) => (
        <div
          key={i}
          draggable
          onDragStart={() => setDraggedTask({ task: t, from })}
          className="bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 mb-3 cursor-grab active:cursor-grabbing flex justify-between items-center"
        >
          <span className="text-sm text-white">{t}</span>

          <div className="flex gap-2 text-xs">
            {from === "todo" && (
              <button
                onClick={() => moveTask(t, from, "progress")}
                className="text-blue-400"
              >
                ▶
              </button>
            )}

            {from === "progress" && (
              <>
                <button
                  onClick={() => moveTask(t, from, "todo")}
                  className="text-slate-400"
                >
                  ◀
                </button>
                <button
                  onClick={() => moveTask(t, from, "done")}
                  className="text-green-400"
                >
                  ▶
                </button>
              </>
            )}

            <button
              onClick={() => deleteTask(t, from)}
              className="text-red-400"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-8">
      {/* HEADER */}
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Kanban Board</h1>
          <p className="text-slate-400 mt-1">
            {user} · Optimistic UI · Drag & Drop
          </p>
        </div>

        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-xl text-sm"
        >
          Logout
        </button>
      </div>

      {/* ADD TASK */}
      <div className="flex gap-3 mb-10 max-w-lg">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Type a new task..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white placeholder-slate-400 outline-none"
        />
        <button
          onClick={addTask}
          className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl"
        >
          Add
        </button>
      </div>

      {/* BOARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Column title="To Do" items={board.todo} from="todo" accent="text-blue-400" />
        <Column title="In Progress" items={board.progress} from="progress" accent="text-yellow-400" />
        <Column title="Done" items={board.done} from="done" accent="text-green-400" />
      </div>
    </div>
  );
}
