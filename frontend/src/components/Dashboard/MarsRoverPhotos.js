import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation"; // Importing TypeAnimation component

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
    <div
      className="bg-center font-serif"
      style={{
        backgroundImage:
          'url("https://cdn.pixabay.com/photo/2012/11/28/10/37/launch-pad-67650_1280.jpg")',
      }}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-semibold mb-4 text-center text-white font-mono">
          <TypeAnimation
            wrapper="span"
            sequence={["Mars Rover Photos", 2000]}
            repeat="infinity"
            speed={20}
          />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              className="border-4 border-blue-900 p-4 rounded shadow-md"
              whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
            >
              <img
                src={photo.img_src}
                alt={photo.camera.full_name}
                className="w-full h-auto rounded"
              />
              <div className="mt-4">
                <p className="text-lg font-semibold text-white">
                  <TypeAnimation
                    wrapper="span"
                    sequence={[photo.camera.full_name, 2000]}
                    repeat="infinity"
                    speed={10}
                  />
                </p>
                <p className="text-sm text-white">
                  <strong>
                    <TypeAnimation
                      wrapper="span"
                      sequence={["Earth Date:", 2000]}
                      repeat="infinity"
                      speed={10}
                    />
                  </strong>{" "}
                  <TypeAnimation
                    wrapper="span"
                    sequence={[photo.earth_date, 2000]}
                    repeat="infinity"
                    speed={10}
                  />
                </p>
                <p className="text-sm text-white">
                  <strong>
                    <TypeAnimation
                      wrapper="span"
                      sequence={["Rover:", 2000]}
                      repeat="infinity"
                      speed={10}
                    />
                  </strong>{" "}
                  <TypeAnimation
                    wrapper="span"
                    sequence={[photo.rover.name, 2000]}
                    repeat="infinity"
                    speed={10}
                  />
                </p>
                <p className="text-sm text-white">
                  <strong>
                    <TypeAnimation
                      wrapper="span"
                      sequence={["Launch Date:", 2000]}
                      repeat="infinity"
                      speed={10}
                    />
                  </strong>{" "}
                  <TypeAnimation
                    wrapper="span"
                    sequence={[photo.rover.launch_date, 2000]}
                    repeat="infinity"
                    speed={10}
                  />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarsRoverPhotos;
