// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();


// const generateTokensAndCookies = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: '7d',
//   });

//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });
// };

// export default generateTokensAndCookies;


// /// make it upto 24hrs


// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

// const generateTokensAndCookies = (res, userId, isAdmin) => {
//   // Token now expires in 24 hours
//   const token = jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, {
//     expiresIn: '24h', // Set expiration to 24 hours
//   });

//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
//   });
// };

// export default generateTokensAndCookies;

// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();



// const generateTokensAndCookies = (res, userId, isAdmin) => {
//   // Create the token that expires in 24 hours
//   const token = jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, {
//     expiresIn: '24h', // Set expiration to 24 hours
//   });

//   // Set the token in cookies
//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production', // In production, use secure cookies
//     sameSite: 'strict',
//     maxAge: 24 * 60 * 60 * 1000, // Set cookie to expire in 24 hours
//   });

//   return token; // Optional, if you want to return the token for immediate use
// };

// export default generateTokensAndCookies;

import jwt from "jsonwebtoken";

export const generateTokensAndCookies = (res, userId) => {
    if (!process.env.JWT_SECRET) {
        console.error("❌ Missing JWT_SECRET in environment variables");
        throw new Error("Missing JWT_SECRET");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    console.log("🔹 Generated JWT Token:", token); // Debugging

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token; // Ensure token is returned correctly
};

export default generateTokensAndCookies;