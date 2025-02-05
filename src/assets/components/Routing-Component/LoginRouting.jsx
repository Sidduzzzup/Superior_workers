



import React, { useState } from 'react';
import Footersection from '../Footersection';
import { IoIosMail, IoIosLock, IoIosKey } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from './Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginRouting = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [passKey, setPassKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    setLoading(true);
    setError('');

    // Prepare the data to send to the backend
    const data = {
      name,
      phone,
      email,
      password,
      isAdmin,
      passKey: isAdmin ? passKey : undefined, // Only send passKey if isAdmin is true
    };

    try {
      const response = await axios.post('http://localhost:3000/customers/signup', data);
      console.log("Signup response:", response.data);
      console.log("Data to be sent:", data);
      navigate("/EmailVerification");
      
      // Redirect or show success message here after successful signup
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while signing up.');
      console.error("Signup error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };





  

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full items-center">
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <img
              src="./photo_2025-01-11_10-45-14.jpg"
              alt="Login Form"
              className="h-[270px] lg:h-[450px] rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>

          {/* Form Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Register Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                icon={MdPersonAddAlt1}
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
              />

              <Input
                icon={FaPhoneVolume}
                type="number"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                required
                className="bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
              />

              <Input
                icon={IoIosMail}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
              />

              <Input
                icon={IoIosLock}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
              />

              {isAdmin && (
                <Input
                  icon={IoIosKey}
                  type="password"
                  id="passKey"
                  value={passKey}
                  onChange={(e) => setPassKey(e.target.value)}
                  placeholder="Admin Pass Key"
                  required={isAdmin}
                  className="bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
                />
              )}

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-400"
                    />
                    <label htmlFor="remember" className="ml-2 text-sm text-white/80">
                      Remember me
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="admin"
                      type="checkbox"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-400"
                    />
                    <label htmlFor="admin" className="ml-2 text-sm text-white/80">
                      Admin
                    </label>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-600 text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-white/80">
                Already have an account?{" "}
                <Link 
                  to="/FirstLogin" 
                  className="text-blue-400 hover:text-blue-300 font-semibold underline transition-colors"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footersection />
    </>
  );
};

export default LoginRouting;
