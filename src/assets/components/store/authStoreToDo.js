


import { create } from "zustand";

const API_URL = "https://superior-workers-backend.onrender.com/customers"; // ✅ Updated API URL

export const useAuthStoreTodo = create((set) => ({
  tasks: [],

  getTodos: async () => {
    try {
      const token = localStorage.getItem("authToken"); // Get token from storage
      if (!token) throw new Error("No token found. Please log in.");

      const response = await fetch("https://superior-workers-backend.onrender.com/customers/getTodos", {
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

<<<<<<< HEAD
      const response = await fetch(`${API_URL}/addTask`, {
=======
      const response = await fetch("https://superior-workers-backend.onrender.com/customers/addTask", {
>>>>>>> 5bf94e5f33d03c9937f77b66d5f931d68ec7d74c
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

<<<<<<< HEAD
      const response = await fetch(`${API_URL}/deleteTodo/${taskId}`, {
=======
      const response = await fetch(`https://superior-workers-backend.onrender.com/customers/deleteTodo/${taskId}`, {
>>>>>>> 5bf94e5f33d03c9937f77b66d5f931d68ec7d74c
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

