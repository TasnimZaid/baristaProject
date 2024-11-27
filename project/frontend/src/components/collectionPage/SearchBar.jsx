import React from 'react';
const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 text-sm font-semibold uppercase">SEARCH</span>
          </div>
          <input
            type="text"
            value={searchTerm} // Bind input to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
            className="w-full pl-20 pr-10 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-gray-500 text-gray-700 placeholder-gray-500"
            placeholder="Sirop, groseille, hibiscus..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    );
  };
  
  export default SearchBar;
  