import React from 'react';

const BaristaHeader = ({ name, avatar }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
    <div className="flex flex-col items-center md:flex-row md:items-start">
      <div className="w-32 h-32 rounded-full border-4 border-gray-300 overflow-hidden">
        <img
          src={avatar}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
        <h1 className="text-2xl font-semibold text-gray-800">{name || "Barista Name"}</h1>
        <p className="text-lg text-gray-600 mt-1">Professional Barista</p>
      </div>
    </div>
  </div>
);

export default BaristaHeader;
