import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Edit,
  FileText,
  User,
  Coffee,
  Camera,
  Save,
} from "lucide-react";
import { useBaristaProfile } from "../../components/useContext/ProfileContext";
import Navbar from "../../components/Navbar";

const BaristaProfile = () => {
  const { barista, loading, error, updateProfile, updateProfileImage } =
    useBaristaProfile();
  const [editing, setEditing] = useState({
    bio: false,
    phone: false,
    username: false,
  });
  const [profile, setProfile] = useState(barista || {});
  const fileInputRef = useRef(null);

  useEffect(() => {
    setProfile(barista || {});
  }, [barista]);

  const handleEdit = (field) => {
    setEditing({ ...editing, [field]: true });
  };

  const handleSave = async (field) => {
    setEditing({ ...editing, [field]: false });
    try {
      const updatedField =
        field === "username" ? profile.baristaId?.username : profile[field];
      await updateProfile(field, updatedField);
      console.log(`Saved ${field}:`, updatedField);
    } catch (error) {
      console.error(`Error saving ${field}:`, error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await updateProfileImage(file);
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  if (!profile) return null;

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen mt-24">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden relative group">
              <img
                src={`http://localhost:3000/${profile.profileImage}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20"
                >
                  <Camera size={24} />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                {editing.username ? (
                  <input
                    value={profile.baristaId?.username || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        baristaId: { ...profile.baristaId, username: e.target.value },
                      })
                    }
                    className="text-2xl font-bold border-b border-gray-300 focus:outline-none focus:border-amber-500"
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{profile.baristaId?.username}</h1>
                )}
                <button
                  onClick={() => editing.username ? handleSave("username") : handleEdit("username")}
                  className="text-gray-400 hover:text-black"
                >
                  {editing.username ? <Save size={18} /> : <Edit size={18} />}
                </button>
              </div>
              <p className="text-gray-600">Professional Barista</p>
            </div>
            <Link to="/BaristaADashboard">
              <button className="bg-black hover:bg-slate-400 text-white px-4 py-2 rounded-lg flex items-center">
                <Coffee className="mr-2" size={20} /> Dashboard
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" size={20} />
                  <span>{profile.baristaId?.email || "No email provided"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Phone className="text-gray-400" size={20} />
                    {editing.phone ? (
                      <input
                        type="tel"
                        value={profile.phone || ""}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="border-b border-gray-300 focus:outline-none focus:border-amber-500"
                      />
                    ) : (
                      <span>{profile.phone || "No phone number provided"}</span>
                    )}
                  </div>
                  <button
                    onClick={() => editing.phone ? handleSave("phone") : handleEdit("phone")}
                    className="text-gray-400 hover:text-black"
                  >
                    {editing.phone ? <Save size={18} /> : <Edit size={18} />}
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">About Me</h2>
              <div className="flex items-start justify-between">
                {editing.bio ? (
                  <textarea
                    value={profile.bio || ""}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows="4"
                    className="w-full border rounded-lg p-2 focus:outline-none focus:border-amber-500"
                  />
                ) : (
                  <p className="text-gray-600">{profile.bio || "No bio available"}</p>
                )}
                <button
                  onClick={() => editing.bio ? handleSave("bio") : handleEdit("bio")}
                  className="text-gray-400 hover:text-black ml-2"
                >
                  {editing.bio ? <Save size={18} /> : <Edit size={18} />}
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FileText className="text-gray-400" size={20} />
                  <a
                    href={`http://localhost:3000/${profile.culinarySchool}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-slate-400 underline"
                  >
                    View Culinary School Certificate
                  </a>
                </div>
                {profile.portfolio && (
                  <div className="flex items-center space-x-3">
                    <FileText className="text-gray-400" size={20} />
                    <a
                      href={`http://localhost:3000/${profile.portfolio}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-slate-400 underline"
                    >
                      View Portfolio
                    </a>
                  </div>
                )}
              </div>

              <h2 className="text-xl font-semibold mt-8 mb-4">Application Status</h2>
              <div className="flex items-center space-x-3">
                <User className="text-gray-400" size={20} />
                <span className="capitalize text-gray-600">
                  {profile.applicationStatus || "Status not available"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BaristaProfile;