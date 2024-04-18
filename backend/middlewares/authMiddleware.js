const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
