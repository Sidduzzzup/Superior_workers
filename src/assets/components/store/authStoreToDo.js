import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://superior-workers-backend.onrender.com/customers"; // ✅ Updated API URL

// ✅ Check if token is expired before making API requests
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Check if token is expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export const useAuthStoreTodo = create((set) => ({
  tasks: [],
  isLoading: false, // Loading state for better UX

  // ✅ Get Todos
  getTodos: async () => {
    set({ isLoading: true }); // Show loader

    const token = localStorage.getItem("authToken");
    console.log("🔹 Token from localStorage:", token);

    if (!token || isTokenExpired(token)) {
      console.warn("🔴 Token expired. Redirecting to login...");
      alert("Session expired. Please log in again.");
      localStorage.removeItem("authToken");
      window.location.href = "/login"; // Redirect to login
      return;
    }

    try {
      const response = await fetch(`${API_URL}/getTodos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch tasks. Status: ${response.status}`);
      }

      const data = await response.json();
      set({ tasks: Array.isArray(data.todos) ? data.todos : [], isLoading: false });
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      alert(`Failed to load tasks: ${error.message}`);
      set({ tasks: [], isLoading: false });
    }
  },

  // ✅ Create a Todo
  createTodo: async (title) => {
    if (!title.trim()) return;
    try {
      const token = localStorage.getItem("authToken");
      if (!token || isTokenExpired(token)) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(`${API_URL}/addTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to create task. Status: ${response.status}`);
      }

      const newTask = await response.json();
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (error) {
      console.error("Error creating task:", error.message);
      alert(`Failed to create task: ${error.message}`);
    }
  },

  // ✅ Delete a Todo
  deleteTodo: async (taskId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token || isTokenExpired(token)) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(`${API_URL}/deleteTodo/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete task.");

      set((state) => ({ tasks: state.tasks.filter((task) => task._id !== taskId) }));
    } catch (error) {
      console.error("Error deleting task:", error.message);
      alert("Failed to delete task. Please try again.");
    }
  },
}));
