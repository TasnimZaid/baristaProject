
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"; // تأكد من استيراد SearchBar
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Collection() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch the products from the backend
    axios
      .get("http://localhost:3000/api/Allproducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
   <Navbar />
    <div className="">
      {/* خلفية الصفحة */}
      <div
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(https://www.1883.com/app/uploads/2024/03/header-recette-mixo-framboise-1.jpg)`,
        }}
      >
        <div className="absolute inset-0"></div>
        <div className="flex flex-col md:flex-row items-center justify-between w-full ml-5 px-4">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light mb-4">
              Discover our collection of creation materials.
            </h1>
            <div className="text-white text-xl font-light">
              <p className="mb-2">For mojito and more drinks.</p>
              <p className="mb-2">
                + 120 flavours to make your creations amazing.
              </p>
              <p className="mb-4">
                Classic, less sugar and sugar-free and organic varieties
                available.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 md:px-4">
        {/* محاذاة شريط البحث إلى اليسار باستخدام flex و justify-start */}
        <div className="flex justify-start mb-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Syrup</h2>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center font-cormorant text-xl">
            No products available
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2 md:px-4 lg:px-10">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="shadow-md overflow-hidden text-center font-light "
              >
                <div className="relative group">
                  <Link to={`/product/${product._id}`}>
                    <div className="relative group">
                      <img
                        src={product.bg}
                        alt={product.name}
                        className="mx-auto h-48 object-cover p-3 transition duration-300 ease-in-out transform group-hover:scale-105"
                      />
                      <img
                        src={product.photos}
                        alt={product.name}
                        className="absolute top-0 left-0 right-0 mx-auto h-48 object-cover p-3 transition duration-300 ease-in-out transform group-hover:scale-105 z-10"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-20 w-48 h-40 mx-auto my-auto">
                        <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                          <p className="text-sm font-semibold tracking-wide">
                            DISCOVER NOW
                          </p>
                          <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            <span className="inline-block bg-white p-1 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-red-900"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="p-4">
                  <h2 className="text-sm font-semibold mb-2 font-playfair">
                    {product.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Collection;



  
