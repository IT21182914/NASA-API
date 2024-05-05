import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation"; // Importing TypeAnimation component

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
      <h2 className="text-center text-4xl font-semibold mb-4 text-white font-mono">
        <TypeAnimation
          wrapper="span"
          sequence={["Astronomy Picture of the Day!", 2000]}
          repeat="infinity"
          speed={20}
        />
      </h2>

      {apod && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2 text-white font-serif">
            <TypeAnimation
              wrapper="span"
              sequence={[apod.title, 2000]}
              repeat="infinity"
              speed={10}
            />
          </h3>
          <div className="border-4 border-blue-900 rounded-lg overflow-hidden">
            <img
              className="w-full rounded-lg shadow-md mb-4"
              src={apod.url}
              alt={apod.title}
              style={{ maxHeight: "600px", width: "100%" }}
            />
          </div>
          <p className="text-white text-lg leading-relaxed">
            <TypeAnimation
              wrapper="span"
              sequence={[apod.explanation, 2000]}
              repeat="infinity"
              speed={20}
            />
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default APOD;
