


import React, { useEffect, useState } from "react";
import { FaHandPeace, FaHome } from "react-icons/fa";
import { useAuthStore } from "../assets/components/store/authStore";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogoutConfirmationEMP = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore(); // Retrieve user & logout function
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const motivationalMessages = [
    "Until Next Time! We'll Miss You 👋",
    "See You Soon, Amazing User! 🌟",
    "Have a Wonderful Day Ahead! 💖",
  ];
  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  useEffect(() => {
    const logoutEmployee = async () => {
      try {
        if (!user?.email) {
          throw new Error("User not found! Unable to logout.");
        }

        const response = await axios.post(
            "https://superior-workers-backend.onrender.com/customers/logout-employee",
            { email: user.email },
            { withCredentials: true } // Ensures cookies/tokens are sent
          );
          
        console.log("Logout response:", response.data);
        
        logout(); // Clears authentication state
        setSuccessMessage("Logged out successfully!");
        
        setTimeout(() => navigate("/"), 3000);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || "Logout failed! Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    logoutEmployee();
    document.title = "Successfully Logged Out";
  }, [user, navigate, logout]); // Added dependencies to avoid stale state issues

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-card rounded-lg shadow-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <FaHandPeace className="text-6xl text-primary mx-auto mb-4 hover:scale-110 transition-transform duration-300" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-foreground mb-4"
        >
          Successfully Logged Out
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-muted-foreground mb-8"
        >
          {randomMessage}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <FaHome className="mr-2" />
            Return to Homepage
          </button>
        </motion.div>

        <div className="mt-8 pt-6 border-t border-border">
          {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
      </motion.div>
    </div>
  );
};

export default LogoutConfirmationEMP;
