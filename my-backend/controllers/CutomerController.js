import CustomerSchema from '../models/CustomerSchema.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();
import generateTokensAndCookies from '../utils/generateTokensAndCookeis.js'; 
import { sendVerificationEmail} from '../utils/emailUtils.js';
import {
	sendPasswordResetEmail,
	sendResetSuccessEmail,
	
	sendWelcomeEmail,
} from "../mailtrap/emails.js";
import Task from '../models/TasksSchema.js';





export const signup = async (req, res) => {
  const { name, phone, email, password, isAdmin, passKey } = req.body;
  
  try {
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const userAlreadyExists = await CustomerSchema.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: 'User already exists. Please login.' });
    }

    // 🔹 Validate Admin Passkey (Only if user is trying to register as an admin)
    let adminStatus = false;
    if (isAdmin) {
      if (!passKey || passKey !== process.env.ADMIN_PASSKEY) {
        return res.status(400).json({ success: false, message: 'Invalid admin passkey' });
      }
      adminStatus = true;
    }

    // 🔹 Hash Password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔹 Hashed Password Before Saving:", hashedPassword); //// remove it
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    // 🔹 Create User Object
    const user = new CustomerSchema({
      name,
      phone,
      email,
      password: hashedPassword,
      verificationToken,
      verificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Store as Date object
      isAdmin: adminStatus, // Ensure Boolean value
    });

    await user.save();

    // 🔹 Send Verification Email
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      success: true,
      message: 'User created successfully. Please verify your email.',
      user: { ...user._doc, password: undefined, verificationToken: undefined },
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await CustomerSchema.findOne({
      verificationToken: code,
      verificationExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      token, // Include token in response
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Find user by email
    const user = await CustomerSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Generate JWT Token & Set Cookie
    const token = generateTokensAndCookies(res, user._id);

    // ✅ Update last login time
    user.lastLogin = new Date();
    await user.save();

    // ✅ Send response with user info & token
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,  // ✅ Include token in response
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin, // ✅ Ensure isAdmin is always present
        lastLogin: user.lastLogin,
      },
    });

  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




//logout

// export const logout = async (req, res) => {
//   try {
//     res.clearCookie('token');
//     res.status(200).json({ success: true, message: 'Logged out successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error logging out', error: error.message });
//   }
// };


export const logout = async (req, res) => {
  try {
    localStorage.removeItem("token"); // Clear the token from localStorage
    res.clearCookie('token'); // Clear the token cookie (if applicable)
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging out', error: error.message });
  }
};

//forgotPassword

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await CustomerSchema.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 6 * 60 * 60 * 1000; // 6 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/PasswordRecoveryForm/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

//resetPassword

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await CustomerSchema.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

    await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};




export const checkAuth = async (req, res) => {
  try {
      const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract "Bearer" part
      if (!token) return res.status(401).json({ error: "No token provided" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using JWT secret
      const user = await CustomerSchema.findById(decoded.userId).select("-password");
      
      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, user }); // Send back user info
  } catch (error) {
      res.status(401).json({ error: "Invalid or expired token" });
  }
};





// Create a new customer
export const createcustomer = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const customer = new CustomerSchema({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    await customer.save();

    res.status(201).json(customer);
  } catch (error) {
    console.log('There is an error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all customers
export const getcustomer = async (req, res) => {
  try {
    const allcustomers = await CustomerSchema.find(); // Corrected capitalization
    res.status(200).json(allcustomers);
  } catch (error) {
    console.log('customer not found:', error);
    res.status(500).json({ message: 'customer not found' });
  }
};

// Update a customer by ID

export const updatecustomer = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL
    const { name, phone, email, password } = req.body;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined; // Hash password if provided

    const updatedCustomer = await CustomerSchema.findByIdAndUpdate(
      id,
      { name, phone, email, password: hashedPassword },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.log('Error updating customer:', error);
    res.status(500).json({ message: 'Server error while updating customer' });
  }
};


// Delete a customer by ID
export const deletecustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomer = await CustomerSchema.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer deleted successfully', deletedCustomer });
  } catch (error) {
    console.log('Error deleting customer:', error);
    res.status(500).json({ message: 'Server error while deleting customer' });
  }
};


export const getUserStats = async (req, res) => {
  try {
      // Fetch all users with "name" and "email"
      const users = await CustomerSchema.find({}, "name phone lastLogin email");

      // Get total user count
      const userCount = users.length;

      // Send response
      res.status(200).json({ success: true, userCount, users });
  } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const updateAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    const updatedUser = await CustomerSchema.findByIdAndUpdate(
      userId,
      { address },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Address updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


// export const getAddress = async (req, res) => {
//   try {
//     // Debugging: Log the req.user object to verify its structure
//     console.log("Request User:", req.user);

//     // Extract the user ID from the request
//     const userId = req.user.userId; // Access userId directly from req.user

//     if (!userId) {
//       return handleErrorResponse(res, 401, "Unauthorized: User ID not found in token");
//     }

//     // Fetch the customer document from the database using the user ID
//     const customer = await Customer.findById(userId).select("address");

//     // If no customer is found, return a 404 response
//     if (!customer) {
//       return handleErrorResponse(res, 404, "Customer not found");
//     }

//     // Extract the address from the customer document
//     const address = customer.address;

//     // If no address is found, return a 404 response
//     if (!address) {
//       return handleErrorResponse(res, 404, "Address not found for the customer");
//     }

//     // Return the address data in the response
//     handleSuccessResponse(res, 200, "Address fetched successfully", address);
//   } catch (error) {
//     console.error("Error fetching address:", error);
//     handleErrorResponse(res, 500, "Failed to fetch address");
//   }
// };
export const getAddress = async (req, res) => {
  try {
    console.log("Request User:", req.user);  // ✅ Check if user exists

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User ID missing from token" });
    }

    const customer = await CustomerSchema.findById(userId).select("address");

    if (!customer || !customer.address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.status(200).json({ message: "Address fetched successfully", address: customer.address });
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({ error: "Failed to fetch address" });
  }
};