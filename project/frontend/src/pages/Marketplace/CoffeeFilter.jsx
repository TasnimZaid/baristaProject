import React, { useState } from 'react';

const BeveragesFilter = ({ onCategoryChange }) => {
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleCategoryChange = (category) => {
        let updatedCategory = [];
        if (selectedCategory.includes(category)) {
            updatedCategory = selectedCategory.filter((s) => s !== category);
        } else {
            updatedCategory = [...selectedCategory, category];
        }
        setSelectedCategory(updatedCategory);
        onCategoryChange(updatedCategory);
    };

    const category = [
        { label: 'Mojito', value: 'Mojito' },
        { label: 'Iced Tea', value: 'IcedTea' },
        { label: 'Coffee', value: 'Coffee' }
    ];

    return (
        <div className="space-y-4">
            {category.map((category) => (
                <label
                    key={category.value}
                    className="flex items-center space-x-3 cursor-pointer group"
                >
                    <input
                        type="checkbox"
                        value={category.value}
                        checked={selectedCategory.includes(category.value)}
                        onChange={() => handleCategoryChange(category.value)}
                        className="appearance-none h-5 w-5 border border-gray-300 rounded-md bg-white checked:bg-black checked:border-transparent transition duration-300 group-hover:ring group-hover:ring-black"
                    />
                    <span className="text-gray-800 group-hover:text-black transition duration-300">
                        {category.label}
                    </span>
                </label>
            ))}
        </div>
    );
};

export default BeveragesFilter;