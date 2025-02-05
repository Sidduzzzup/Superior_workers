// // import React, { useState } from "react";
// // import { AppProvider } from "@toolpad/core/AppProvider";
// // import { SignInPage } from "@toolpad/core/SignInPage";
// // import { useTheme } from "@mui/material/styles";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useAuthStore } from "../store/authStore.js";
// // import Alert from "@mui/material/Alert";
// // import { motion } from "framer-motion";

// // const providers = [{ id: "credentials", name: "Email and Password" }];

// // export default function FirstLogin() {
// //   const theme = useTheme();
// //   const navigate = useNavigate();
// //   const { login } = useAuthStore();
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [successMessage, setSuccessMessage] = useState("");

// //   const handleSignIn = async (provider, formData) => {
// //     const email = formData.get("email");
// //     const password = formData.get("password");

// //     try {
// //       await login(email, password);
// //       setSuccessMessage("Login successful! Redirecting...");
// //       setErrorMessage("");
      
// //       setTimeout(() => navigate("/"), 3000);
// //     } catch (error) {
// //       setErrorMessage(
// //         error.response?.data?.message || "Login failed! Invalid credentials."
// //       );
// //       setSuccessMessage("");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 sm:p-6">
// //       {/* Main Container */}
// //       <div className="w-full max-w-md mx-4 sm:mx-auto">
// //         {/* Alerts Section */}
// //         <div className="mb-4 space-y-3">
// //           {errorMessage && (
// //             <motion.div
// //               initial={{ opacity: 0, y: -20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.3 }}
// //             >
// //               <Alert
// //                 severity="error"
// //                 className="w-full !bg-red-100/10 !text-red-200 backdrop-blur-sm !border-red-400/30"
// //               >
// //                 {errorMessage}
// //               </Alert>
// //             </motion.div>
// //           )}

// //           {successMessage && (
// //             <motion.div
// //               initial={{ opacity: 0, y: -20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.3 }}
// //             >
// //               <Alert
// //                 severity="success"
// //                 className="w-full !bg-green-100/10 !text-green-200 backdrop-blur-sm !border-green-400/30"
// //               >
// //                 {successMessage}
// //               </Alert>
// //             </motion.div>
// //           )}
// //         </div>

// //         {/* Login Card */}
// //         <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
// //           {/* Heading */}
// //           <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
// //             Welcome Back
// //           </h1>

// //           {/* Login Form */}
// //           <AppProvider theme={theme}>
// //             <SignInPage
// //               signIn={handleSignIn}
// //               providers={providers}
// //               slotProps={{
// //                 root: { className: "space-y-4" },
// //                 emailField: { 
// //                   className: "!bg-white/5 !border-white/10 focus:!border-blue-400",
// //                   InputProps: { 
// //                     className: "!text-white !text-sm sm:!text-base",
// //                     sx: { height: '48px' } 
// //                   }
// //                 },
// //                 passwordField: {
// //                   className: "!bg-white/5 !border-white/10 focus:!border-blue-400",
// //                   InputProps: { 
// //                     className: "!text-white !text-sm sm:!text-base",
// //                     sx: { height: '48px' } 
// //                   }
// //                 },
// //                 submitButton: {
// //                   className: "!bg-blue-500 hover:!bg-blue-600 !text-white !py-3 !rounded-lg !text-sm sm:!text-base !font-medium"
// //                 }
// //               }}
// //             />
// //           </AppProvider>

// //           {/* Bottom Links */}
// //           <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4 text-center">
// //             <Link
// //               to="/ResetEmailRequest"
// //               className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200"
// //             >
// //               Forgot Password?
// //             </Link>
// //             <Link
// //               to="/LoginRouting"
// //               className="text-sm text-purple-300 hover:text-purple-200 transition-colors duration-200"
// //             >
// //               Create New Account
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";
// import { useTheme } from "@mui/material/styles";
// import Alert from "@mui/material/Alert";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const providers = [{ id: "credentials", name: "Email and Password" }];

// export default function FirstLogin() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { login } = useAuthStore();
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleSignIn = async (provider, formData) => {
//     const email = formData.get("email");
//     const password = formData.get("password");

//     try {
//       await login(email, password);
//       setSuccessMessage("Login successful! Redirecting...");
//       setErrorMessage("");

//       setTimeout(() => navigate("/"), 3000);
//     } catch (error) {
//       setErrorMessage(
//         error.response?.data?.message || "Login failed! Invalid credentials."
//       );
//       setSuccessMessage("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 sm:p-6">
//       {/* Main Container */}
//       <div className="w-full max-w-md mx-4 sm:mx-auto">
//         {/* Alerts Section */}
//         <div className="mb-4 space-y-3">
//           {errorMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Alert
//                 severity="error"
//                 className="w-full !bg-red-100/10 !text-red-200 backdrop-blur-sm !border-red-400/30"
//               >
//                 {errorMessage}
//               </Alert>
//             </motion.div>
//           )}

//           {successMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Alert
//                 severity="success"
//                 className="w-full !bg-green-100/10 !text-green-200 backdrop-blur-sm !border-green-400/30"
//               >
//                 {successMessage}
//               </Alert>
//             </motion.div>
//           )}
//         </div>

//         {/* Login Form */}
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             const formData = new FormData(e.target);
//             handleSignIn(providers[0], formData);
//           }}
//           className="bg-white p-6 rounded-lg shadow-md"
//         >
//           <h2 className="text-2xl font-bold mb-4">Login</h2>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
//           >
//             Login
//           </button>
//           <div className="flex justify-between mt-4">
//             <Link
//               to="/forgot-password"
//               className="text-sm font-mono text-gray-900 dark:text-gray-100 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//             <Link
//               to="/signup"
//               className="text-sm font-mono text-gray-900 dark:text-gray-100 hover:underline"
//             >
//               Don't have an account? Sign up
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const providers = [{ id: "credentials", name: "Email and Password" }];

export default function FirstLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    if (!email || !password) {
      setErrorMessage("Email and Password are required");
      return;
    }

    setIsLoading(true);  // Set loading state
    setErrorMessage(""); // Reset error message
    

    try {
      await login(email, password);
      console.log("Attempting login with:", email, password);
    console.log("Login response:", response.data);
      setSuccessMessage("Login successful! Redirecting...");
      setErrorMessage(""); // Reset error message on success

      // Redirect after successful login
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed! Invalid credentials.");
      setSuccessMessage(""); // Reset success message on failure
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 sm:p-6">
      {/* Main Container */}
      <div className="w-full max-w-md mx-4 sm:mx-auto">
        {/* Alerts Section */}
        <div className="mb-4 space-y-3">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                severity="error"
                className="w-full !bg-red-100/10 !text-red-200 backdrop-blur-sm !border-red-400/30"
              >
                {errorMessage}
              </Alert>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                severity="success"
                className="w-full !bg-green-100/10 !text-green-200 backdrop-blur-sm !border-green-400/30"
              >
                {successMessage}
              </Alert>
            </motion.div>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
          <div className="flex justify-between mt-4">
            <Link
              to="/forgot-password"
              className="text-sm font-mono text-gray-900 dark:text-gray-100 hover:underline"
            >
              Forgot Password?
            </Link>
            <Link
              to="/LoginRouting"
              className="text-sm font-mono text-gray-900 dark:text-gray-100 hover:underline"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
