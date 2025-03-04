// import React, { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { useAuthStore } from "../components/store/authStore";
// import { FaLinkedin, FaTwitter, FaGithub, FaEdit } from "react-icons/fa";
// import LogoutConfirmation from "../components/Routing-Component/LogoutConfirmation.jsx"
// import AccessRestriction from "./Routing-Component/AccessRestriction.jsx";
// import { formatDate } from "../components/date/Date.js";

// import { Link } from "react-router-dom";

// const ProfileView = ({ address, onSave }) => {
//   const { user, isAuthenticated, logout } = useAuthStore(); // Access user and auth state
//   const [profileData, setProfileData] = useState(null); // Initialize state for user data
//   const [isEditing, setIsEditing] = useState(false); // Edit state
//   const [isImageLoaded, setIsImageLoaded] = useState(false); // Image load state
//   const [currentQuote, setCurrentQuote] = useState(""); // Motivational quote state
//   const [address, setAddress] = useState(""); // Address state

//   useEffect(() => {
//     if (user) {
//       // Populate profileData only if user data is available
//       setProfileData({
//         name: user.name || "No name provided",
//         email: user.email || "No email provided",
//         createdAt: user.createdAt || new Date().toISOString(),
//          lastLogin: user.lastLogin || new Date().toISOString(),
//         avatar: user.avatar || "https://via.placeholder.com/150",
//         bio: "Passionate software developer with a love for creating beautiful and functional user experiences. Always learning, always growing.",
//         completionPercentage: 85,
//         socialLinks: {
//           linkedin: "https://linkedin.com/in/alexandra",
//           twitter: "https://twitter.com/alexandra",
//           github: "https://github.com/alexandra",
//         },
//         achievements: [
//           { id: 1, title: "Code Master", icon: "🏆" },
//           { id: 2, title: "Team Player", icon: "👥" },
//           { id: 3, title: "Innovation Star", icon: "⭐" },
//         ],
//       });
//     }
//   }, [user]); // Re-run whenever user changes

//   useEffect(() => {
//     const motivationalQuotes = [
//       "Reliable, skilled, and just a call away—get your minor home repairs done with ease and perfection!",
//        "No job is too small when it comes to making your home perfect—trust us for quick, hassle-free fixes!",
//          "From fixing leaks to assembling furniture, we handle the little things so you can enjoy the big moments!"
//     ];

//     const interval = setInterval(() => {
//       const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
//       setCurrentQuote(motivationalQuotes[randomIndex]);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []); // Initialize quote rotation

//   const handleImageError = (e) => {
//     e.target.src = "https://images.unsplash.com/photo-1511367461989-f85a21fda167";
//   };

//   if (!isAuthenticated) {
//     return <AccessRestriction/>;
//   }

//   if (!profileData) {
//     return <div>Loading profile...</div>; // Handle loading state
//   }


  
//     const [formData, setFormData] = useState({
//       street: address?.street || "",
//       city: address?.city || "",
//       state: address?.state || "",
//       postalCode: address?.postalCode || "",
//       country: address?.country || "",
//     });
  
//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       onSave(formData); // Pass data to parent component (API call)
//     };


//     const handleSaveAddress = async (updatedAddress) => {
//       try {
//         const response = await fetch("/api/update-address", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(updatedAddress),
//         });
//         if (response.ok) alert("Address updated successfully!");
//       } catch (error) {
//         console.error("Error updating address:", error);
//       }
//     };
    

//   return (



     


//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
//         <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
//           <button
//             onClick={logout} // Call the logout method
//             className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-300"
//             aria-label="Logout"
//           >
//             Logout
//           </button>
//           <Link to="/">
//           <button
           
//             className="absolute top-4 right-24 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-300"
//             aria-label="Logout"
//           >
//             Home
//           </button>
//           </Link>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all duration-300"
//             aria-label="Edit Profile"
//           >
//             <FaEdit className="text-white text-xl" />
//           </button>
//         </div>

//         <div className="relative px-6 pb-8">
//           <div className="flex flex-col items-center -mt-20">
//             <div className="relative group">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
//               <div className="relative">
//                 <img
//                   src={profileData.avatar}
//                   alt="Profile"
//                   onError={handleImageError}
//                   onLoad={() => setIsImageLoaded(true)}
//                   className={`h-32 w-32 object-cover rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-105 ${!isImageLoaded ? "animate-pulse bg-gray-200" : ""}`}
//                 />
//               </div>
//             </div>

//             <h1 className="mt-4 text-3xl font-bold text-gray-800">{profileData.name}</h1>
//             <p className="text-gray-600 mt-2 truncate max-w-xs">{profileData.email}</p>
//             <p className="text-sm text-gray-500 mt-1">
//               Member since{" "}
//               {profileData.createdAt && !isNaN(new Date(profileData.createdAt)) ? (
//                 format(new Date(profileData.createdAt), "MMMM dd, yyyy")
//               ) : (
//                 "Unknown"
//               )}
//             </p>
//             <p className="text-sm text-gray-500 mt-1">
//               Last Login{" "}
//               {profileData.lastLogin && !isNaN(new Date(profileData.lastLogin)) ? (
//                 formatDate(new Date(profileData.lastLogin), "MMMM dd, yyyy")
//               ) : (
//                 "Unknown"
//               )}
//             </p>


//             <div className="w-full mt-6">
//               <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
//                   style={{ width: `${profileData.completionPercentage}%` }}
//                 ></div>
//               </div>
//               <p className="text-sm text-gray-600 mt-2 text-center">
//                 Profile Completion: {profileData.completionPercentage}%
//               </p>
//             </div>

