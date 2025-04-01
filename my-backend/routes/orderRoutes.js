// // orderRoutes.js
// import express from "express";
// import Order from "../models/Order.js";
// import { verifyToken } from "../middleware/verifyToken.js";
// import { checkAuth } from "../controllers/CutomerController.js"; // Adjust the import path as needed

// const router = express.Router();

// // Create Order API
// router.post("/", verifyToken, async (req, res) => {
//   //const { userId, workerId, name, service, address } = req.body;
//   const { workerId, name, phone, service, address, timeAvailability } = req.body; // Extracting phone and timeAvailability from request body
//   const userId = req.user._id; // Get userId from the token payload
//   if (!userId || !workerId || !service || !address) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const newOrder = new Order({
//       userId:  req.user._id, // Use authenticated userId from token
//       workerId,
//       name,
//       phone,
//       service,
//       address,
//       timeAvailability,
//     });

//     const savedOrder = await newOrder.save();
//     //res.status(201).json(newOrder);
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });

// // Get Orders for Employee Dashboard
// // orderRoutes.js
// router.get("/", async (req, res) => {
//   try {
//     const workerId = req.query.workerId; // Get from query param
//     const orders = await Order.find({ workerId });
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// export default router;
