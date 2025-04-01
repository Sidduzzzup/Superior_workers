import mongoose from "mongoose";

// Order.js
const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ref to User model
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      default: new mongoose.Types.ObjectId("67c48d36ee733bbb31f06773"), // Default worker
    },
    name: { type: String, required: true },
    phone: { type: String }, // Optional
    service: { type: String, required: true },
    address: { type: String, required: true },
    timeAvailability: { type: String }, // Optional
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" }, // Optional enum for status
    distance: { type: String, default: "2.5 km" },
    estimatedTime: { type: String, default: "15 mins" },
    employeeAccess: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
