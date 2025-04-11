import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./assets/components/Navbar.jsx";
import Homepage from './assets/components/Homepage.jsx';

import LoginRouting from './assets/components/Routing-Component/LoginRouting.jsx';
import BuilderRouting from './assets/components/Routing-Component/BuilderRouting.jsx';
import PlumberRouting from './assets/components/Routing-Component/PlumberRouting.jsx';
import Electrician from './assets/components/Routing-Component/Electrician.jsx';
import EmailVerification from '../src/assets/components/Routing-Component/EmailVerification.jsx';
import FirstLogin from '../src/assets/components/Routing-Component/FirstLogin.jsx';
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../src/assets/components/store/authStore.js";

import LoadingSpinner from "./assets/components/store/LoadingSpinner.jsx";
import ResetEmailRequest from "./assets/components/Routing-Component/ResetEmailRequest.jsx";
import ProfileView from "./assets/components/ProfileView.jsx";
import LogoutConfirmation from "./assets/components/Routing-Component/LogoutConfirmation.jsx";
import ResetEmailSetup from "./assets/components/Routing-Component/PasswordRecoveryForm.jsx";
import EmailConfirmationSuccess from "./assets/components/Routing-Component/EmailConfirmationSuccess.jsx";
import TodoList from "./assets/components/Routing-Component/TodoList.jsx";
import AdminSetup from "./assets/components/Routing-Component/AdminSetup.jsx";

import AdminDashboard from './assets/components/OwnerComponents/AdminDashboard.jsx';
import Yourtasks from './assets/components/Routing-Component/Yourtasks.jsx';
import CEOPortal from './assets/components/OwnerComponents/CEOPortal.jsx';
import LiveProofSection from './assets/components/LiveProofSection.jsx'
import CarpenterRouting from './assets/components/Routing-Component/Carpenter_Routing.jsx';
import EmployeeDashboard from './Employe_Component/EmployeeDashboard.jsx';
import Works from './assets/components/Works.jsx';
import WorkerList from './assets/components/Final_ordering/WorkerList.jsx';
import EmployeeLogin from './Employe_Component/EmployeeLogin.jsx';
import EmployeeSignUp from './Employe_Component/EmployeeSignUp.jsx';
import LogoutConfirmationEMP from './Employe_Component/LogoutConfirmationEmp.jsx';
import AddressComponent from './assets/components/AddressComponent.jsx';
import PaymentGateway from './assets/components/PaymentGateway/PaymentGateway.jsx';
import YourOrders from './assets/components/YourOrders.jsx';

const AdminOnlyRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  return !isAuthenticated || !user?.isAdmin ? <Navigate to="/" replace /> : children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to='/FirstLogin' replace />;
  if (user?.isAdmin) return <Navigate to="/AdminDashboard" replace />;
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  return isAuthenticated ? <Navigate to={user.isAdmin ? "/AdminDashboard" : "/"} replace /> : children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);

  


  useEffect(() => {
    if (!authChecked) {
      console.log("Checking authentication...");
      const verifyAuth = async () => {
        try {
          await checkAuth(); // ✅ Only check auth if not already checked
          console.log("Auth check complete");
          setAuthChecked(true); // Set to true to prevent multiple runs
        } catch (error) {
          console.error("Error verifying authentication:", error);
        }
      };
      verifyAuth();
    }
  }, [authChecked]); // ✅ Add authChecked as a dependency
  
  

  if (isCheckingAuth && !authChecked) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const excludedNavRoutes = ["/AdminDashboard", "/CEOPortal", "/EmployeeDashboard"];

  return (
    <>
      {!excludedNavRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/LoginRouting" element={<RedirectAuthenticatedUser><LoginRouting /></RedirectAuthenticatedUser>} />
        <Route path="/FirstLogin" element={<RedirectAuthenticatedUser><FirstLogin /></RedirectAuthenticatedUser>} />
        <Route path="/EmployeeLogin" element={<RedirectAuthenticatedUser><EmployeeLogin /></RedirectAuthenticatedUser>} />
        <Route path="/EmployeeSignUp" element={<RedirectAuthenticatedUser><EmployeeSignUp /></RedirectAuthenticatedUser>} />
        <Route path="/LogoutConfirmation" element={<LogoutConfirmation />} />
        <Route path="/LogoutConfirmationEMP" element={<LogoutConfirmationEMP />} />
        <Route path="/EmailVerification" element={<EmailVerification />} />
        <Route path="/BuilderRouting" element={<BuilderRouting />} />
        <Route path="/PlumberRouting" element={<PlumberRouting />} />
        <Route path="/Electrician" element={<Electrician />} />
        <Route path="/Works" element={<Works />} />
        <Route path="/workers/:category" element={<WorkerList />} />
        <Route path="/ResetEmailRequest" element={<ResetEmailRequest />} />
        <Route path="/PasswordRecoveryForm/:token" element={<ResetEmailSetup />} />
        <Route path="/EmailConfirmationSuccess" element={<EmailConfirmationSuccess />} />
        <Route path="/CEOPortal" element={<CEOPortal />} />
        <Route path="/LiveProofSection" element={<LiveProofSection />} />
        <Route path="/CarpenterRouting" element={<CarpenterRouting />} />
        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
        <Route path="/ProfileView" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
        <Route path="/TodoList" element={<TodoList />} />
        <Route path="/Yourtasks" element={<Yourtasks />} />
        <Route path="/AdminDashboard" element={<AdminOnlyRoute><AdminDashboard /></AdminOnlyRoute>} />
        <Route path="/AddressComponent" element={<AddressComponent />} />
        <Route path="/PaymentGateway" element={<PaymentGateway />} />
        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
        <Route path="/YourOrders" element={<YourOrders />} />
        <Route path="/admin-setup" element={<AdminSetup />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
