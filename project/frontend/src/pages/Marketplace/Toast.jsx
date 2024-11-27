// Toast.js
import React from 'react';

const Toast = ({ message, type, onClose }) => {
    return (
        <div className={`fixed top-24 right-5 bg-${type === 'success' ? 'green-600' : 'red-500'} text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50`}>
            <span>{message}</span>
            <button onClick={onClose} className="ml-2 text-white font-bold text-lg">&times;</button>
        </div>
    );
};

export default Toast;