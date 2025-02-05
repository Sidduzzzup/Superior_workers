
import Todo from "../models/TasksSchema.js";


export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    
    // Check if req.userId is populated from the token
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        error: "Authentication failed. User not found. Please log in again."
      });
    }

    const userId = req.userId; // Populated via auth middleware

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const todo = await Todo.create({ title, userId });
    res.status(201).json({ success: true, todo });
  } catch (error) {
    console.error("Error in createTodo: ", error);
    res.status(500).json({ success: false, error: `Server error: ${error.message}` });
  }
};



export const getTodos = async (req, res) => { 
  const token = req.headers.authorization; // Get token from request headers

  // Log the token to the console to verify it
  console.log("JWT Token:", token);

  if (!token) {
    return res.status(401).json({ success: false, error: "Token not found. Please log in." });
  }
  try {
    const userId = req.userId; // ✅ Correct way to get userId
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized - Invalid token" });
    }

    const todos = await Todo.find({ userId });

    if (todos.length === 0) {
      return res.status(200).json({ success: true, message: "No todos found for this user", todos: [] });
    }
    console.log("User ID from token:", req.userId);
    console.log("Todos found:", todos);
    
    res.status(200).json({ success: true, todos });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error: " + error.message });
  }
};



// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    // Access userId from req.userId (set by the verifyToken middleware)
    const userId = req.userId; // Changed from req.user._id to req.userId

    const todo = await Todo.findOneAndDelete({ _id: id, userId });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found or you're not authorized" });
    }

    res.status(200).json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


