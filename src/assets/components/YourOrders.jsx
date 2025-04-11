import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiClipboard, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { toast } from "react-hot-toast";


const YourOrders = () => {
  // State declarations
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await fetch("https://superior-workers-backend.onrender.com/customers/getOrders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setSessionExpired(true);
          localStorage.removeItem("authToken");
          navigate("/EmployeeLogin");
          return;
        }
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      console.log("Fetched Orders:", data); // Debugging

      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
        setFilteredOrders(data.orders); // Initially set filtered orders
      } else {
        toast.error("Failed to load orders. Invalid data format.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check session and fetch orders on mount
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      setSessionExpired(true);
      navigate("/EmployeeLogin");
      return;
    }
    fetchOrders();
  }, [navigate]);

  // Filter orders based on search term
  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.service.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  // Placeholder handlers for accept/decline (implement as needed)
  const handleAccept = (order) => {
    toast.success(`Accepted order for ${order.name}`);
    // Add logic to update order status in backend if needed
  };

  const handleDecline = (order) => {
    toast.error(`Declined order for ${order.name}`);
    // Add logic to update order status in backend if needed
  };

  return (
    <div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by client name or service type..."
            className="w-full p-3 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p>Loading orders...</p>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl mb-2 font-semibold text-foreground">{order.name}</h3>
                <p className="text-black mb-1">
                  Service: <b>{order.service}</b>
                </p>
                <p className="text-black mb-1">
                  Phone: <b>Hidden for Security reasons</b>
                </p>
                <p className="text-black mb-1">
                  Time Availability: <b>{order.timeAvailability || "Not specified"}</b>
                </p>
                <p className="text-black mb-1">
                  Status: <b>{order.status}</b>
                </p>
                <p className="text-black mb-1">
                  Distance: <b>{order.distance}</b>
                </p>
                <p className="text-black mb-4">
                  Estimated Time: <b>{order.estimatedTime}</b>
                </p>
                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => handleAccept(order)}
                    className="flex-1 bg-green-400 text-black py-2 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center font-bold"
                  >
                    <FiCheckCircle className="mr-2" style={{ height: "15px", width: "15px" }} />
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(order)}
                    className="flex-1 bg-red-500 text-black py-2 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center font-bold"
                  >
                    <FiXCircle className="mr-2" style={{ height: "15px", width: "15px" }} />
                    Decline
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-accent">No new job requests. Please check again later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourOrders;