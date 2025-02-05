
import { sendinblueTransport, sender } from "./sendinblue.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailsTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Verify your email address",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationToken}", verificationToken),
  };

  try {
    const response = await sendinblueTransport.sendMail(mailOptions);
    console.log("Verification email sent successfully:", response);
  } catch (error) {
    console.error("Error sending verification email:", error.message);
  }
};

// Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to our app",
    html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
  };

  try {
    const response = await sendinblueTransport.sendMail(mailOptions);
    console.log("Welcome email sent successfully:", response);
  } catch (error) {
    console.error("Error sending welcome email:", error.message);
  }
};

// Password Reset Request Email
export const sendPasswordResetEmail = async (email, resetURL) => {
  const mailOptions = {
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Reset your password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
  };

  try {
    const response = await sendinblueTransport.sendMail(mailOptions);
    console.log("Password reset email sent successfully:", response);
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
  }
};

// Password Reset Success Email
export const sendResetSuccessEmail = async (email) => {
  const mailOptions = {
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Password Reset Successful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
  };

  try {
    const response = await sendinblueTransport.sendMail(mailOptions);
    console.log("Password reset success email sent successfully:", response);
  } catch (error) {
    console.error("Error sending password reset success email:", error.message);
  }
};
