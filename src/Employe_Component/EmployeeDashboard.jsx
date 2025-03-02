import React, { useState, useEffect } from "react";
import { FiBell, FiMap, FiUser, FiLogOut, FiHome, FiClipboard, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const orders = [
  {
    id: 1,
    name: "John Smith",
    service: "Plumbing Repair",
    address: "123 Main St, Boston, MA",
    status: "pending",
    distance: "2.5 km",
    estimatedTime: "15 mins"
  },
  {
    id: 2,
    name: "Emma Wilson",
    service: "Electrical Work",
    address: "456 Oak Ave, Boston, MA",
    status: "pending",
    distance: "3.8 km",
    estimatedTime: "22 mins"
  },
  {
    id: 3,
    name: "Michael Brown",
    service: "HVAC Service",
    address: "789 Pine Rd, Boston, MA",
    status: "pending",
    distance: "1.2 km",
    estimatedTime: "8 mins"
  }
];

const EmployeeDashboard = () => {
  const navigate = useNavigate(); // Use the hook
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeOrders, setActiveOrders] = useState(orders);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleAccept = (order) => {
    setActiveOrders(activeOrders.filter((o) => o.id !== order.id));
    setSelectedOrder(order);
  };

  const handleDecline = (order) => {
    setActiveOrders(activeOrders.filter((o) => o.id !== order.id));
  };

  const filteredOrders = activeOrders.filter(
    (order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase())
  );


   



  return (
    <div className="min-h-screen bg-background">
     { /* Navbar */}
        <nav className="sticky top-0 z-50 bg-card shadow-sm p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1563694983011-6f4d90358083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bG9nb3x8fHx8fDE3MDg2NzQwMzA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
            alt="Company Logo"
            className="h-8"
          />
          <div className="hidden md:flex space-x-4">
            <button className="text-foreground hover:text-primary flex items-center gap-2">
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

        <div className="container mx-auto px-4 py-8">
          {/* Profile Section */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJvZmlsZXx8fHx8fDE3MDg2NzQwMzE&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=150"
              alt="Employee Profile"
              className="w-32 h-32 rounded-full"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-foreground">David Mitchell</h2>
              <p className="text-accent">Senior Technician</p>
              <p className="text-accent">Age: 32 | Experience: 8 years</p>
              <div className="mt-4">
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`px-4 py-2 rounded-md ${isAvailable ? "bg-chart-2 text-white" : "bg-destructive text-white"}`}
                >
                  {isAvailable ? "Available" : "Busy"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Orders Section */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by client name or service type..."
            className="w-full p-3 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">{order.name}</h3>
                <p className="text-accent mb-2">{order.service}</p>
                <p className="text-accent mb-4">{order.address}</p>
                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => handleAccept(order)}
                    className="flex-1 bg-chart-2 text-white py-2 rounded-md hover:opacity-90 transition-opacity"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(order)}
                    className="flex-1 bg-muted text-accent py-2 rounded-md hover:opacity-90 transition-opacity"
                  >
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

        {/* Map Section */}
        {selectedOrder && (
          <div className="mt-8 bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Navigation</h3>
            <div className="bg-muted h-64 rounded-md flex items-center justify-center mb-4">
              <FiMap className="text-4xl text-accent" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-accent">Distance: {selectedOrder.distance}</p>
                <p className="text-accent">Est. Time: {selectedOrder.estimatedTime}</p>
              </div>
              <button className="bg-primary text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity">
                Navigate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;