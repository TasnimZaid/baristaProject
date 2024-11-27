import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Camera, Upload, Phone, FileText, Book } from "lucide-react";
import Navbar from "../../components/Navbar";

const ProfileAuth = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    culinarySchool: null,
    bio: "",
    portfolio: null,
    recommendations: "",
  });
  const [errors, setErrors] = useState({});
  const [applicationStatus, setApplicationStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));

    if (name === "profileImage") {
      setProfileImage(files[0]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.culinarySchool) newErrors.culinarySchool = "Culinary School certificate is required";
    if (!formData.bio) newErrors.bio = "Bio is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        if (profileImage) formDataToSend.append("profileImage", profileImage);
        formDataToSend.append("phone", formData.phone);
        if (formData.culinarySchool) formDataToSend.append("culinarySchool", formData.culinarySchool);
        formDataToSend.append("bio", formData.bio);   
        if (formData.portfolio) formDataToSend.append("portfolio", formData.portfolio);
        formDataToSend.append("recommendations", formData.recommendations);

        const response = await axios.post(
          "http://localhost:3000/api/barista-auth/create",
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true 
          }
        );
        
        console.log('Response:', response.data);
        setApplicationStatus("pending");
        navigate("/Login");
        Swal.fire({
          title: "Your application is pending",
          text: "Your profile is under review. You will be notified once the review is complete.",
          icon: "info",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire({
          title: "Error",
          text: "There was an error submitting your application. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const renderFormField = (name, label, type, Icon) => (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type={type}
          name={name}
          id={name}
          className={`block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
            errors[name] ? 'border-red-500' : ''
          }`}
          placeholder={label}
          value={formData[name]}
          onChange={handleInputChange}
        />
      </div>
      {errors[name] && <p className="mt-2 text-sm text-red-600">{errors[name]}</p>}
    </div>
  );

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-14">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-2 bg-[#292929] text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Complete Your Barista Profile</h2>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-4">
          {/* Left side - Documents */}
          <div className="p-8 bg-gray-200 space-y-6">
            <div className="mb-6">
              <label htmlFor="culinarySchool" className="block text-sm font-medium text-gray-700 mb-2">
                Culinary School Certificate
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="culinarySchool" className="relative cursor-pointer bg-gray-100 rounded-md font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      <span>Upload a file</span>
                      <input
                        id="culinarySchool"
                        name="culinarySchool"
                        type="file"
                        className="sr-only"
                        onChange={handleInputChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF up to 10MB</p>
                </div>
              </div>
              {errors.culinarySchool && <p className="mt-2 text-sm text-red-600">{errors.culinarySchool}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="portfolio" className="relative cursor-pointer bg-gray-100 rounded-md font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      <span>Upload a file</span>
                      <input
                        id="portfolio"
                        name="portfolio"
                        type="file"
                        className="sr-only"
                        onChange={handleInputChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Profile Image and Form */}
          <div className="p-8 bg-white flex flex-col justify-between">
            <div className="mb-6 flex flex-col items-center">
              <div className="relative ">
                <img
                  src={profileImage ? URL.createObjectURL(profileImage) : "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
                />
                <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-2 cursor-pointer shadow-lg">
                  <Camera className="h-6 w-6 text-gray-600" />
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={handleInputChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <div className="ml-6 flex-1">
              {renderFormField("phone", "Phone Number", "tel", Phone)}
              {renderFormField("bio", "Bio", "text", Book)}
            </div>
            
            <div className="space-y-6">
              <div className="mb-6">
                <label htmlFor="recommendations" className="block text-sm font-medium text-gray-700 mb-2">
                  Recommendations (Optional)
                </label>
                <textarea
                  id="recommendations"
                  name="recommendations"
                  rows="4"
                  className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter your recommendations here"
                  value={formData.recommendations}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfileAuth;
