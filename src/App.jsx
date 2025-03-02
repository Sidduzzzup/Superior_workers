

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

// Admin-only protected route
const AdminOnlyRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Protected Route (for authenticated users only)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/FirstLogin' replace />;
  }

  if (user?.isAdmin) {
    return <Navigate to="/AdminDashboard" replace />;
  }

  return children;
};

////redirecting to employee dashboard
const ProtectedRouteEMP = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/EmployeeLogin' replace />;
  }

  return children;
};


// Redirect authenticated users to home/admin dashboard
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    return user.isAdmin ? <Navigate to="/AdminDashboard" replace /> : <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const hasCheckedAuth = sessionStorage.getItem("authChecked");

    if (!hasCheckedAuth) {
      checkAuth();
      sessionStorage.setItem("authChecked", "true"); // Store that authentication was checked
    }
    setAuthChecked(true);
  }, [checkAuth]);

  if (isCheckingAuth && !authChecked) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  return (
    <>
      {/* Show Navbar only if not on AdminDashboard or CEOPortal */}
      {location.pathname !== "/AdminDashboard" && location.pathname !== "/CEOPortal" && location.pathname !== "/EmployeeDashboard" && <Navbar />}

      <Routes>
        {/* HomePage */}
        <Route path="/" element={<Homepage />} />

        {/* Authentication Routes */}
        <Route path="/LoginRouting" element={<RedirectAuthenticatedUser> <LoginRouting /> </RedirectAuthenticatedUser>} />
        <Route path="/FirstLogin" element={<RedirectAuthenticatedUser> <FirstLogin /> </RedirectAuthenticatedUser>} />
        <Route path="/EmployeeLogin" element={<RedirectAuthenticatedUser> <EmployeeLogin /> </RedirectAuthenticatedUser>} />
        <Route path="/EmployeeSignUp" element={<RedirectAuthenticatedUser> <EmployeeSignUp /> </RedirectAuthenticatedUser>} />

        <Route path="/LogoutConfirmation" element={<LogoutConfirmation />} />
        <Route path="/LogoutConfirmationEMP" element={<LogoutConfirmationEMP />} />
        <Route path="/EmailVerification" element={<EmailVerification />} />

        {/* Service Routes */}
        <Route path="/BuilderRouting" element={<BuilderRouting />} />
        <Route path="/PlumberRouting" element={<PlumberRouting />} />
        <Route path="/Electrician" element={<Electrician />} />
        <Route path="/Works" element={<Works />} />
        <Route path="/workers/:category" element={<WorkerList />} />

        {/* Password Recovery Routes */}
        <Route path="/ResetEmailRequest" element={<ResetEmailRequest />} />
        <Route path="/PasswordRecoveryForm/:token" element={<ResetEmailSetup />} />
        <Route path="/EmailConfirmationSuccess" element={<EmailConfirmationSuccess />} />

        {/* Other Routes */}
        <Route path="/CEOPortal" element={<CEOPortal />} />
        <Route path="/LiveProofSection" element={<LiveProofSection />} />
        <Route path="/CarpenterRouting" element={<CarpenterRouting />} />
        <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />

        {/* Protected Routes */}
        <Route path="/ProfileView" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
        <Route path="/TodoList" element={<TodoList />} />
        <Route path="/Yourtasks" element={<Yourtasks />} />

        {/* Admin-Only Routes */}
        <Route path="/AdminDashboard" element={<AdminOnlyRoute><AdminDashboard /></AdminOnlyRoute>} />
      </Routes>
    </>
  );
}

export default App;
