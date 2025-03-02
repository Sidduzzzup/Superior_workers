import Employee from "../models/EmployeeSchema.js";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';




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



export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(400).json({ message: "Invalid credentials" });

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: employee._id }, "secretKey", { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


