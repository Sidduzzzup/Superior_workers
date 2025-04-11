import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiClipboard, FiCheckCircle, FiXCircle, FiBell, FiMap, FiUser, FiLogOut, FiHome, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-hot-toast";
import Navbar from "../assets/components/Navbar";
import { useAuthStoreOrder } from "../assets/components/store/authStoreOrder"; // Fixed hook name import
import axios from "axios";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0
  });

  const { orders, isLoading, getOrders } = useAuthStoreOrder();

  // Debounced search hook
  const useDebouncedSearch = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const handleGoToDashboard = () => {
    navigate("/EmployeeDashboard");
  };

  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 500);

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, orders]);

  const handleSearch = (searchValue) => {
    if (!searchValue) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) =>
      order.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.phone?.includes(searchValue) ||
      order.service?.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setSessionExpired(true);
      navigate("/EmployeeLogin");
      return;
    }

    getOrders(); // Zustand handles expired token check
  }, [getOrders, navigate]);

  useEffect(() => {
    console.log('Current orders:', orders); // Debug log
    // Update order stats whenever orders change
    setOrderStats(prevStats => ({
      ...prevStats,
      totalOrders: orders?.length || 0
    }));
  }, [orders]);

  const handleAccept = (order) => {
    setSelectedOrder(order);
    setFilteredOrders(filteredOrders.filter((o) => o.id !== order.id));
    console.log(`Accepted order with ID: ${order.id}`);
  };

  const handleDecline = (order) => {
    setFilteredOrders(filteredOrders.filter((o) => o.id !== order.id));
    console.log(`Declined order with ID: ${order.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      

      <nav className="sticky top-0 z-50 bg-card shadow-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/istockphoto-168362728-612x612.png"
              alt="Company Logo"
              style={{ height: '60px', width: '90px' }}
            />
            <div className="hidden md:flex space-x-4">
              <button
                onClick={() => navigate("/EmployeeDashboard")}
                className="text-foreground hover:text-primary flex items-center gap-2"
              >
                <FiHome /> Dashboard
              </button>
              <button className="text-foreground hover:text-primary flex items-center gap-2">
                <FiClipboard /> Orders
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiBell className="text-2xl text-accent cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                3
              </span>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE3MDg2NzQwMzE&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                  alt="Profile"
                  className="h-10 w-10 rounded-full"
                />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1">
                  <button className="block px-4 py-2 text-sm text-foreground hover:bg-muted w-full text-left">
                    <FiUser className="inline mr-2" /> View Profile
                  </button>
                  <button onClick={() => navigate('/LogoutConfirmationEMP')} className="block px-4 py-2 text-sm text-foreground hover:bg-muted w-full text-left">
                    <FiLogOut className="inline mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 flex justify-center">
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 max-w-lg w-full">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1 text-white">Total Orders</h3>
              <p className="text-4xl font-bold text-white">{orderStats.totalOrders}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <FiShoppingBag className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20">
            <p className="text-sm text-white/80">Updated in real-time</p>
          </div>
        </div>
      </div>

      {sessionExpired && (
        <div className="bg-destructive text-white text-center p-4">
          Your session has expired. Please log in again.
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by client name or service type..."
            className="w-full p-3 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p>Loading orders...</p>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl mb-2 font-semibold text-foreground">{order.name}</h3>
                <p className="text-black mb-1">Service: <b>{order.service}</b></p>
                <p className="text-black mb-1">Phone: <b>Hidden for Security reasons</b></p>
                <p className="text-black mb-1">Time Availability: <b>{order.timeAvailability || "Not specified"}</b></p>
                <p className="text-black mb-1">Status: <b>{order.status}</b></p>
                <p className="text-black mb-1">Distance: <b>{order.distance}</b></p>
                <p className="text-black mb-4">Estimated Time: <b>{order.estimatedTime}</b></p>
                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => handleAccept(order)}
                    className="flex-1 bg-green-400 text-black py-2 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center font-bold"
                  >
                    <FiCheckCircle className="mr-2" style={{ height: '15px', width: '15px' }} />
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(order)}
                    className="flex-1 bg-red-500 text-black py-2 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center font-bold"
                  >
                    <FiXCircle className="mr-2" style={{ height: '15px', width: '15px' }} />
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

        {selectedOrder && (
          <div className="mt-8 w-full p-6 bg-card rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Order Details</h3>
            <p className="text-accent mb-1"><strong>Name:</strong> {selectedOrder.name}</p>
            <p className="text-accent mb-1"><strong>Service:</strong> {selectedOrder.service}</p>
            <p className="text-accent mb-1"><strong>Phone:</strong> {selectedOrder.phone || "Not provided"}</p>
            <p className="text-accent mb-1"><strong>Time Availability:</strong> {selectedOrder.timeAvailability || "Not specified"}</p>
            <p className="text-accent mb-1"><strong>Status:</strong> {selectedOrder.status}</p>
            <p className="text-accent mb-1"><strong>Distance:</strong> {selectedOrder.distance}</p>
            <p className="text-accent mb-4"><strong>Estimated Time:</strong> {selectedOrder.estimatedTime}</p>

            <h3 className="text-xl font-semibold mt-6">Order Location</h3>
            <iframe
              width="100%"
              height="600px"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
                selectedOrder.address
              )}&key=AIzaSyAZHlSt4OzeZUsoEpIHKWRpxDxlmJz_BpI`}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;














