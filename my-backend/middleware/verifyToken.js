
// import jwt from 'jsonwebtoken';

// export const verifyToken = (req, res, next) => {
//     // Extract the token from the Authorization header
//     const authHeader = req.header("Authorization");
//     const token = authHeader?.replace("Bearer ", "");

//     console.log("Authorization Header:", authHeader); // Debugging
//     console.log("Extracted Token:", token); // Debugging

//     if (!token) {
//         return res.status(401).json({ error: "No token provided" });
//     }

//     try {
//         if (!process.env.JWT_SECRET) {
//             console.error("JWT_SECRET is not defined!"); // Ensure .env is loaded
//             return res.status(500).json({ error: "Server error: Missing secret key" });
//         }

//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Attach user details to request
//         req.userId = decoded.userId || null;
//         req.isAdmin = decoded.isAdmin || false;
//         req.employeeId = decoded.employeeId || null;

//         next(); // Proceed to the next middleware
//     } catch (error) {
//         if (error.name === "TokenExpiredError") {
//             return res.status(401).json({ error: "Token expired" });
//         } else if (error.name === "JsonWebTokenError") {
//             return res.status(401).json({ error: "Invalid token" });
//         } else {
//             return res.status(401).json({ error: "Authentication failed" });
//         }
//     }
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

    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is missing!");
        return res.status(500).json({ error: "Server error: Missing secret key" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Payload:", decoded); // Debugging

        // Attach the decoded payload to the request object
        req.user = {
            userId: decoded.userId, // Ensure this matches the token payload
            isAdmin: decoded.isAdmin || false,
            employeeId: decoded.employeeId || null,
        };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("JWT Error:", error.message); // Logs the exact error

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token" });
        } else {
            return res.status(401).json({ error: "Authentication failed" });
        }
    }
};