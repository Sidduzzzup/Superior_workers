import Order from "../models/orderSchema.js"; // Import the Order model


// Create an Order
export const createOrder = async (req, res) => {
  const { name, phone, service, address, timeAvailability } = req.body;
  const userId = req.user.userId; // Use userId from token payload

  if (!userId || !service || !address) {
    return res.status(400).json({ success: false, error: "Required fields are missing" });
  }

  try {
    // Automatically assign all orders to Rahul Sharma
    const defaultWorkerId = "67c48d36ee733bbb31f06773";

    const newOrder = new Order({
      userId, // Authenticated userId
      workerId: defaultWorkerId, // Predefined worker
      name,
      phone,
      service,
      address,
      timeAvailability,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, order: savedOrder });
    console.log("✅ Order Created:", savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Internal Server Error: " + error.message });
  }
};
// Get All Orders
// Get Orders for a specific worker
// Get Orders for Rahul Sharma


export const getOrders = async (req, res) => {
  const token = req.headers.authorization; // Get token from request headers
  console.log("JWT Token:", token);
  const defaultWorkerId = "67c48d36ee733bbb31f06773"; // Rahul Sharma's ID
  if (!token) {
    return res.status(401).json({ success: false, error: "Token not found. Please log in." });
  }

  try {
    const orders = await Order.find({ workerId: defaultWorkerId });

    if (orders.length === 0) {
      return res.status(200).json({ success: true, message: "No orders found for this worker", orders: [] });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, error: "Internal Server Error: " + error.message });
  }
};

// Get Orders for a specific user
