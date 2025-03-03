

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


// import jwt from 'jsonwebtoken';

// export const verifyToken = (req, res, next) => {
//   // Extract the token from the Authorization header
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) return res.status(401).json({ error: "No token provided" });

//   try {
//     // Verify the token using JWT secret
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach user and employee information to the request object
//     req.userId = decoded.userId;  // If it's a user
//     req.isAdmin = decoded.isAdmin; // Keep isAdmin flag
//     req.employeeId = decoded.employeeId; // If it's an employee

//     next();  // Proceed to the next middleware/route handler
//   } catch (error) {
//     res.status(401).json({ error: "Invalid or expired token" });
//   }
// };


import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    console.log("Authorization Header:", authHeader); // Debugging
    console.log("Extracted Token:", token); // Debugging

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined!"); // Ensure .env is loaded
            return res.status(500).json({ error: "Server error: Missing secret key" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user details to request
        req.userId = decoded.userId || null;
        req.isAdmin = decoded.isAdmin || false;
        req.employeeId = decoded.employeeId || null;

        next(); // Proceed to the next middleware
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token" });
        } else {
            return res.status(401).json({ error: "Authentication failed" });
        }
    }
};
