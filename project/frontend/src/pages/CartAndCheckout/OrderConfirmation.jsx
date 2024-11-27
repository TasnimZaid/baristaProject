import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import Lottie from 'react-lottie';
import animationData from './animation/confirmation-coffee-animation.json'; // Adjust the path as needed

const OrderConfirmation = ({ deliveryInfo }) => {
    const { items, cartTotal } = useCart();

    // Lottie animation options
    const defaultOptions = {
        loop: true, // Change to false if you don't want the animation to loop
        autoplay: true, // Change to false if you want to control animation manually
        animationData: animationData, // Use the imported animation data
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Order Confirmation</h2>
            <div className="w-64 h-64 mx-auto">
                <Lottie options={defaultOptions} height={200} width={200} />
            </div>
            <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-semibold mb-2">Order Details</h3>
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-2">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="flex justify-between items-center font-bold mt-4">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Delivery Information</h3>
                <p>{deliveryInfo.fullName}</p>
                <p>{deliveryInfo.address}</p>
                <p>{deliveryInfo.city}, {deliveryInfo.country} {deliveryInfo.postalCode}</p>
                <p>Phone: {deliveryInfo.phone}</p>
            </div>
            <div className="text-center">
                <p className="text-green-600 font-semibold mb-4">Your order has been placed successfully!</p>
            </div>
            <div className="flex items-center justify-center">
                <Link to="/">
                    <button className="bg-black text-white py-3 px-6 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:bg-gray-800 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        Back to Home Page
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
