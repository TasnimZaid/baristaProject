import React from 'react';
import { Edit } from 'lucide-react';

const BioSection = ({ editing, handleEdit, handleSave, setBio }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Bio Section</h2>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span>Bio Content</span>
          {editing ? (
            <input 
              type="text" 
              onChange={(e) => setBio(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5"
            />
          ) : (
            <span>Current Bio</span>
          )}
        </div>
        {editing ? (
          <button 
            onClick={() => handleSave()} 
            className="text-blue-500 hover:text-blue-700"
          >
            Save
          </button>
        ) : (
          <button 
            onClick={() => handleEdit()} 
            className="text-gray-500 hover:text-gray-700"
          >
            <Edit size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BioSection;
