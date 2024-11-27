import { useState } from "react";
import axios from "axios";
import loginUser from "./../../assets/images/loginUser.jpg";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { FaEnvelope, FaLock, FaUser, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
function LoginUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            setErrorMessage("All fields are required.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:3000/api/users/login/user",
                { email, password },
                { withCredentials: true }
            );

            navigate('/');
        } catch (error) {
            setErrorMessage(
                "Error logging in: " + error.response.data.message
            );
        }
    };
// ---------------------------------google
const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/login/google",
        { id_token: response.credential },
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in with Google!",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Google login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text:
          error.response?.data?.message ||
          "There was an error during Google login. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };
    return (
        <motion.div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${loginUser})` }} 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative w-full max-w-md bg-[#F6F2EF]/30 backdrop-blur-sm py-6 px-6 sm:px-16 shadow-lg rounded-xl">
                <form
                    className="flex flex-col"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-6">
                        <h3 className="text-gray-800 text-2xl font-bold text-center">
                            Login as user
                        </h3>
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                placeholder="Enter email"
                            />
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-[#E1BB94] hover:bg-[#C8A67D] focus:outline-none"
                        >
                            Login
                        </button>
                    </div>

                    <p className="text-gray-800 text-sm mt-6 text-center">
                        Don't have an account?{" "}
                        <a
                            href="/registeruser"
                            className="text-blue-600 font-semibold hover:underline ml-1"
                        >
                            Register here
                        </a>
                    </p>
                    <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={(error) => console.error("Google login error:", error)}
                            style={{ width: '100%' }}
                            className="flex items-center justify-center gap-2 bg-[#4285F4] text-white font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            <FaGoogle className="text-xl" />
                            <span>Sign in with Google</span>
                        </GoogleLogin>
                </form>
            </div>
        </motion.div>
    );
}

export default LoginUser;
