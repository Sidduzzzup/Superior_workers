

import { create } from "zustand";
import axios from "axios";



// const API_URL = "http://localhost:3000/customers";

const API_URL = "https://superior-workers-backend.onrender.com/customers"; // ✅ Updated Backend URL



export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (name, phone, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { name, phone, email, password });

            console.log("Signup response:", response.data); // Debugging

            // ✅ Store the token in localStorage
            if (response.data.token) {
                localStorage.setItem("authToken", response.data.token);
            }

            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
            console.error("Signup error:", error.response?.data || error.message); // Debugging
            throw error;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            console.log("Sending OTP for verification:", code);
            const response = await axios.post(`${API_URL}/verify-email`, { code }); // Send code to backend for verification
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            localStorage.setItem("authToken", response.data.token); // Store token
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
            throw error;
        }
    },



    login: async (email, password) => {
        set({ isLoading: true, error: null });
    
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
    
            console.log("🔹 Server Response:", response.data); // Debugging
    
            const { token, user } = response.data;
    
            if (!token || !user) {
                throw new Error("Invalid response from server: Missing token or user data.");
            }
    
            // Save token in localStorage
            localStorage.setItem("authToken", token);
            console.log("🔹 Stored Token in localStorage:", localStorage.getItem("authToken")); // Debugging
    
            set({
                isAuthenticated: true,
                user: user,
                error: null,
                isLoading: false,
            });
    
            // Redirect based on role
            window.location.href = user.isAdmin ? "/AdminDashboard" : "/";
        } catch (error) {
            console.error("🔴 Login error:", error);
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },
    

    
    checkAuth: async () => {
        console.log("Starting checkAuth");
        const token = localStorage.getItem("authToken");
        console.log("Retrieved token:", token);
    
        if (!token) {
          console.warn("No token found, setting unauthenticated state");
          set({ isAuthenticated: false, isCheckingAuth: false, user: null });
          return;
        }
    
        try {
          set({ isCheckingAuth: true }); // Single state update before request
          const response = await axios.get(`${API_URL}/check-auth`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("CheckAuth response:", response.data);
    
          set({
            user: response.data.user,
            isAuthenticated: true,
            isCheckingAuth: false,
          });
        } catch (error) {
          console.error("Auth check failed:", error.response?.data || error.message);
          localStorage.removeItem("authToken");
          set({ isAuthenticated: false, isCheckingAuth: false, user: null });
        }
      },
    
   
      

    logout: async () => {
        try {
          await axios.post(`${API_URL}/logout`, {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
        } catch (error) {
          console.warn("Logout request failed, clearing token locally.");
        } finally {
          localStorage.removeItem("authToken"); // Clear token locally
          set({ user: null, isAuthenticated: false, isLoading: false, error: null });
          if (!window.hasLoggedOut) {
              alert("You have been logged out successfully.");
              window.hasLoggedOut = true; // Set a flag to prevent multiple alerts
          }
        //await new Promise((resolve) => setTimeout(resolve, 10000)); // Delay of 5 seconds
         // window.location.href = "/FirstLogin"; // Redirect to login
        }
      },
      

    

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error sending reset password email",
            });
            throw error;
        }
    },

        resetPassword: async (token, password) => {
            set({ isLoading: true, error: null });
            try {
                const response = await axios.post(`${API_URL}/PasswordRecoveryForm/${token}`, { password });
                set({ message: response.data.message, isLoading: false });
            } catch (error) {
                set({
                    isLoading: false,
                    error: error.response.data.message || "Error resetting password",
                });
                throw error;
            }
        },
}));

