import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthStoreOrder } from "../store/authStoreOrder"; // Assuming this file has the Zustand store

const WorkerList = () => {
  const { category } = useParams();
  const { createOrder, orders, isLoading } = useAuthStoreOrder();
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    timeAvailability: "",
  });

  useEffect(() => {
    if (!category) return;
    // Replace this with actual data fetching or mock workers data
    const workers = [
      // Example workers data, replace with actual data source
      { id: 1, category: "carpenter", name: "Rajesh Sharma", experience: "5 years", price: 500, location: "3 km away", photo: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, category: "electrician", name: "Amit Verma", experience: "3 years", price: 400, location: "7 km away", photo: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, category: "builder", name: "Sandeep Yadav", experience: "7 years", price: 700, location: "5 km away", photo: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: 4, category: "plumber", name: "Vikram Singh", experience: "10 years", price: 900, location: "8 km away", photo: "https://randomuser.me/api/portraits/men/4.jpg" },
  { id: 5, category: "cleaner", name: "Anil Kumar", experience: "4 years", price: 300, location: "2 km away", photo: "https://randomuser.me/api/portraits/men/5.jpg" },
  { id: 6, category: "electrician", name: "Sunil Patil", experience: "6 years", price: 450, location: "6 km away", photo: "https://randomuser.me/api/portraits/men/6.jpg" },
  { id: 7, category: "builder", name: "Manoj Pandey", experience: "8 years", price: 750, location: "4 km away", photo: "https://randomuser.me/api/portraits/men/7.jpg" },
  { id: 8, category: "plumber", name: "Deepak Mishra", experience: "12 years", price: 950, location: "9 km away", photo: "https://randomuser.me/api/portraits/men/8.jpg" },
  { id: 9, category: "carpenter", name: "Karan Mehta", experience: "2 years", price: 480, location: "1 km away", photo: "https://randomuser.me/api/portraits/men/9.jpg" },
  { id: 10, category: "electrician", name: "Ravi Gupta", experience: "5 years", price: 420, location: "10 km away", photo: "https://randomuser.me/api/portraits/men/10.jpg" },
  { id: 11, category: "cleaner", name: "Priya Desai", experience: "3 years", price: 280, location: "5 km away", photo: "https://randomuser.me/api/portraits/women/11.jpg" },
  { id: 12, category: "carpenter", name: "Anita Reddy", experience: "6 years", price: 520, location: "4 km away", photo: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 13, category: "builder", name: "Harish Menon", experience: "7 years", price: 430, location: "3 km away", photo: "https://randomuser.me/api/portraits/men/13.jpg" },
  { id: 14, category: "plumber", name: "Rohit Shetty", experience: "9 years", price: 810, location: "2 km away", photo: "https://randomuser.me/api/portraits/men/14.jpg" },
  { id: 15, category: "cleaner", name: "Suman Joshi", experience: "2 years", price: 270, location: "6 km away", photo: "https://randomuser.me/api/portraits/women/15.jpg" },
  { id: 16, category: "electrician", name: "Arun Khanna", experience: "5 years", price: 490, location: "7 km away", photo: "https://randomuser.me/api/portraits/men/16.jpg" },
  { id: 17, category: "builder", name: "Neha Kapoor", experience: "8 years", price: 780, location: "3 km away", photo: "https://randomuser.me/api/portraits/women/17.jpg" },
  { id: 18, category: "plumber", name: "Ganesh Nair", experience: "11 years", price: 930, location: "9 km away", photo: "https://randomuser.me/api/portraits/men/18.jpg" },
  { id: 19, category: "carpenter", name: "Meera Shah", experience: "3 years", price: 500, location: "4 km away", photo: "https://randomuser.me/api/portraits/women/19.jpg" },
  { id: 20, category: "electrician", name: "Suresh Malhotra", experience: "6 years", price: 460, location: "5 km away", photo: "https://randomuser.me/api/portraits/men/20.jpg" },
  { id: 21, category: "builder", name: "Pooja Agarwal", experience: "10 years", price: 850, location: "8 km away", photo: "https://randomuser.me/api/portraits/women/21.jpg" },
  { id: 22, category: "plumber", name: "Yash Rajput", experience: "4 years", price: 600, location: "2 km away", photo: "https://randomuser.me/api/portraits/men/22.jpg" },
  { id: 23, category: "cleaner", name: "Sneha Bhatia", experience: "1 year", price: 250, location: "1 km away", photo: "https://randomuser.me/api/portraits/women/23.jpg" },
  { id: 24, category: "carpenter", name: "Vikash Tiwari", experience: "7 years", price: 550, location: "3 km away", photo: "https://randomuser.me/api/portraits/men/24.jpg" },
  { id: 25, category: "electrician", name: "Manisha Patil", experience: "5 years", price: 480, location: "6 km away", photo: "https://randomuser.me/api/portraits/women/25.jpg" }
    ];
    setFilteredWorkers(workers.filter(worker => worker.category === category));
  }, [category]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, phone, address, timeAvailability } = formData;
    if (!name || !phone || !address || !timeAvailability) {
      toast.error("All fields are required!");
      return false;
    }
    return true;
  };

  const handleHire = async (worker) => {
    if (!validateForm()) return;

    try {
      const orderData = {
        workerId: worker.id,
        name: formData.name,
        phone: formData.phone,
        service: worker.category,
        address: formData.address,
        timeAvailability: formData.timeAvailability,
      };

      await createOrder(orderData);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Error placing order: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center text-blue-600 capitalize">
        -- {category} Workers --
      </h1>

      {/* User Info Form */}
      <div className="text-center my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            name="timeAvailability"
            placeholder="Preferred time for service (e.g., 10:00 AM)"
            value={formData.timeAvailability}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
          />
        </div>
      </div>

      {/* Worker List */}
      {filteredWorkers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {filteredWorkers.map((worker) => (
            <div key={worker.id} className="border p-5 rounded-lg shadow-lg">
              <img
                src={worker.photo || "https://via.placeholder.com/150"}
                alt={worker.name || "Worker photo"}
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h2 className="text-2xl font-semibold text-center mt-3">
                {worker.name}
              </h2>
              <p className="text-lg font-semibold text-center">
                Profession: {worker.category}
              </p>
              <p>
                <strong>Experience:</strong> {worker.experience} years
              </p>
              <p>
                <strong>Location:</strong> {worker.location}
              </p>
              <p>
                <strong>Price:</strong> ₹{worker.price}
              </p>
              <button
                onClick={() => handleHire(worker)}
                className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600"
              >
                Hire Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-red-500 text-xl mt-5">
          No workers found in this category. Please check back later or try a different category.
          <br />
          Negative Impact Sir Possibly No workers found in this category, Roger That!.
        </h2>
      )}
    </div>
  );
};

export default WorkerList;
