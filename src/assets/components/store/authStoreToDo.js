

import { create } from "zustand";

export const useAuthStoreTodo = create((set) => ({
  tasks: [],

  getTodos: async () => {
    try {
      const token = localStorage.getItem("authToken"); // Get token from storage
      if (!token) throw new Error("No token found. Please log in.");

      const response = await fetch("http://localhost:3000/customers/getTodos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // 🔥 Send token here
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch tasks. Status: ${response.status}`);

      const data = await response.json();
      set({ tasks: Array.isArray(data.todos) ? data.todos : [] });
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      alert(`Failed to load tasks: ${error.message}`);
      set({ tasks: [] });
    }
  },

  createTodo: async (title) => {
    if (!title.trim()) return;
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await fetch("http://localhost:3000/customers/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // 🔥 Send token here
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error(`Failed to create task. Status: ${response.status}`);

      const newTask = await response.json();
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (error) {
      console.error("Error creating task:", error.message);
      alert(`Failed to create task: ${error.message}`);
    }
  },

  deleteTodo: async (taskId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please log in.");

      const response = await fetch(`http://localhost:3000/customers/deleteTodo/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, // 🔥 Send token here
        },
      });

      if (!response.ok) throw new Error("Failed to delete task.");

      set((state) => ({ tasks: state.tasks.filter((task) => task._id !== taskId) }));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  },
}));

