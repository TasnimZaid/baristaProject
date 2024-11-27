import React from 'react';

const AddSyrupPopup = ({ syrups, onSelect, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div className="bg-white p-5 rounded-lg shadow-xl">
      <h3 className="text-lg font-semibold mb-2">Select Syrup</h3>
      <ul>
        {syrups.map(syrup => (
          <li key={syrup._id} className="mb-2">
            <button 
              onClick={() => onSelect(syrup)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
            >
              {syrup.name}
            </button>
          </li>
        ))}
      </ul>
      <button 
        onClick={onClose}
        className="mt-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
      >
        Close
      </button>
    </div>
  </div>
);

export default AddSyrupPopup;
