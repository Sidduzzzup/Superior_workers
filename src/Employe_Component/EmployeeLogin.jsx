

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../assets/components/store/authStore";
import { useTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const EmployeeLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage("Email and Password are required");
      return;
    }
  
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      const response = await axios.post(
        "https://superior-workers-backend.onrender.com/customers/login-employee",
        { email, password }
      );
  
      console.log("Login response:", response.data);
      
      // Store the token in localStorage
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        console.log("Token stored:", response.data.token);
      } else {
        console.error("Token not found in response");
      }

  
  
      setSuccessMessage("Login successful! Redirecting...");
      console.log("Stored Token Before Redirect:", localStorage.getItem("authToken"));

      setTimeout(() => navigate("/EmployeeDashboard"), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed! Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md mx-4 sm:mx-auto">
        <div className="mb-4 space-y-3">
          {errorMessage && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Alert severity="error" className="w-full bg-red-100/10 text-red-200 backdrop-blur-sm border-red-400/30">
                {errorMessage}
              </Alert>
            </motion.div>
          )}
          {successMessage && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Alert severity="success" className="w-full bg-green-100/10 text-green-200 backdrop-blur-sm border-green-400/30">
                {successMessage}
              </Alert>
            </motion.div>
          )}
        </div>
        <form onSubmit={handleSignIn} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 font-mono">Hello Employee</h2>
            <h3 className="text-xl font-semibold mb-4 font-mono">It's nice to meet you, Sir!</h3>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-mono">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-mono">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
          <div className="flex justify-between mt-4">
            <Link to="/forgot-password" className="text-sm font-mono text-gray-900 dark:text-gray-100 hover:underline">
              Forgot Password?
            </Link>
            <Link to="/EmployeeSignUp" className="text-sm font-mono text-gray-900 dark:text-gray-100 hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
