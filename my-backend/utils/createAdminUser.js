import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import CustomerSchema from '../models/CustomerSchema.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI must be defined in .env file");
  process.exit(1);
}

const createAdminUser = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin user already exists
    const existingAdmin = await CustomerSchema.findOne({ email: "rahul@example.com" });
    
    if (existingAdmin) {
      // Update existing admin user
      const hashedPassword = await bcrypt.hash("admin123", 10);
      existingAdmin.password = hashedPassword;
      existingAdmin.isAdmin = true;
      existingAdmin.isVerified = true;
      await existingAdmin.save();
      console.log("Admin user updated successfully");
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const adminUser = new CustomerSchema({
        name: "Rahul Admin",
        phone: "1234567890",
        email: "rahul@example.com",
        password: hashedPassword,
        isAdmin: true,
        isVerified: true
      });
      await adminUser.save();
      console.log("Admin user created successfully");
    }

    console.log("Admin credentials:");
    console.log("Email: rahul@example.com");
    console.log("Password: admin123");
    
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

createAdminUser(); 