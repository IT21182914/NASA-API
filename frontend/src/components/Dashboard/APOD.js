import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const APOD = () => {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/planetary/apod?api_key=plf0h0HaDHeLPXYDUWco7kyYNXEkYaYRcAgDvIj8"
        );
        setApod(response.data);
      } catch (error) {
        console.error("Error fetching Astronomy Picture of the Day: ", error);
      }
    };
    fetchAPOD();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-center text-3xl font-semibold mb-4 text-blue-900">
        Astronomy Picture of the Day
      </h2>

      {apod && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2">{apod.title}</h3>
          <img
            className="w-full rounded-lg shadow-md mb-4"
            src={apod.url}
            alt={apod.title}
            style={{ maxHeight: "600px", width: "100%" }}
          />
          <p className="text-gray-700 text-lg leading-relaxed">
            {apod.explanation}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default APOD;
