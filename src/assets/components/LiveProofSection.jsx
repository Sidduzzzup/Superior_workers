import React, { useState, useEffect } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const LiveProofSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ["all", "plumbing", "electrical", "roofing", "flooring"];

  const galleryData = [
    {
      id: 1,
      category: "plumbing",
      title: "Kitchen Sink Installation",
      image: "https://images.unsplash.com/photo-1632829882891-5047ccc421bc",
      description: "Complete kitchen renovation with modern fixtures"
    },
    {
      id: 2,
      category: "plumbing",
      title: "Bathroom Remodel",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
      description: "Luxury bathroom upgrade with new plumbing"
    },
    {
      id: 3,
      category: "electrical",
      title: "Smart Home Wiring",
      image: "https://images.unsplash.com/photo-1552290403-015b13a5221c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9tZSUyMGxpZ2h0aW5nfGVufDB8fDB8fHww",
      description: "Modern electrical system installation"
    },
    {
      id: 4,
      category: "electrical",
      title: "Lighting Installation",
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a",
      description: "Energy-efficient lighting upgrade"
    },
    {
      id: 5,
      category: "roofing",
      title: "Roof Replacement",
      image: "https://images.unsplash.com/photo-1508337323540-f5d861907573?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Um9vZiUyMFJlcGxhY2VtZW50fGVufDB8fDB8fHww",
      description: "Complete roof overhaul with premium materials"
    },
    {
      id: 6,
      category: "roofing",
      title: "Gutter Installation",
      image: "https://plus.unsplash.com/premium_photo-1686231455493-e042b4a70377?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3V0dGVyfGVufDB8fDB8fHww",
      description: "New seamless gutter system"
    },
    {
      id: 7,
      category: "flooring",
      title: "Hardwood Installation",
      image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d",
      description: "Premium hardwood flooring"
    },
    {
      id: 8,
      category: "flooring",
      title: "Tile Work",
      image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0",
      description: "Custom tile installation"
    }
  ];

  const filteredImages = activeCategory === "all"
    ? galleryData
    : galleryData.filter(item => item.category === activeCategory);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const navigateImage = (direction) => {
    const currentIndex = galleryData.findIndex(img => img.id === selectedImage.id);
    let newIndex = direction === "next"
      ? (currentIndex + 1) % galleryData.length
      : (currentIndex - 1 + galleryData.length) % galleryData.length;
    setSelectedImage(galleryData[newIndex]);
  };

  return (
    <div className="bg-[#F5F5F5] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#333333] text-center mb-8">Our Work Transformations</h2>
        <p className="text-lg text-gray-600 text-center mb-12">Browse through our recent home repair projects</p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === category
                ? "bg-[#3B82F6] text-white"
                : "bg-white text-[#333333] hover:bg-[#2563EB] hover:text-white"}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map(item => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl"
              onClick={() => handleImageClick(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transform transition-transform group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-[#3B82F6] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#2563EB] transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B82F6]">
            Schedule Your Repair Today
          </button>
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
              aria-label="Close lightbox"
            >
              <FiX />
            </button>
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 text-white text-3xl hover:text-gray-300"
              aria-label="Previous image"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 text-white text-3xl hover:text-gray-300"
              aria-label="Next image"
            >
              <FiChevronRight />
            </button>
            <div className="max-w-4xl max-h-[80vh] p-4">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] object-contain"
              />
              <div className="text-white text-center mt-4">
                <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                <p className="text-lg mt-2">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveProofSection;