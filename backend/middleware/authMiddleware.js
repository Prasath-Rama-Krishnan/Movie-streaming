const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
  if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Session expired. Please login again.",
    });
  }
  return res.status(401).json({ message: "Invalid token" });
}

};
