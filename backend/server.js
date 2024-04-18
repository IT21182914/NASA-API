const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors middleware
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(express.json());
app.use(cors()); //allow web applications running on one domain to request resources from another domain

// Routes
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB successfully connected 🍃"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`\nServer is running on port ${PORT} 🔥`));
