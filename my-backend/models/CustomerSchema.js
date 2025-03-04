

// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const customerSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: Number,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true, // Improves search performance
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     lastLogin: {
//       type: Date,
//       default: Date.now,
//     },
//     verificationToken: {
//       type: String,
//     },
//     verificationExpiresAt: {
//       type: Date,
//     },
//     resetPasswordToken: {
//       type: String,
//     },
//     resetPasswordExpiresAt: {
//       type: Date,
//     },
//   },
//   { timestamps: true }
// );


// const Customer = mongoose.model("Customer", customerSchema);
// export default Customer;






import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String, // Changed from Number to String to handle leading zeros
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true, // Improves search performance
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    verificationToken: {
      type: String,
    },
    verificationExpiresAt: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpiresAt: {
      type: Date,
    },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      postalCode: { type: String, default: "" },
      country: { type: String, default: "" },
    },
  },
  { timestamps: true }
);


const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
