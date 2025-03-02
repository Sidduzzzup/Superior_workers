import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useAuthStore } from "../components/store/authStore";
import { FaLinkedin, FaTwitter, FaGithub, FaEdit } from "react-icons/fa";
import LogoutConfirmation from "../components/Routing-Component/LogoutConfirmation.jsx"
import AccessRestriction from "./Routing-Component/AccessRestriction.jsx";
import { formatDate } from "../components/date/Date.js";

import { Link } from "react-router-dom";

const ProfileView = () => {
  const { user, isAuthenticated, logout } = useAuthStore(); // Access user and auth state
  const [profileData, setProfileData] = useState(null); // Initialize state for user data
  const [isEditing, setIsEditing] = useState(false); // Edit state
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Image load state
  const [currentQuote, setCurrentQuote] = useState(""); // Motivational quote state

  useEffect(() => {
    if (user) {
      // Populate profileData only if user data is available
      setProfileData({
        name: user.name || "No name provided",
        email: user.email || "No email provided",
        createdAt: user.createdAt || new Date().toISOString(),
         lastLogin: user.lastLogin || new Date().toISOString(),
        avatar: user.avatar || "https://via.placeholder.com/150",
        bio: "Passionate software developer with a love for creating beautiful and functional user experiences. Always learning, always growing.",
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
    }
  }, [user]); // Re-run whenever user changes

  useEffect(() => {
    const motivationalQuotes = [
      "Reliable, skilled, and just a call away—get your minor home repairs done with ease and perfection!",
       "No job is too small when it comes to making your home perfect—trust us for quick, hassle-free fixes!",
         "From fixing leaks to assembling furniture, we handle the little things so you can enjoy the big moments!"
    ];

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []); // Initialize quote rotation

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1511367461989-f85a21fda167";
  };

  if (!isAuthenticated) {
    return <AccessRestriction/>;
  }

  if (!profileData) {
    return <div>Loading profile...</div>; // Handle loading state
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
          <button
            onClick={logout} // Call the logout method
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            aria-label="Logout"
          >
            Logout
          </button>
          <Link to="/">
          <button
           
            className="absolute top-4 right-24 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            aria-label="Logout"
          >
            Home
          </button>
          </Link>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            aria-label="Edit Profile"
          >
            <FaEdit className="text-white text-xl" />
          </button>
        </div>

        <div className="relative px-6 pb-8">
          <div className="flex flex-col items-center -mt-20">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  onError={handleImageError}
                  onLoad={() => setIsImageLoaded(true)}
                  className={`h-32 w-32 object-cover rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-105 ${!isImageLoaded ? "animate-pulse bg-gray-200" : ""}`}
                />
              </div>
            </div>

            <h1 className="mt-4 text-3xl font-bold text-gray-800">{profileData.name}</h1>
            <p className="text-gray-600 mt-2 truncate max-w-xs">{profileData.email}</p>
            <p className="text-sm text-gray-500 mt-1">
  Member since{" "}
  {profileData.createdAt && !isNaN(new Date(profileData.createdAt)) ? (
    format(new Date(profileData.createdAt), "MMMM dd, yyyy")
  ) : (
    "Unknown"
  )}
</p>
<p className="text-sm text-gray-500 mt-1">
  Last Login{" "}
  {profileData.lastLogin && !isNaN(new Date(profileData.lastLogin)) ? (
    formatDate(new Date(profileData.lastLogin), "MMMM dd, yyyy")
  ) : (
    "Unknown"
  )}
</p>


            <div className="w-full mt-6">
              <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${profileData.completionPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Profile Completion: {profileData.completionPercentage}%
              </p>
            </div>

            <div className="mt-6 px-4 py-5 bg-gray-50 rounded-xl w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">About Me</h2>
              <p className="text-gray-600 leading-relaxed italic">{profileData.bio}</p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm font-medium animate-fade-in">
                  {currentQuote}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={profileData.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
                aria-label="Twitter Profile"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-900 transition-colors duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub size={24} />
              </a>
            </div>

            <div className="mt-8 flex gap-3 flex-wrap justify-center">
              {profileData.achievements.map((achievement) => (
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
            <div>
              {/* add address */}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
