import React, { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import axios from 'axios';
import SearchBar from './SearchBar';
import BeveragesFilter from './CoffeeFilter';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import EspMachineLoader from '../../components/leaders/esprMachine';
import Toast from './Toast';
import SyrupFilter from './SyrupsFilter';

const BrowseProducts = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('beverages');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const { addItem } = useCart();
    const [toast, setToast] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const navigate = useNavigate();

    const fetchUrl =
        category === 'beverages'
            ? 'http://localhost:3000/api/allBeverages'
            : 'http://localhost:3000/api/Allproducts';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(fetchUrl);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    useEffect(() => {
        let updatedProducts = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (selectedCategory.length > 0) {
            updatedProducts = updatedProducts.filter((product) =>
                selectedCategory.includes(product.category)
            );
        }
        setFilteredProducts(updatedProducts);
    }, [searchTerm, selectedCategory, products]);

    const handleAddToCart = (product) => {
        if (product._id) {
            addItem({
                id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                photos: product.photos
            });
            setToast({
                message: `${product.name} has been added to your cart!`,
                type: 'success',
            });
            setTimeout(() => setToast(null), 3000);
        } else {
            console.error("Product ID is missing.");
        }
    };

    const viewDetails = (p) => {
        if (p.category === "Syrup") {
            navigate(`/product/${p._id}`);
        }
    };

    // Pagination
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white text-black p-8 font-serif">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-8">
                        {category === 'beverages' ? 'Our Beverages' : 'Delicious Syrups'}
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/4 p-6 bg-gray-100 rounded-lg shadow-lg">
                            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            <h2 className="text-2xl font-semibold mt-6 mb-4">Category</h2>
                            <div className="space-y-3">
                                <button
                                    className={`w-full py-3 px-6 rounded-lg transition ${category === 'beverages'
                                        ? 'bg-gray-300 text-black'
                                        : 'bg-gray-200 text-gray-600'
                                        }`}
                                    onClick={() => setCategory('beverages')}
                                >
                                    Beverages
                                </button>
                                <button
                                    className={`w-full py-3 px-6 rounded-lg transition ${category === 'syrups'
                                        ? 'bg-gray-300 text-black'
                                        : 'bg-gray-200 text-gray-600'
                                        }`}
                                    onClick={() => setCategory('syrups')}
                                >
                                    Syrups
                                </button>
                            </div>
                            <h2 className="text-2xl font-semibold mt-8 mb-4">Filter by category</h2>
                            {category === "beverages" ? <BeveragesFilter onCategoryChange={setSelectedCategory} /> : <SyrupFilter onCategoryChange={setSelectedCategory} ></SyrupFilter>   }
                        </div>

                        <div className="md:w-3/4">
                            <EspMachineLoader isLoading={loading} />
                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                        {currentProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between h-auto"
                                            >
                                                <img
                                                    src={product.photos}
                                                    alt={product.name}
                                                    className="w-full h-96 object-cover mb-4 rounded"
                                                />
                                                <div className="flex flex-col flex-grow">
                                                    <h3 className="text-xl font-semibold mb-2 text-black">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-gray-700 mb-4 flex-grow">{product.description}</p>
                                                    <p className="mb-4">{product.price} JOD</p>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-600 transition"
                                                        onClick={() => handleAddToCart(product)}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                    {product.category === "Syrup" && (
                                                        <button
                                                            className="w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition"
                                                            onClick={() => viewDetails(product)}
                                                        >
                                                            View Details
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center mt-6">
                                        <nav>
                                            <ul className="flex space-x-2">
                                                {Array.from({ length: totalPages }, (_, index) => (
                                                    <li key={index + 1}>
                                                        <button
                                                            className={`px-4 py-2 rounded-md transition ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'}`}
                                                            onClick={() => handlePageChange(index + 1)}
                                                        >
                                                            {index + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {toast && (
                    <Toast message={toast.message} type={toast.type} />
                )}
            </div>
            <Footer />
        </>
    );
};

export default BrowseProducts;