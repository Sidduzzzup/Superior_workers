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

import { createOrder, getOrders } from "../controllers/OrderController.js"; // Import the Order model
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
// router.get("/todos", getTodos); // Get all todos



// router.patch("/tasks/:id", toggleTaskCompletion); // Update task completion status

export default router;
