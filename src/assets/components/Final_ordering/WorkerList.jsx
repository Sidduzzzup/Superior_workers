

import React from 'react';
import { useParams } from 'react-router-dom';
import { workers } from './workersData'; // Import worker data

const WorkerList = () => {
  const { category } = useParams(); // Get category from URL

  // Filter workers based on the selected category
  const filteredWorkers = workers.filter(worker => worker.category === category);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold text-center text-blue-600 capitalize">{category} Workers</h1>

      {filteredWorkers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {filteredWorkers.map(worker => (
            <div key={worker.id} className="border p-5 rounded-lg shadow-lg">
              
              <img
                src={worker.photo}
                alt={worker.name}
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h2 className="text-2xl font-semibold">{worker.name}</h2>
              
                <p  className="text-lg font-semibold"> 
                    Profession : {worker.category}</p>
              <p><strong>Experience:</strong> {worker.experience}</p>
              <p><strong>Location:</strong> {worker.location}</p>
              <p><strong>Price:</strong> ₹{worker.price}</p>
              <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg">
                Hire Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-5">No workers found in this category.</p>
      )}
    </div>
  );
};

export default WorkerList;
