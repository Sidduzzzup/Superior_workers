

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

    return token; // Ensure token is returned correctlyev
};

export default generateTokensAndCookies;