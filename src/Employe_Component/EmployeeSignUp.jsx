import React, { useState } from 'react';
import Footersection from '../assets/components/Footersection';
import { IoIosMail, IoIosLock } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from '../assets/components/Routing-Component/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeSignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState([]);
  const [availability, setAvailability] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    setLoading(true);
    setError('');

    const data = { name, phone, email, password, skills, availability };

    try {
      const response = await axios.post('https://superior-workers-backend.onrender.com/customers/register-employee', data);
      console.log("Signup response:", response.data);
      navigate("/EmailVerification");
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
          <div className="flex justify-center items-center">
            <img src="/busy.png" alt="Login Form" className="h-[270px] lg:h-[500px] rounded-2xl shadow-2xl" />
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Register As Employee
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input icon={MdPersonAddAlt1} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
              <Input icon={FaPhoneVolume} type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required />
              <Input icon={IoIosMail} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
              <Input icon={IoIosLock} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
              <Input type="text" value={skills.join(", ")} onChange={(e) => setSkills(e.target.value.split(","))} placeholder="Skills (comma-separated)" required />
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={availability} onChange={() => setAvailability(!availability)} />
                <span className="text-white">Available for work?</span>
              </label>
              {error && <p className="text-red-600 text-center">{error}</p>}
              <button type="submit" className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </button>
              <p className="text-center text-sm text-white/80">
                Already have an account? <Link to="/EmployeeLogin" className="text-blue-400 underline">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footersection />
    </>
  );
};

export default EmployeeSignUp;





// {
//   "email": "rahul@example.com",
//   "password": "123456"
// }

// {
//   "name": "Rahul Sharma",
//   "email": "rahul@example.com",
//   "password": "123456",
//   "phone": "9876543210",
//   "skills": ["Plumbing", "Pipe Fitting"],
//   "availability": true
// }
