import React from 'react';

const ProgressBar = ({ step }) => (
    <div className="flex items-center justify-between mb-6">
        {['Cart', 'Delivery', 'Payment', 'Confirmation'].map((label, index) => (
            <div key={index} className="w-1/4 text-center">
                <div className={`w-full h-1 ${index < step ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                <span className={`text-sm mt-1 ${index < step ? 'text-red-500' : 'text-gray-500'}`}>{label}</span>
            </div>
        ))}
    </div>
);

export default ProgressBar;