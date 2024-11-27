import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import contactImage from "../../assets/images/loginBarista.jpg";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contact",
        formData
      );
      setSuccessMessage("Your message has been sent successfully!");
      setErrorMessage("");
      setFormData({
        username: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setErrorMessage("Failed to send your message. Please try again later.");
      setSuccessMessage("");
    }
  };

  

  
  
           return (
             <>
               <Navbar />
               <div className="bg-black min-h-screen text-white font-sans">
                 <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-8">
                       <h2 className="text-3xl font-bold">Contact Barista</h2>
                       <p className="text-gray-400">
                         Get in touch with us. We're always looking for new
                         collaborations and exciting projects.
                       </p>
                       <form
                         onSubmit={handleSubmit}
                         className="space-y-6 bg-[#D7CCC8] p-8 rounded-lg shadow-lg"
                       >
                         <div>
                           <label
                             htmlFor="username"
                             className="block text-sm font-medium text-[#3E2723]"
                           >
                             Username
                           </label>
                           <input
                             type="text"
                             id="username"
                             name="username"
                             value={formData.username}
                             onChange={handleChange}
                             required
                             className="mt-1 block w-full bg-[#EFEBE9] text-[#3E2723] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8D6E63] focus:border-[#8D6E63]"
                             placeholder="Enter username"
                           />
                         </div>
                         <div>
                           <label
                             htmlFor="email"
                             className="block text-sm font-medium text-[#3E2723]"
                           >
                             Email
                           </label>
                           <input
                             type="email"
                             id="email"
                             name="email"
                             value={formData.email}
                             onChange={handleChange}
                             required
                             className="mt-1 block w-full bg-[#EFEBE9] text-[#3E2723] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8D6E63] focus:border-[#8D6E63]"
                             placeholder="Enter email"
                           />
                         </div>
                         <div>
                           <label
                             htmlFor="message"
                             className="block text-sm font-medium text-[#3E2723]"
                           >
                             Message
                           </label>
                           <textarea
                             id="message"
                             name="message"
                             rows="4"
                             value={formData.message}
                             onChange={handleChange}
                             required
                             className="mt-1 block w-full bg-[#EFEBE9] text-[#3E2723] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#8D6E63] focus:border-[#8D6E63]"
                             placeholder="Enter your message"
                           ></textarea>
                         </div>
                         <div className="flex justify-center">
                           <button
                             type="submit"
                             className="w-auto min-w-[250px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#795548] hover:bg-[#6D4C41] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#795548]"
                           >
                             Send Message
                           </button>
                         </div>
                       </form>
                     </div>
                     <div className="relative">
                       <img
                         src={contactImage}
                         alt="Contact Barista"
                         className="w-full h-full object-cover rounded-lg"
                       />
                       <div className="absolute inset-0  from-[#3E2723] to-transparent opacity-50 rounded-lg"></div>
                     </div>
                   </div>
                 </div>
                 <Footer />
               </div>
             </>
           );


          
};

export default ContactUsPage;
