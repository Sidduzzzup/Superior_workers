

// import jwt from 'jsonwebtoken';

// export const verifyToken = (req, res, next) => {
//   // Extract the token from the Authorization header
//   const token = req.header("Authorization")?.replace("Bearer ", "");  // Extract "Bearer" part

//   if (!token) return res.status(401).json({ error: "No token provided" });

//   try {
//     // Verify the token using JWT secret
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach user information (userId and isAdmin) to the request object
//     req.userId = decoded.userId;  // Make sure it's 'userId' as per token payload
//     req.isAdmin = decoded.isAdmin; // You can also attach isAdmin if needed

//     next();  // Proceed to the next middleware/route handler
//   } catch (error) {
//     res.status(401).json({ error: "Invalid or expired token" });
//   }
// };


import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    // Verify the token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user and employee information to the request object
    req.userId = decoded.userId;  // If it's a user
    req.isAdmin = decoded.isAdmin; // Keep isAdmin flag
    req.employeeId = decoded.employeeId; // If it's an employee

    next();  // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
