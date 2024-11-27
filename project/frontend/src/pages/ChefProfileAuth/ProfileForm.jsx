import React from "react";
import FormField from "./FormField";

const ProfileForm = ({ formData, errors, handleInputChange }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Phone Number*"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
        />
        <FormField
          label="Certificates*"
          name="culinarySchool"
          type="file"
          onChange={handleInputChange}
          error={errors.culinarySchool}
        />
        <FormField
          label="Portfolio (if applicable)"
          name="portfolio"
          type="file"
          onChange={handleInputChange}
        />
                <FormField
          label="Bio*"
          name="bio"
          type="textarea"
          value={formData.bio}
          onChange={handleInputChange}
          error={errors.bio}
        />

      </div>

      <div className="mt-6">
        <FormField
          label="Recommendations"
          name="recommendations"
          type="textarea"
          value={formData.recommendations}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="bg-green-500 hover:bg-hover-button text-black px-8 py-2 rounded-full text-lg transition duration-300"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
