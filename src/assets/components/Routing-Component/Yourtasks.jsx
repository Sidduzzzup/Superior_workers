import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// ✅ Define API URL globally
const API_URL = "https://superior-workers-backend.onrender.com/customers";

const Yourtasks = () => {
  const [tasks, setTasks] = useState([]); // Store fetched tasks
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const token = localStorage.getItem("authToken"); // Get token from localStorage

  // ✅ Check if the token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      console.log("✅ Token decoded:", decoded);
      return decoded.exp * 1000 < Date.now(); // Check if token is expired
    } catch (error) {
      console.error("🔴 Error decoding token:", error);
      return true;
    }
  };

  // ✅ Fetch tasks from the backend
  const getTodos = async () => {
    setIsLoading(true); // Show loader while fetching

    try {
      console.log("🔹 Fetching tasks...");
      const response = await fetch(`${API_URL}/getTodos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the header
          "Content-Type": "application/json",
        },
      });

      console.log("🔹 Raw Response:", response);

      // Handle token expiration or invalid token
      if (response.status === 401 || response.status === 403) {
        console.warn("🔴 Token expired or invalid. Redirecting to login...");
        alert("Session expired. Please log in again.");
        localStorage.removeItem("authToken"); // Clear token if invalid
        window.location.href = "/FirstLogin"; // Redirect to login
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Fetched tasks successfully:", data);
      setTasks(data.todos || []); // Set tasks or empty array if no todos
    } catch (error) {
      console.error("🔴 Error fetching tasks:", error.message);
      alert("Error fetching tasks. Please check your connection or login again.");
    } finally {
      setIsLoading(false); // Hide loader after fetching
    }
  };

  // ✅ Fetch tasks when component mounts
  useEffect(() => {
    if (token && !isTokenExpired(token)) {
      getTodos(); // Fetch tasks only if token is valid
    } else {
      console.warn("🔴 Session expired. Redirecting to login...");
      alert("Session expired. Please log in again.");
      localStorage.removeItem("authToken");
      window.location.href = "/FirstLogin"; // Redirect to login page
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Works Still Pending...</h1>

        {/* ✅ Task List */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks available.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="p-4 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition duration-300"
              >
                <span className="text-lg">{task.title}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Yourtasks;
