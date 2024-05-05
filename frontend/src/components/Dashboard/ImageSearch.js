import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation"; // Importing TypeAnimation component

const ImageSearch = () => {
  const [query, setQuery] = useState("Astro Camp");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://images-api.nasa.gov/search?q=${query}&media_type=image`
      );
      setSearchResults(response.data.collection.items);
    } catch (error) {
      console.error("Error searching images: ", error);
    }
  };

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    try {
      const response = await axios.get(
        `https://images-api.nasa.gov/search?q=${inputValue}&media_type=image`
      );
      const suggestedItems = response.data.collection.items.map(
        (item) => item.data[0].title
      );
      setSuggestions(suggestedItems);
    } catch (error) {
      console.error("Error fetching suggestions: ", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `https://images-api.nasa.gov/search?q=${query}&media_type=image`
        );
        setSearchResults(response.data.collection.items);
      } catch (error) {
        console.error("Error searching images: ", error);
      }
    };

    handleSearch();
  }, [query]);

  return (
    <div className="bg-gradient-to-br from-black to-blue-900 min-h-screen text-white font-mono font-sans">
      <div className="flex flex-col items-center justify-center py-8">
        <h2 className="text-3xl font-bold mb-4 text-center">
          <TypeAnimation
            wrapper="span"
            sequence={["Search NASA Images", 2000]}
            repeat="infinity"
            speed={20}
          />
        </h2>

        <div className="relative w-full max-w-md px-4">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            className="w-full rounded-full py-3 px-4 text-lg outline-none shadow-md focus:shadow-lg transition-all duration-300 bg-white text-gray-800"
            placeholder="Search images..."
          />
          <button
            onClick={handleSearch}
            className="absolute top-1 right-4 mt-3 mr-4 px-3 py-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Search
          </button>
        </div>
        <div className="mt-4 max-w-md w-full">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer hover:bg-gray-200 rounded-lg px-4 py-2 my-1 text-gray-800"
            >
              {suggestion}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 max-w-5xl w-full px-4">
          {searchResults.map((item) => (
            <motion.div
              key={item.data[0].nasa_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={item.links[0].href}
                alt={item.data[0].title}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.data[0].title}</h3>
                <p className="text-sm">{item.data[0].description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSearch;
