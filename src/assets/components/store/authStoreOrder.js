import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://superior-workers-backend.onrender.com/customers"; // Update with actual API URL

// Check if token is expired before making API requests
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    // Use jwtDecode here to decode the token
    const decoded = jwtDecode(token); 
    console.log("Decoded Token:", decoded); // Debugging
    console.log("Expiration Time:", new Date(decoded.exp * 1000)); // Debugging
    console.log("Current Time:", new Date()); // Debugging
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};



export const useAuthStoreOrder = create((set) => ({
  orders: [],
  isLoading: false,

  // Fetch orders for a specific worker
  // Fetch orders for Rahul Sharma (default worker)
getOrders: async () => {
  set({ isLoading: true });
  const token = localStorage.getItem("authToken");
  console.log("Stored Token:", token); // Debugging
  console.log("Fetching orders with token:", token);

  if (!token || isTokenExpired(token)) { 
    alert("Session expired. Please log in again.");
    localStorage.removeItem("authToken");
    window.location.href = "/EmployeeLogin"; // Redirect to login
    return;
}


  try {
    const response = await fetch(`${API_URL}/getOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();
    set({ orders: data.orders || [], isLoading: false });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    alert("Failed to fetch orders");
    set({ orders: [], isLoading: false });
  }
},


  // Create a new order
  // Create a new order
createOrder: async (orderData) => {
  const { name, phone, service, address, timeAvailability } = orderData;

  if (!service || !address) {
    alert("Service and address are required.");
    return;
  }

  try {
    const token = localStorage.getItem("authToken");
    if (!token || isTokenExpired(token)) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("authToken");
      window.location.href = "/EmployeeLogin"; // Redirect to login
      return;
    }

    // Send order data without workerId
    const response = await fetch(`${API_URL}/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    const { order: newOrder } = await response.json();
    set((state) => ({
      orders: [...state.orders, newOrder],
    }));
  } catch (error) {
    console.error("Error creating order:", error.message);
    alert("Failed to create order");
  }
},

}));
