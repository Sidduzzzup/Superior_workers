

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import customerRoute from "./routes/CustomerRouting.js";

dotenv.config();

const app = express();

// Environment Variables
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing. Set it in your environment variables.");
}

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing. Set it in your environment variables.");
}

// Connect to MongoDB (Ensure you use MongoDB Atlas, not localhost)
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((error) => console.error("❌ Error connecting to MongoDB:", error));

// Middleware
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/customers", customerRoute);

// Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server started running on port ${PORT}`);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

