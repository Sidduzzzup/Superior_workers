import React, { useEffect } from "react";
import { FaHandPeace, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const LogoutConfirmation = () => {
  const motivationalMessages = [
    "Until Next Time! We'll Miss You 👋",
    "See You Soon, Amazing User! 🌟",
    "Have a Wonderful Day Ahead! 💖",
    "Your Journey Continues... Come Back Soon! 🚀"
  ];
  const { user, logout } = useAuthStore();

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  useEffect(() => {
    
    document.title = "Successfully Logged Out";
    logout();
  }, []);

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
            onClick={() => window.location.href = "/"}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <FaHome className="mr-2" />
            Return to Homepage
          </button>
        </motion.div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Thank you for using our services. We look forward to seeing you again!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LogoutConfirmation;