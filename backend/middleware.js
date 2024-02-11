const { JWKS, JWT } = require("jose");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = JWT.verify(token, JWKS.generateKey("RSA"));
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      Error: error,
    });
  }
};

module.exports = {
  authMiddleware,
};
