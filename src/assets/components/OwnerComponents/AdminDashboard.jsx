import { useState, useEffect } from "react";
import { FiHome, FiUsers, FiShoppingBag, FiSettings, FiMenu, FiX, FiSun, FiMoon, FiBell} from "react-icons/fi";
import { GiHeron } from "react-icons/gi";
import { CiLogout, CiLogin } from "react-icons/ci";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from "chart.js";
import { format } from "date-fns";
import LogoutConfirmation from "../Routing-Component/LogoutConfirmation";
import FirstLogin from "../Routing-Component/FirstLogin";
import { useNavigate } from "react-router-dom";
import CEOPortal from "./CEOPortal";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;
  
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Mock data generation
    const mockCustomers = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Customer ${i + 1}`,
      phone: `+1-555-${String(Math.floor(1000 + Math.random() * 9000))}`,
      email: `customer${i + 1}@example.com`,
      registrationDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
      totalOrders: Math.floor(Math.random() * 50)
    }));
    setCustomers(mockCustomers);
  }, []);


  
  useEffect(() => {
      fetchUserData();
      fetchOrderData();
  }, []);

  const fetchUserData = async () => {
      try {
          const response = await fetch("https://superior-workers-backend.onrender.com/customers/getUserStats"); // Adjust URL if needed
          const data = await response.json();
          if (data.success) {
              setUserCount(data.userCount);
              setUsers(data.users);
          }
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
  };

  const fetchOrderData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('https://superior-workers-backend.onrender.com/customers/getOrderStats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setOrderCount(response.data.orderCount);
      }
    } catch (error) {
      console.error('Error fetching Order data:', error);
      setOrderCount(0);
    }
  };

  const overviewData = {
    totalAccounts: userCount,
    activeUsers: userCount,
    newUsers: "Our Servers are down...Due to large-scale malicious attacks on SENTENTIAL's services",
    loginAnalytics: orderCount,
  };

  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "User Growth",
      data: [65, 78, 90, 115, 130, 150],
      borderColor: "#F72585",
      tension: 0.4
    }]
  };

  const orderDistributionData = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [{
      data: [63, 25, 12],
      backgroundColor: ["#4CAF50", "#FFC107", "#FF4C4C"]
    }]
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
    navigate("/LogoutConfirmation"); // Redirect to Logout Confirmation page
  };

    const handleLogin = () => {
    navigate("/FirstLogin"); // Redirect to the FirstLogin page
  };



  const taskStatusData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [{
      label: "Tasks",
      data: [12, 19, 8],
      backgroundColor: ["#FFC107", "#03A9F4", "#4CAF50"]
    }]
  };

  const filteredCustomers = customers
    .filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchOrderData();
  }, [navigate]);

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-background"} overflow-x-hidden`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-blue-100 transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <nav className="mt-8 space-y-4">
            <button className="flex items-center w-full p-3 rounded-lg hover:bg-secondary text-foreground">
              <FiHome className="mr-3" /> Dashboard
            </button>
            <button className="flex items-center w-full p-3 rounded-lg hover:bg-secondary text-foreground">
              <FiUsers className="mr-3" /> Customers
            </button>
            <button className="flex items-center w-full p-3 rounded-lg hover:bg-secondary text-foreground">
              <FiShoppingBag className="mr-3" /> Orders
            </button>
            <button className="flex items-center w-full p-3 rounded-lg hover:bg-secondary text-foreground">
              <FiSettings className="mr-3" /> Settings
            </button>
            <button className="flex items-center w-full p-3 rounded-lg hover:bg-secondary text-foreground " 
              onClick={handleLogin} >
            <CiLogin size={22} className="mr-3" /> LogIn
            </button>
            <button className="flex items-center w-full p-3 rounded-lg hover:bg-secondary text-foreground " 
              onClick={handleLogout} >
            <CiLogout size={22} className="mr-3" /> LogOut
            </button>
            <button className="flex items-center w-full p-3 rounded-lg hover:bg-secondary text-foreground" onClick={() => navigate("/CEOPortal")}>
            <GiHeron size={30}  className="mr-3" /> Contact CEO 
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "md:ml-64" : ""} p-4`}>
        {/* /* Header */}
          <header className="flex items-center  mb-6 justify-end">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-72 fixed text-foreground md:hidden">
              {sidebarOpen ? <FiX size={24} color={darkMode ? "white" : "black"} /> : <FiMenu size={24} color={darkMode ? "white" : "black"} />}
            </button>
            <div className="flex items-center space-x-4 mr-14">
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 ml-5 rounded-full hover:bg-secondary text-foreground">
                {darkMode ? <FiSun color="white" size={20} /> : <FiMoon size={20} color="black" />}
              </button>
              <button className="p-2 rounded-full hover:bg-secondary text-foreground">
                <FiBell size={20} color={darkMode ? "white" : "black"} />
              </button>
            </div>
          </header>

          {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-card rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Total Accounts</h3>
            <p className="text-2xl font-bold text-primary">{overviewData.totalAccounts}</p>
          </div>
          <div className="p-4 bg-card rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Active Users</h3>
            <p className="text-2xl font-bold text-primary">{overviewData.activeUsers}</p>
          </div>
          <div className="p-4 bg-card rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">New Users</h3>
            <p className="text-md font-bold text-primary">{overviewData.newUsers}</p>
          </div>
          <div className="p-4 bg-card rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Total Orders</h3>
            <p className="text-md font-bold text-primary">{overviewData.loginAnalytics}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-card rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-foreground">User Growth</h3>
            <Line data={userGrowthData} options={{ responsive: true }} />
          </div>
          <div className="p-4 bg-card rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Order Distribution</h3>
            <Pie data={orderDistributionData} options={{ responsive: true }} />
          </div>
          <div className="p-4 bg-card rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Task Status</h3>
            <Bar data={taskStatusData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-card rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">Customers</h3>
            <input
              type="text"
              placeholder="Search customers..."
              className="p-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="overflow-x-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left text-foreground">Name</th>
                  <th className="p-3 text-left text-foreground">Phone</th>
                  <th className="p-3 text-left text-foreground">Email</th>
                  <th className="p-3 text-left text-foreground">Registration Date</th>
                  <th className="p-3 text-left text-foreground">Total Orders</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.id} className="border-b hover:bg-secondary">
                    <td className="p-3 text-foreground">{user.name}</td>
                    <td className="p-3 text-foreground">{user.phone}</td>
                    <td className="p-3 text-foreground">{user.email}</td>
                    <td className="p-3 text-foreground">{format(user.lastLogin, "MMM dd, yyyy")}</td>
                    <td className="p-3 text-foreground"> {"Can't Reveal for Security Reasons"} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} entries
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-secondary text-foreground disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage * itemsPerPage >= filteredCustomers.length}
                className="px-3 py-1 rounded-lg bg-secondary text-foreground disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
