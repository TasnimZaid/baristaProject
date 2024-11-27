import React from "react";

const ProfileImage = ({ profileImage, handleImageUpload }) => {
  return (
    <div className="mb-8 text-center">
      <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-green-500">
        {profileImage ? (
          <img
            src={URL.createObjectURL(profileImage)}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        )}
      </div>
      <label
        htmlFor="profileImage"
        className="cursor-pointer bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300"
      >
        Upload Profile Picture
      </label>
      <input
        id="profileImage"
        type="file"
        name="profileImage"
        className="hidden"
        onChange={handleImageUpload}
        accept="image/*"
      />
    </div>
  );
};

export default ProfileImage;
