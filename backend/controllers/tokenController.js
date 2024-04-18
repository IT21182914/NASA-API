const jwt = require("jsonwebtoken");
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

exports.verifyAccessToken = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken)
    return res.status(401).json({ message: "Access token not provided" });

  jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Access token expired or invalid" });
    req.userId = decoded.userId;
    next();
  });
};

exports.verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token not provided" });

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Refresh token expired or invalid" });
    req.userId = decoded.userId;
    next();
  });
};

exports.generateAccessToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};
