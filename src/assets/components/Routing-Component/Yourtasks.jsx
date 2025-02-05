
import React, { useState, useEffect } from "react";

const Yourtasks = () => {
  const [tasks, setTasks] = useState([]); // Store the tasks
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Get the token from localStorage
  const token = localStorage.getItem("authToken");

  // Fetch tasks from the backend
  const getTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/customers/getTodos", {
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
        <h1 className="text-3xl font-semibold text-center mb-6">Works Still Pending...</h1>

        {/* Task List */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks available.</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="p-4 bg-gray-100 rounded-md">
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
