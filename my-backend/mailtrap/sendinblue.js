
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure the SMTP transport
export const sendinblueTransport = nodemailer.createTransport({
  host: process.env.SMTP_SERVER, // SMTP server
  port: process.env.SMTP_PORT, // SMTP port
  secure: false, // TLS enabled (false for port 587)
  auth: {
    user: process.env.SENDINBLUE_USER, // SMTP login
    pass: process.env.SENDINBLUE_PASSWORD, // SMTP password
  },
});

// Utility function to send an email
export const sendEmail = async (emailOptions) => {
  try {
    const info = await transporter.sendMail(emailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

// Sender details
export const sender = {
  email: "nova72949@gmail.com", // Your sender email address
  name: "SENTENTIAL", // Your app or company name
};
