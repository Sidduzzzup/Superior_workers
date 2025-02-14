

import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa"; // Icons for adding and deleting tasks

const TodoList = () => {
  const [tasks, setTasks] = useState([]); // Store the tasks
  const [newTask, setNewTask] = useState(""); // For the input field
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Get the token from localStorage
  const token = localStorage.getItem("authToken");

  // Fetch tasks from the backend
  const getTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://superior-workers-backend.onrender.com/customers/getTodos", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data.todos); // Set tasks state
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Error fetching tasks");
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new task
  const handleAddTask = async () => {
    if (!newTask.trim()) return; // Don't add empty tasks
    setIsLoading(true);
    try {
      const response = await fetch("https://superior-workers-backend.onrender.com/customers/addTask", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTask }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      const newTaskFromBackend = await response.json();
      setTasks([...tasks, newTaskFromBackend.todo]); // Add new task to the list
      setNewTask(""); // Clear the input field
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Error adding task");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://superior-workers-backend.onrender.com/customers/deleteTodo/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks(tasks.filter((task) => task._id !== taskId)); // Remove deleted task from state
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    if (token) {
      getTodos(); // Fetch tasks if token exists
    } else {
      alert("Please log in to view your tasks");
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Works to be done</h1>

        {/* Add Task Section */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 p-3 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleAddTask}
            disabled={isLoading || !newTask.trim()}
            className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition disabled:opacity-50"
          >
            <FaPlus />
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks available. Add some!</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
                <span className="text-lg">{task.title}</span>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
