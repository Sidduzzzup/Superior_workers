

// import React, { useState } from 'react';
// import OtpInput from 'react-otp-input';
// import { useAuthStore } from '../store/authStore'; 
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const EmailVerification = () => {
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState(null); 
//   const [successMessage, setSuccessMessage] = useState(null); 
//   const { verifyEmail, isLoading } = useAuthStore();
//   const navigate = useNavigate();

//   const handleChange = (otp) => {
//     setOtp(otp);
//     setError(null);  // Reset error when the OTP changes
//   };

//   const handleVerify = async () => {
//     if (otp.length !== 6) {
//       setError("Please enter a valid 6-digit code.");
//       return; // Prevent submission if the OTP length is incorrect
//     }
    
//     try {
//       // Verify the email OTP
//       const response = await verifyEmail(otp);
//       console.log('Verification successful:', response);
      
//       setSuccessMessage('Email verified successfully!');
//       navigate("/"); // Redirect to homepage after success
//       toast.success("Email verified successfully");

//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       setError(error.response?.data?.message || 'Failed to verify OTP. Please try again.');
//     }
//   };

//   const handleSkip = () => {
//     // Redirect to homepage without verifying the email
//     navigate("/"); 
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         backgroundColor: '#f9f9f9',
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: '10px',
//         }}
//       >
//         <h1 className="font-mono font-semibold text-3xl">Enter Verification Code</h1>

//         {/* OTP Input Field */}
//         <OtpInput
//           value={otp}
//           onChange={handleChange}
//           numInputs={6}
//           separator={<span>-</span>}
//           renderInput={(props) => <input {...props} />}
//           inputStyle={{
//             width: '60px',
//             height: '60px',
//             fontSize: '18px',
//             border: '1px solid #ccc',
//             borderRadius: '4px',
//             marginRight: '10px',
//           }}
//           containerStyle={{
//             display: 'flex',
//             justifyContent: 'center',
//           }}
//         />

//         {/* Error and Success Messages */}
//         {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} 
//         {successMessage && (
//           <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>
//         )}

//         {/* Verify Button */}
//         <button
//           style={{
//             marginTop: '10px',
//             padding: '8px 16px',
//             backgroundColor: '#007BFF',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//           }}
//           onClick={handleVerify}
//           disabled={isLoading} // Disable button while loading
//         >
//           {isLoading ? 'Verifying...' : 'Verify'}
//         </button>

//         {/* Skip Button */}
//         <button
//           style={{
//             marginTop: '200px',
//             padding: '8px 16px',
//             backgroundColor: '#6c757d',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//           }}
//           onClick={handleSkip}
//         >
//           Skip Email Verification
//         </button>
//         <p>Now You can Verify Your Email At Any Time! </p>
//       </div>
//     </div>
//   );
// };

// export default EmailVerification;

import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { verifyEmail, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (otp) => {
    setOtp(otp);
    setError(null);
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    try {
      const response = await verifyEmail(otp);
      console.log("Verification successful:", response);
      setSuccessMessage("Email verified successfully!");
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(error.response?.data?.message || "Failed to verify OTP. Please try again.");
    }
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 ">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Enter Verification Code</h1>

        {/* OTP Input Field */}
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          separator={<span className="mx-1 text-gray-500">-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle="w-24 h-12 p-5 text-lg text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          containerStyle="flex justify-center gap-2 mb-4"
        />

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

        {/* Verify Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md mt-4 transition"
          onClick={handleVerify}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        {/* Skip Button */}
        <button
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 rounded-md mt-3 transition"
          onClick={handleSkip}
        >
          Skip Verification
        </button>

        <p className="text-gray-600 text-sm mt-3">You can verify your email anytime!</p>
      </div>
    </div>
  );
};

export default EmailVerification;