//             <div className="mt-6 px-4 py-5 bg-gray-50 rounded-xl w-full">
//               <h2 className="text-xl font-semibold text-gray-800 mb-3">About Me</h2>
//               <p className="text-gray-600 leading-relaxed italic">{profileData.bio}</p>
//               <div className="mt-4 p-4 bg-blue-50 rounded-lg">
//                 <p className="text-blue-800 text-sm font-medium animate-fade-in">
//                   {currentQuote}
//                 </p>
//               </div>
//             </div>




//                     {/* <div className="p-4 bg-gray-100 rounded-lg shadow-lg w-full m-4">
//               <h2 className="text-lg font-semibold mb-2">Enter Your Address</h2>
//               <textarea
//                 className="w-full p-2 border rounded-lg"
//                 rows="5"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Type your address here..."
//               />
//               <button
//                 className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//                 onClick={"/"}
//                 // handleSave
//               >
//                 Save Address
//               </button>
//             </div> */}







// <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Update Address</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="block text-sm font-medium">Street</label>
//           <input
//             type="text"
//             name="street"
//             value={formData.street}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter street"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block text-sm font-medium">City</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter city"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block text-sm font-medium">State</label>
//           <input
//             type="text"
//             name="state"
//             value={formData.state}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter state"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block text-sm font-medium">Postal Code</label>
//           <input
//             type="text"
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter postal code"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="block text-sm font-medium">Country</label>
//           <input
//             type="text"
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter country"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//         >
//           Save Address
//         </button>
//       </form>
//     </div>
  





            // <div className="flex gap-4 mt-6">
            //   <a
            //     href={profileData.socialLinks.linkedin}
            //     target="_blank"
            //     rel="noopener noreferrer"
            //     className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
            //     aria-label="LinkedIn Profile"
            //   >
            //     <FaLinkedin size={24} />
            //   </a>
            //   <a
            //     href={profileData.socialLinks.twitter}
            //     target="_blank"
            //     rel="noopener noreferrer"
            //     className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
            //     aria-label="Twitter Profile"
            //   >
            //     <FaTwitter size={24} />
            //   </a>
            //   <a
            //     href={profileData.socialLinks.github}
            //     target="_blank"
            //     rel="noopener noreferrer"
            //     className="text-gray-800 hover:text-gray-900 transition-colors duration-300"
            //     aria-label="GitHub Profile"
            //   >
            //     <FaGithub size={24} />
            //   </a>
            // </div>

            // <div className="mt-8 flex gap-3 flex-wrap justify-center">
            //   {profileData.achievements.map((achievement) => (
            //     <div
            //       key={achievement.id}
            //       className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full"
            //     >
            //       <span className="text-xl">{achievement.icon}</span>
            //       <span className="text-sm font-medium text-gray-700">
            //         {achievement.title}
            //       </span>
            //     </div>
            //   ))}
            // </div>
//             <div>
//               {/* add address */}
//               </div>
//           </div>
//         </div>
//       </div>


   


//     </div>
//   );
// };

// export default ProfileView;



import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useAuthStore } from "../components/store/authStore";
import { FaLinkedin, FaTwitter, FaGithub, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import AccessRestriction from "./Routing-Component/AccessRestriction.jsx";

const ProfileView = ({ address, onSave }) => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");

  const [formData, setFormData] = useState({
    street: address?.street || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    country: address?.country || "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "No name provided",
        email: user.email || "No email provided",
        createdAt: user.createdAt || new Date().toISOString(),
        lastLogin: user.lastLogin || new Date().toISOString(),
        avatar: user.avatar || "https://via.placeholder.com/150",
        bio: "Passionate software developer with a love for creating beautiful and functional user experiences.",
        completionPercentage: 85,
        socialLinks: {
          linkedin: "https://linkedin.com/in/alexandra",
          twitter: "https://twitter.com/alexandra",
          github: "https://github.com/alexandra",
        }, achievements: [
               { id: 1, title: "Code Master", icon: "🏆" },
              { id: 2, title: "Team Player", icon: "👥" },
               { id: 3, title: "Innovation Star", icon: "⭐" },
                   ],
      });
    }
  }, [user]);

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

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1511367461989-f85a21fda167";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isAuthenticated) {
    return <AccessRestriction />;
  }

  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
          <button
            onClick={logout}
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
                src={profileData.avatar}
                alt="Profile"
                onError={handleImageError}
                onLoad={() => setIsImageLoaded(true)}
                className={`h-32 w-32 object-cover rounded-full border-4 border-white shadow-lg ${!isImageLoaded ? "animate-pulse bg-gray-200" : ""}`}
              />
            </div>

            <h1 className="mt-4 text-3xl font-bold text-gray-800">{profileData.name}</h1>
            <p className="text-gray-600 mt-2">{profileData.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since {format(new Date(profileData.createdAt), "MMMM dd, yyyy")}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Last Login {format(new Date(profileData.lastLogin), "MMMM dd, yyyy")}
            </p>

            <div className="w-full mt-6">
              <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${profileData.completionPercentage}%` }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Profile Completion: {profileData.completionPercentage}%
              </p>
            </div>

            <div className="mt-6 px-4 py-5 bg-gray-50 rounded-xl w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">About Me</h2>
              <p className="text-gray-600 leading-relaxed italic">{profileData.bio}</p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm font-medium">{currentQuote}</p>
              </div>
            </div>

            {/* Address Form */}
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
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
