const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const jwtKey = "ritiksg143";

const getToken = async (req) => {
  const token = jwt.sign(
    {
      id: req.id,
      email: req.email,
    },
    jwtKey,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

const authentication = (req, res, next) => {
  const authHeader = req.headers["authentication"];

  if (!authHeader) {
    return res.status(401).json({ meggage: "Authentication header mission" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { getToken, authentication };
