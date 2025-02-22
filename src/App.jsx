

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

// Protected route for admins only
// const AdminOnlyRoute = ({ children }) => {
//   const { isAuthenticated, user } = useAuthStore();
  
//   // If not authenticated or not an admin, redirect
//   if (!isAuthenticated || !user?.isAdmin) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };
const AdminOnlyRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  // If not authenticated or not an admin, redirect
  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};



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

// Redirect authenticated users to the home page or admin dashboard based on role
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    return user.isAdmin ? <Navigate to="/AdminDashboard" replace /> : <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation(); // ✅ Now it's inside BrowserRouter

  return (
    <>



      {/* Show Navbar only if not on AdminDashboard */}
      {/* {location.pathname !== "/AdminDashboard"  ,"/CEOPortal" && <Navbar />} */}
      {location.pathname !== "/AdminDashboard" && location.pathname !== "/CEOPortal" && <Navbar />}

      <Routes>
        {/* <Route path="/" element={
          isAuthenticated && !user?.isAdmin ? (
            <Homepage />
          ) : (
            <Navigate to="/FirstLogin" replace /> // Redirect admins to login page
          )
        } /> */}
        <Route path='/' element={<Homepage/>} />

        {/* Create an Account */}
        <Route
          path="/LoginRouting"
          element={
            <RedirectAuthenticatedUser>
              <LoginRouting />
            </RedirectAuthenticatedUser>
          }
        />

        {/* Login */}
        <Route
          path="/FirstLogin"
          element={
            <RedirectAuthenticatedUser>
              <FirstLogin />
            </RedirectAuthenticatedUser>
          }
        />

        <Route path="/LogoutConfirmation" element={<LogoutConfirmation />} />
        <Route path="/" element={<Homepage />} />

        {/* Routes for different services */}
        <Route path="/BuilderRouting" element={<BuilderRouting />} />
        <Route path="/PlumberRouting" element={<PlumberRouting />} />
        <Route path="/Electrician" element={<Electrician />} />
        <Route path="/EmailVerification" element={<EmailVerification />} />

        {/* Password reset routes */}
        <Route path="/ResetEmailRequest" element={<ResetEmailRequest />} />
        <Route path="/PasswordRecoveryForm/:token" element={<ResetEmailSetup />} />
        <Route path="/EmailConfirmationSuccess" element={<EmailConfirmationSuccess />} />
        <Route path="/forgot-password" element={<ResetEmailRequest />} />
        <Route path='/CEOPortal' element={<CEOPortal/>} />
        <Route path='/LiveProofSection' element={<LiveProofSection/>} />
        <Route path='/CarpenterRouting' element={<CarpenterRouting/>} />

    
  
      
        {/* Protected routes */}
        <Route
          path="/ProfileView"
          element={
            <ProtectedRoute>
              <ProfileView />
            </ProtectedRoute>
          }
        />
        <Route path="/EmailConfirmationSuccess" element={<EmailConfirmationSuccess />} />
        <Route path="/TodoList" element={<TodoList />} />
        <Route path="/Yourtasks" element={<Yourtasks />} />

        {/* Admin Dashboard - Navbar Hidden */}
        <Route
          path="/AdminDashboard"
          element={
            <AdminOnlyRoute>
              <AdminDashboard />
            </AdminOnlyRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
