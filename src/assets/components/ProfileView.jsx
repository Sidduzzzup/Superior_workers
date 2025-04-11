import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useAuthStore } from "../components/store/authStore";
import { FaLinkedin, FaTwitter, FaGithub, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import AccessRestriction from "./Routing-Component/AccessRestriction.jsx";

const ProfileView = ({ address, onSave }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Initialize formData when address prop changes
  useEffect(() => {
    setFormData({
      street: address?.street || "",
      city: address?.city || "",
      state: address?.state || "",
      postalCode: address?.postalCode || "",
      country: address?.country || "",
    });
  }, [address]);

  // Initialize profileData when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "No name provided",
        email: user.email || "No email provided",
        createdAt: user.createdAt || new Date().toISOString(),
        lastLogin: user.lastLogin || new Date().toISOString(),
        avatar: "https://cdn-icons-png.flaticon.com/512/7077/7077313.png",
        bio: "Passionate software developer with a love for creating beautiful and functional user experiences.",
        completionPercentage: 85,
        socialLinks: {
          linkedin: "https://linkedin.com/in/alexandra",
          twitter: "https://twitter.com/alexandra",
          github: "https://github.com/alexandra",
        },
        achievements: [
          { id: 1, title: "Code Master", icon: "🏆" },
          { id: 2, title: "Team Player", icon: "👥" },
          { id: 3, title: "Innovation Star", icon: "⭐" },
        ],
      });
      setIsLoading(false); // Set loading to false once profileData is set
    }
  }, [user]);

  // Rotate quotes every 3 seconds
  useEffect(() => {
    const quotes = [
      "Reliable, skilled, and just a call away—get your minor home repairs done with ease!",
      "No job is too small when it comes to making your home perfect!",
      "From fixing leaks to assembling furniture, we handle the little things so you can enjoy the big moments!",
    ];
    const interval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1511367461989-f85a21fda167";
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
  
    try {
      localStorage.setItem("userId", user._id); // <-- ADD THIS LINE
      const userId = localStorage.getItem("userId"); // Retrieve the user ID from localStorage
      console.log("User ID from localStorage:", userId); // Debugging line
      
  
      if (!userId) {
        setError("User ID not found. Please log in again.");
        return;
      }
  
      const payload = {
        userId: userId,
        address: formData,
      };
  
      const response = await fetch("https://superior-workers-backend.onrender.com/customers/update-address", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      console.log("Raw Response:", response);
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update address: ${errorData}`);
      }
  
      const result = await response.json();
      console.log("Address updated successfully:", result);
  
      if (onSave) {
        onSave(formData);
      }
    } catch (error) {
      console.error("Error updating address:", error.message);
      setError("Failed to update address. Please try again later.");
    }
  };
  


  // Fetch address data from the backend
useEffect(() => {
  const fetchAddress = async () => {
      try {
          const token = localStorage.getItem("authToken"); // Retrieve the token
          if (!token) {
              console.error("No token found in localStorage");
              setError("Unauthorized: Please log in again.");
              return;
          }

          const response = await fetch("https://superior-workers-backend.onrender.com/customers/get-address", {
              method: "GET",
              headers: {
                  Authorization: `Bearer ${token}`, // Include token
                  "Content-Type": "application/json",
              },
              credentials: "include", // Equivalent to `withCredentials: true` in Axios
          });

          if (!response.ok) {
              if (response.status === 401) {
                  setError("Session expired. Please log in again.");
              } else {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return;
          }

          const data = await response.json();
          console.log("Fetched address data:", data);

          if (data && data.address) {
              setFormData({
                  street: data.address.street || "",
                  city: data.address.city || "",
                  state: data.address.state || "",
                  postalCode: data.address.postalCode || "",
                  country: data.address.country || "",
              });
          } else {
              setError("Address not found.");
          }
      } catch (error) {
          console.error("Error fetching address:", error);
          setError("Failed to fetch address. Please try again later.");
      } finally {
          setIsLoading(false);
      }
  };

  fetchAddress();
}, []);







  // Restrict access if not authenticated
  if (!isAuthenticated) {
    return <AccessRestriction />;
  }

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  // Show error message if there's an error
  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  // Render the profile view
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
              <button
        onClick={() => {
          console.log("Logout button clicked!");
          logout();
          navigate("/LogoutConfirmation");
        }}
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30"
        aria-label="Logout"
      >
        Logout
      </button>


          <Link to="/">
            <button className="absolute top-4 right-24 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30">
              Home
            </button>
          </Link>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30"
            aria-label="Edit Profile"
          >
            <FaEdit className="text-white text-xl" />
          </button>
        </div>

        <div className="relative px-6 pb-8">
          <div className="flex flex-col items-center -mt-20">
            <div className="relative group">
              <img
                src={profileData?.avatar}
                alt="Profile"
                onError={handleImageError}
                onLoad={() => setIsImageLoaded(true)}
                className={`h-32 w-32 object-cover rounded-full border-4 border-white shadow-lg ${!isImageLoaded ? "animate-pulse bg-gray-200" : ""}`}
              />
            </div>

            <h1 className="mt-4 text-3xl font-bold text-gray-800">{profileData?.name}</h1>
            <p className="text-gray-600 mt-2">{profileData?.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since {format(new Date(profileData?.createdAt), "MMMM dd, yyyy")}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Last Login {format(new Date(profileData?.lastLogin), "MMMM dd, yyyy")}
            </p>

            <div className="w-full mt-6">
              <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${profileData?.completionPercentage}%` }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Profile Completion: {profileData?.completionPercentage}%
              </p>
            </div>

            <div className="mt-6 px-4 py-5 bg-gray-50 rounded-xl w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">About Me</h2>
              <p className="text-gray-600 leading-relaxed italic">{profileData?.bio}</p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm font-medium">{currentQuote}</p>
              </div>
            </div>

            <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Saved Address</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700"><strong><b>Street:</b></strong> {formData.street || "Not provided"}</p>
                <p className="text-gray-700"><strong><b>City:</b></strong> {formData.city || "Not provided"}</p>
                <p className="text-gray-700"><strong><b>State:</b></strong> {formData.state || "Not provided"}</p>
                <p className="text-gray-700"><strong><b>Postal Code:</b></strong> {formData.postalCode || "Not provided"}</p>
                <p className="text-gray-700"><strong><b>Country:</b></strong> {formData.country || "Not provided"}</p>
              </div>
            </div>
            <button onClick={() => navigate('/AddressComponent')} className="bg-black text-white font-semibold rounded-lg p-3"> Exclusive for Only Rishik</button>

            <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Update Address</h2>
              <form onSubmit={handleSubmit}>
                {["street", "city", "state", "postalCode", "country"].map((field) => (
                  <div key={field} className="mb-3">
                    <label className="block text-sm font-medium capitalize">{field}</label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      placeholder={`Enter ${field}`}
                    />
                  </div>
                ))}
                <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  Save Address
                </button>
              </form>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href={profileData?.socialLinks?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={profileData?.socialLinks?.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
                aria-label="Twitter Profile"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href={profileData?.socialLinks?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-900 transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub size={24} />
              </a>
            </div>

            <div className="mt-8 flex gap-3 flex-wrap justify-center">
              {profileData?.achievements?.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full"
                >
                  <span className="text-xl">{achievement.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {achievement.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;