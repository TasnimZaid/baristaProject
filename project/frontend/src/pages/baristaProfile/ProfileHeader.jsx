// ProfileHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileHeader = ({ name, title, profileImage }) => (
  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full bg-white p-1">
          <img 
            src={profileImage || "https://via.placeholder.com/150"} 
            alt="Profile" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-xl">{title}</p>
        </div>
      </div>
      <Link 
        to="/TherapistDashboard" 
        className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-100 transition duration-300"
      >
        Dashboard
      </Link>
    </div>
  </div>
);

export default ProfileHeader;
