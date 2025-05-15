import Order from "../models/orderSchema.js"; // Import the Order model


// Create an Order
export const createOrder = async (req, res) => {
  const { name, phone, service, address, timeAvailability } = req.body;
  const userId = req.user.userId; 

  if (!userId || !service || !address) {
    return res.status(400).json({ success: false, error: "Required fields are missing" });
  }

  try {
    
    const defaultWorkerId = "67c48d36ee733bbb31f06773";

    const newOrder = new Order({
      userId, 
      workerId: defaultWorkerId, 
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



export const getOrders = async (req, res) => {
  const token = req.headers.authorization; 
  console.log("JWT Token:", token);
  const defaultWorkerId = "67c48d36ee733bbb31f06773"; 
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
export const getOrderStats = async (req, res) => {
  try {
    // Get total number of orders
    const orderCount = await Order.countDocuments();

    // Optionally, get some order details if needed (like recent orders)
    const recentOrders = await Order.find({}, "name service status").limit(10); // Optional

    res.status(200).json({ success: true, orderCount, orders: recentOrders });
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};