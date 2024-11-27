import React from 'react';
import Lottie from 'react-lottie';
import animationData from './animation/coffee-animation.json'; // Replace with your Lottie JSON file path

const ProgressBar = ({ step }) => {
    const totalSteps = 4;
    const progressPercentage = (step / totalSteps) * 100;

    // Adjust animation speed based on step
    const animationSpeed = 1 + (step * 0.5); // Adjust the multiplier for faster/slower speed scaling

    // Lottie animation configuration
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="relative flex items-center justify-between mb-10 mt-20">
            {/* Progress bar background */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full"></div>

            {/* Animated progress bar */}
            <div
                className="absolute top-1/2 left-0 h-1 bg-black rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
            ></div>

            {['Cart', 'Delivery', 'Payment', 'Confirmation'].map((label, index) => (
                <div key={index} className="relative flex-1 text-center">
                    {/* Circle indicator for each step */}
                    <div
                        className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full transition-colors duration-500 ${index < step ? 'bg-black' : 'bg-gray-400'
                            }`}>
                        <span className="text-white font-bold">{index + 1}</span>
                    </div>

                    {/* Step labels */}
                    <span className={`block text-sm mt-2 ${index < step ? 'text-black' : 'text-gray-500'}`}>
                        {label}
                    </span>
                </div>
            ))}

            {/* Lottie coffee icon animation */}
            <div
                className="absolute top-0  transform -translate-y-1/2 transition-all duration-700 ease-out"
                style={{ left: `calc(${progressPercentage}% - 75px)` }}
            >
                <Lottie
                    options={{ ...defaultOptions, animationSpeed }}
                    height={200}
                    width={100}
                    // height={150}
                    // width={120}
                />
            </div>
        </div>
    );
};

export default ProgressBar;