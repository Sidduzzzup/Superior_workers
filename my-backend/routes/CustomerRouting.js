import express from 'express';
import { createcustomer,
   getcustomer,
    updatecustomer, 
    deletecustomer,
     signup, 
     verifyEmail,
     logout,
      login,
       getUserStats,
     forgotPassword,
     resetPassword,
      updateAddress, 
      getAddress } from '../controllers/CutomerController.js';
     import { verifyToken } from "../middleware/verifyToken.js";
     import { checkAuth } from "../controllers/CutomerController.js"; 
     import { registerEmployee, loginEmployee, logoutEmployee } from "../controllers/employeeController.js";
    
     import {
          getTodos,
          createTodo,
          deleteTodo,
          // toggleTaskCompletion,
        } from '../controllers/ToDoController.js';

import { createOrder, getOrders, getOrderStats } from "../controllers/OrderController.js"; // Import the Order model
import bcrypt from 'bcryptjs';
import CustomerSchema from '../models/CustomerSchema.js';

const router = express.Router();

router.get("/profile", async (req, res) => {
     if (!req.user) {
       return res.status(400).json({ success: false, error: "User not authenticated" });
     }
     const userId = req.user._id;
     const user = await Customer.findById(userId);
     res.json(user);
   });

router.get("/check-auth", verifyToken, checkAuth);
router.get("/getUserStats", getUserStats)
router.post('/add-cus', createcustomer);
router.get('/get-cus', getcustomer);
router.put('/update-cus/:id', updatecustomer); 
router.delete('/delete-cus/:id', deletecustomer); 
router.post('/signup', signup);
router.post("/verify-email", verifyEmail);
router.post("/logout", logout);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/PasswordRecoveryForm/:token", resetPassword);
router.get("/getTodos", verifyToken, getTodos);
router.post("/addTask", verifyToken, createTodo);
router.delete("/deleteTodo/:id", verifyToken, deleteTodo);
router.post("/register-employee", registerEmployee);
router.post("/login-employee", loginEmployee);
router.post("/logout-employee", logoutEmployee);
router.put("/update-address", updateAddress);
router.get("/get-address",verifyToken, getAddress);
router.post("/createOrder", verifyToken, createOrder);
router.get("/getOrders", verifyToken, getOrders);
router.post("/create-admin", async (req, res) => {
  try {
    const { email, password, secretKey } = req.body;
    
    // Verify the secret key to ensure only authorized users can create admin accounts
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    
    // Check if user already exists
    let user = await CustomerSchema.findOne({ email });
    
    if (user) {
      // Update existing user
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.isAdmin = true;
      user.isVerified = true;
      await user.save();
      return res.status(200).json({ 
        success: true, 
        message: "Admin user updated successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        }
      });
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new CustomerSchema({
        name: "Admin User",
        phone: "1234567890",
        email: email,
        password: hashedPassword,
        isAdmin: true,
        isVerified: true
      });
      await newUser.save();
      return res.status(201).json({ 
        success: true, 
        message: "Admin user created successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin
        }
      });
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// router.get("/todos", getTodos); // Get all todos



// router.patch("/tasks/:id", toggleTaskCompletion); // Update task completion status

export default router;
