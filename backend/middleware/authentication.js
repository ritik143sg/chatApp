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
      expiresIn: "11h",
    }
  );
  return token;
};

const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authentication header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, jwtKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { getToken, authentication };
