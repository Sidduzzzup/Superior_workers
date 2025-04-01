import Employee from "../models/EmployeeSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Employee Registration
export const registerEmployee = async (req, res) => {
  try {
    const { name, email, password, phone, skills } = req.body;

    let employee = await Employee.findOne({ email });
    if (employee) return res.status(400).json({ message: "Email already exists" });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    employee = new Employee({ name, email, password: hashedPassword, phone, skills });
    await employee.save();

    res.status(201).json({ message: "Employee registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Employee Login
export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate Token
    const secretKey = process.env.JWT_SECRET; // Ensure this is the same in both routes
    const token = jwt.sign({ id: employee._id }, secretKey, { expiresIn: "7h" });

    res.json({ message: "Login successful", token }); // Send token back
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Employee Logout
export const logoutEmployee = async (req, res) => {
  try {
    res.clearCookie('token'); // Clears the authentication cookie
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error logging out", error: error.message });
  }
};

// Token Verification Middleware (for protected routes)
export const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("❌ No token provided or invalid format.");
    return res.status(401).json({ error: "No token provided or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET is missing!");
    return res.status(500).json({ error: "Server error: Missing secret key" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifying token on the server
    req.user = { userId: decoded.id }; // Attach decoded data to request object
    next();
  } catch (error) {
    console.error("🔴 JWT Error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired. Please log in again." });
    } else {
      return res.status(401).json({ error: "Invalid token. Please log in again." });
    }
  }
};
