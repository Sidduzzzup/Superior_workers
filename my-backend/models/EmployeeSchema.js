import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // No hashing here
  phone: { type: String, required: true },
  skills: [{ type: String }], // Example: ["Plumbing", "Cleaning"]
  availability: { type: Boolean, default: true },
}, { timestamps: true });

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee;
