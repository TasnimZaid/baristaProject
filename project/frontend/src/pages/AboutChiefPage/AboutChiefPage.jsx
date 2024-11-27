// Login / Register page

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Award,
  BookOpen,
  Calendar,
  Star,
  MessageSquare,
  Edit,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
function AboutChiefPage() {
  // Dummy data - replace with actual data from your backend
  const [chef, setChef] = useState({
    name: "Chef John Doe",
    title: "Executive Chef",
    email: "john.doe@example.com",
    phone: "+1 (555) 987-6543",
    rating: 4.9,
    reviews: 245,
    bio: "Chef John Doe is a renowned culinary expert with over 15 years of experience in creating exquisite dishes. Specializes in Italian and French cuisine.",
    education: [
      {
        degree: "Culinary Arts Diploma",
        institution: "Le Cordon Bleu, Paris",
        year: 2005,
      },
      {
        degree: "Bachelor of Science in Hospitality Management",
        institution: "New York University",
        year: 2002,
      },
    ],
    certifications: [
      "Certified Master Chef (CMC)",
      "Advanced Pastry Arts Certification",
      "Food Safety and Hygiene Certification",
    ],
    dishes: [
      { name: "Truffle Risotto", price: 30 },
      { name: "Beef Wellington", price: 50 },
      { name: "Lobster Bisque", price: 25 },
      { name: "Tiramisu", price: 15 },
    ],
  });

  const [editing, setEditing] = useState({
    bio: false,
    phone: false,
    email: false,
  });

  const handleEdit = (field) => {
    setEditing({ ...editing, [field]: true });
  };

  const handleSave = (field) => {
    setEditing({ ...editing, [field]: false });
    // Here you would typically send the updated data to your backend
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-6 bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-12">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full bg-white p-1">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{chef.name}</h1>
                  <p className="text-xl">{chef.title}</p>
                </div>
              </div>
              <Link
                to="/ChefDashboard"
                className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-100 transition duration-300"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              {/* Contact Info */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">
                  Contact Information
                </h2>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Mail size={18} />
                    {editing.email ? (
                      <input
                        type="email"
                        value={chef.email}
                        onChange={(e) =>
                          setChef({ ...chef, email: e.target.value })
                        }
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      <span>{chef.email}</span>
                    )}
                  </div>
                  {editing.email ? (
                    <button
                      onClick={() => handleSave("email")}
                      className="text-green-500"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit("email")}
                      className="text-gray-500"
                    >
                      <Edit size={18} />
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone size={18} />
                    {editing.phone ? (
                      <input
                        type="tel"
                        value={chef.phone}
                        onChange={(e) =>
                          setChef({ ...chef, phone: e.target.value })
                        }
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      <span>{chef.phone}</span>
                    )}
                  </div>
                  {editing.phone ? (
                    <button
                      onClick={() => handleSave("phone")}
                      className="text-green-500"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit("phone")}
                      className="text-gray-500"
                    >
                      <Edit size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-semibold">About Me</h2>
                  {editing.bio ? (
                    <button
                      onClick={() => handleSave("bio")}
                      className="text-green-500"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit("bio")}
                      className="text-gray-500"
                    >
                      <Edit size={18} />
                    </button>
                  )}
                </div>
                {editing.bio ? (
                  <textarea
                    value={chef.bio}
                    onChange={(e) => setChef({ ...chef, bio: e.target.value })}
                    className="w-full h-32 border rounded p-2"
                  />
                ) : (
                  <p>{chef.bio}</p>
                )}
              </div>

              {/* Education */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">Education</h2>
                {chef.education.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-semibold">{edu.degree}</p>
                    <p>
                      {edu.institution}, {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Certifications */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">Certifications</h2>
                <ul className="list-disc list-inside">
                  {chef.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>

              {/* Dishes */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">
                  Dishes & Pricing
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {chef.dishes.map((dish, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-3 rounded flex justify-between items-center"
                    >
                      <p className="font-semibold">{dish.name}</p>
                      <p>
                        <DollarSign size={14} className="inline-block mr-1" />
                        {dish.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ratings and Reviews */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-3">
                  Ratings and Reviews
                </h2>
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-400" fill="currentColor" />
                  <span className="font-bold">{chef.rating}</span>
                  <span>({chef.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutChiefPage;
