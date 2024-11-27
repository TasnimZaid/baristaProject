import React from 'react';
import { FaCoffee, FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa'; // Using react-icons for social media icons

const Footer = () => {
    return (
        <footer className="bg-black text-white py-6">
            <div className="container mx-auto px-4 flex flex-col items-center">
                {/* Logo or Title */}
                <div className="text-xl font-bold text-yellow-500 flex items-center space-x-2 mb-4">
                    <FaCoffee className="text-2xl" />
                    <span>CoffeeHub</span>
                </div>
                <h2 className='text-yellow-400 hover:text-red-600'>Happy Coding by Mohammad Abdallah&Husban</h2>

                {/* Navigation Links */}
                <ul className="flex space-x-6 mb-4 text-black">
                    <li>
                        <a href="/about" className=" hover:text-yellow-400">About Us</a>
                    </li>
                    <li>
                        <a href="/contact" className="hover:text-yellow-400">Contact Us</a>
                    </li>
                    <li>
                        <a href="/privacy" className="hover:text-yellow-400">Privacy Policy</a>
                    </li>
                </ul>

                {/* Social Media Links */}
                <div className="flex space-x-4">
                    <a href="https://www.facebook.com" className="text-gray-400 hover:text-yellow-400" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF className="h-5 w-5" />
                    </a>
                    <a href="https://www.twitter.com" className="text-gray-400 hover:text-yellow-400" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="h-5 w-5" />
                    </a>
                    <a href="https://www.instagram.com" className="text-gray-400 hover:text-yellow-400" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="h-5 w-5" />
                    </a>
                </div>

                {/* Copyright */}
                <p className="mt-4 text-sm text-gray-400">© 2024 CoffeeHub. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;