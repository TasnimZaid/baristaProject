import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ title, products }) => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <h2 className="text-2xl font-bold mb-4 text-black">{title}</h2>
            <ul className="list-none mb-4">
                {products.map((product, index) => (
                    <li key={index} className="mb-4">
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;