import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const verifyToken = (req, res, next) => {
  // ✅ Extract token from Authorization header
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("❌ No token provided or invalid format.");
    return res.status(401).json({ error: "No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];
 
  console.log("🔍 Token Length Check:", token.length);
  console.log("✅ Extracted Token:", token);

  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing!");
    return res.status(500).json({ error: "Server error: Missing secret key" });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token Payload:", decoded);


    console.log("🔎 JWT Secret:", process.env.JWT_SECRET);
    console.log("🔎 Decoded Token:", decoded);


    // ✅ Attach decoded data to request
    req.user = {
      userId: decoded.userId,
      isAdmin: decoded.isAdmin || false,
    };
    
    console.log("✅ User ID from Token:", req.user.userId);
    next();
  } catch (error) {
    console.error("🔴 JWT Error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired. Please log in again." });
    } else {
      return res.status(401).json({ error: "Invalid token. Please log in again." });
    }
  }
};
