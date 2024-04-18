import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const MarsRoverPhotos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=plf0h0HaDHeLPXYDUWco7kyYNXEkYaYRcAgDvIj8"
        );
        // Filter out duplicate photos based on their IDs
        const uniquePhotos = response.data.photos.reduce((acc, curr) => {
          if (!acc.find((photo) => photo.id === curr.id)) {
            acc.push(curr);
          }
          return acc;
        }, []);
        // Limit the number of photos to 50
        const limitedPhotos = uniquePhotos.slice(0, 50);
        setPhotos(limitedPhotos);
      } catch (error) {
        console.error("Error fetching Mars rover photos: ", error);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-900">
        Mars Rover Photos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            className="bg-gray-100 p-4 rounded shadow-md"
            whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
          >
            <img
              src={photo.img_src}
              alt={photo.camera.full_name}
              className="w-full h-auto rounded"
            />
            <div className="mt-4">
              <p className="text-lg font-semibold text-blue-900">
                {photo.camera.full_name}
              </p>
              <p className="text-sm text-gray-700">
                <strong className="text-blue-400">Earth Date:</strong>{" "}
                {photo.earth_date}
              </p>
              <p className="text-sm text-gray-700">
                <strong className="text-blue-400">Rover:</strong>{" "}
                {photo.rover.name}
              </p>
              <p className="text-sm text-gray-700">
                <strong className="text-blue-400">Launch Date:</strong>{" "}
                {photo.rover.launch_date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MarsRoverPhotos;
