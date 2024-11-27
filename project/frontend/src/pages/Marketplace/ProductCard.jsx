import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-lg font-bold mb-2 text-black">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
        </div>
    );
};

export default ProductCard;