import React from 'react';

const TabButton = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
      isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
    }`}
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

export default TabButton;
