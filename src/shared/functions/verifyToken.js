import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token =  req.headers["authorization"]; // Expecting "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const parts = token.split(" ");


  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(400).json({ message: "Invalid token format" });
  }

  const jwtToken = parts[1];

  jwt.verify(jwtToken, process.env.JWT_SECRET || "mysecretkey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.userId = decoded.id;
    next();
  });
};


export default verifyToken