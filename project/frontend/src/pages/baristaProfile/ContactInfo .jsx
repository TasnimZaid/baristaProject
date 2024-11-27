import React from 'react';
import { Mail, Phone, Edit } from 'lucide-react';

const ContactInfo = ({ therapist = {}, editing, handleEdit, handleSave, setTherapist }) => {
  // استخدم القيم الافتراضية لتجنب الرسائل إذا لم يتم توفيرها
  const email = therapist.email || 'No email provided';
  const phone = therapist.phone || 'No phone number provided';

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Mail size={18} />
          {editing.email ? (
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setTherapist({ ...therapist, email: e.target.value })}
              className="border rounded px-2 py-1"
            />
          ) : (
            <span>{email}</span>
          )}
        </div>
        {editing.email ? (
          <button onClick={() => handleSave('email')} className="text-blue-500">Save</button>
        ) : (
          <button onClick={() => handleEdit('email')} className="text-gray-500">
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
              value={phone} 
              onChange={(e) => setTherapist({ ...therapist, phone: e.target.value })}
              className="border rounded px-2 py-1"
            />
          ) : (
            <span>{phone}</span>
          )}
        </div>
        {editing.phone ? (
          <button onClick={() => handleSave('phone')} className="text-blue-500">Save</button>
        ) : (
          <button onClick={() => handleEdit('phone')} className="text-gray-500">
            <Edit size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
