

import { useEffect, useState } from "react";
// import API from "../lib/axios";
// import ProtectedRoute from "../components/ProtectedRoute";

function  task() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleStatus = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        ...task,
        status: task.status === "pending" ? "done" : "pending",
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
          required
          className="w-full border rounded p-2"
        />

        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          className="self-start bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="border rounded p-3 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">
                {task.title}{" "}
                <span className="text-sm text-gray-500">
                  - {task.status}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                {task.description}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleStatus(task)}
                className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                Toggle
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// export default ProtectedRoute(task);
export default (task);
