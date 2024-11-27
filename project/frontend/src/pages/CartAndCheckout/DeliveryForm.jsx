import React, { useState } from 'react';

const DeliveryForm = ({ nextStep, prevStep, setDeliveryInfo }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDeliveryInfo(formData);
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
            <h3 className="text-2xl font-bold mb-4">Delivery Information</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-6">
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-700 transition duration-300"
                >
                    Continue →
                </button>
            </div>
        </form>
    );
};

export default DeliveryForm;