import express from 'express';
import { createcustomer, getcustomer, updatecustomer, deletecustomer,
     signup, verifyEmail ,logout, login, getUserStats,
     forgotPassword,resetPassword} from '../controllers/CutomerController.js';
     import { verifyToken } from "../middleware/verifyToken.js";
     import { checkAuth } from "../controllers/CutomerController.js"; 
    
     import {
          getTodos,
          createTodo,
          deleteTodo,
          // toggleTaskCompletion,
        } from '../controllers/ToDoController.js';
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

// router.patch("/tasks/:id", toggleTaskCompletion); // Update task completion status

export default router;
