import React, { useCallback, useState } from "react";
import { FaLock, FaUser, FaShieldAlt } from "react-icons/fa";
import { useAuthStore } from "../store/authStore.js"; // Ensure this path is correct
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";





const AccessRestriction = ({ isVisible = true, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useAuthStore(); // Call inside component
  const navigate = useNavigate();


  const handleLoginClick = () => {
    if (!isAuthenticated) {
      navigate("/FirstLogin");
    }
  };

  const handleClose = useCallback(() => {
    if (onClose && typeof onClose === "function") {
      navigate("/"); // Redirect to home page
      onClose();
    }
  }, [onClose, navigate]);



  const handleVerify = async () => {
    try {
      
      console.log("Navigating to home page...");
      navigate("/"); // Navigation here
      toast.success("Home Page Successfully Navigated");
    } catch (error) {
      console.error("Can't Navigate:", error);
      setError(
        error.response?.data?.message ||
          "Failed to Navigate. Please try again."
      );
    }
  };




  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-2xl">
        <div className="relative">
          <button
            onClick={handleVerify}
            className="absolute right-0 top-0 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-6 flex justify-center space-x-4">
            <FaLock className="h-8 w-8 text-pink-600" />
            <FaShieldAlt className="h-8 w-8 text-blue-600" />
            <FaUser className="h-8 w-8 text-purple-800" />
          </div>

          <h2 className="mb-4 text-center text-xl font-bold text-black">
            Access Restricted
          </h2>

          <p className="mb-8 text-center text-gray-600">
            Please log in to view your personal details
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleLoginClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative overflow-hidden rounded-lg bg-sky-500 px-6 py-3 text-white transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg"
              style={{
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <FaLock className="h-4 w-4" />
                <span>Log In</span>
              </span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Need help? Contact support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AccessRestriction);
