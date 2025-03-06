

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

    // login: async (email, password) => {
    //     set({ isLoading: true, error: null });
    //     try {
    //         const response = await axios.post(`${API_URL}/login`, { email, password });
    //         const { token, user } = response.data;

    //         // Save token in localStorage
    //         localStorage.setItem("authToken", token);

    //         if (token) {
    //             localStorage.setItem("authToken", token);
    //         } else {
    //             console.error("No token received from API");
    //         }

    //         set({
    //             isAuthenticated: true,
    //             user: user,
    //             error: null,
    //             isLoading: false,
    //         });

    //         // Redirect based on role
    //         if (user.isAdmin) {
    //             window.location.href = "/AdminDashboard"; // Redirect Admins
    //         } else {
    //             window.location.href = "/"; // Redirect Regular Users to Home
    //         }
    //     } catch (error) {
    //         set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
    //         throw error;
    //     }
    // },

    // checkAuth: async () => {
    //     set({ isCheckingAuth: true, error: null });
    //     try {
    //         const token = localStorage.getItem("authToken"); // Get token from localStorage
    //         if (!token) throw new Error("No token found");

    //         const response = await axios.get(`${API_URL}/check-auth`, {
    //             headers: { Authorization: `Bearer ${token}` }, // Attach token in Authorization header
    //         });

    //         set({
    //             user: response.data.user,
    //             isAuthenticated: true,
    //             isCheckingAuth: false
    //         });
    //     } catch (error) {
    //         console.error("Auth check failed:", error);
    //         set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    //         localStorage.removeItem("authToken"); // Clear token if authentication fails
    //     }
    // },




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
    


    
    // checkAuth: async () => {
    //     set({ isCheckingAuth: true, error: null });
    //     try {
    //         const token = localStorage.getItem("authToken");
    //         console.log("Retrieved token:", token); // Debugging step
    
    //         if (!token) throw new Error("No token found");
    
    //         const response = await axios.get(`${API_URL}/check-auth`, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });
    
    //         console.log("User authenticated:", response.data.user); // Debugging step
    
    //         set({
    //             user: response.data.user,
    //             isAuthenticated: true,
    //             isCheckingAuth: false
    //         });
    //     } catch (error) {
    //         console.error("Auth check failed:", error);
    //         set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    //         localStorage.removeItem("authToken");
    //     }
    // },
    
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
    
        try {
            setTimeout(() => {
                const token = localStorage.getItem("authToken");
                console.log("Retrieved token after delay:", token); // Debugging step
            }, 0);  // Small delay to check if token is still there
    
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.warn("No token found, redirecting to login...");
                set({ isAuthenticated: false, isCheckingAuth: false });
                return;
            }
    
            const response = await axios.get(`${API_URL}/check-auth`, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            console.log("User authenticated:", response.data.user);
    
            set({
                user: response.data.user,
                isAuthenticated: true,
                isCheckingAuth: false
            });
    
        } catch (error) {
            console.error("Auth check failed:", error);
            localStorage.removeItem("authToken"); // Remove invalid token
            set({ isAuthenticated: false, isCheckingAuth: false });
        }
    },
    





    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            localStorage.removeItem("authToken"); // Remove token from localStorage
            set({ user: null, isAuthenticated: false, isLoading: false, error: null });
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
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

