import { sendinblueTransport, sender } from "../mailtrap/sendinblue.js";

export const sendVerificationEmail = async (email, token) => {
  const recipients = email; // No need for an array, just use the email directly
  const subject = "Email Verification";
  const text = `Your verification token is: ${token}`;
  const html = `
    <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Email Verification</h1>
    </div>
    <div>
      <img src="../../public/photo_2025-01-11_10-45-08.jpg" alt="email picture" style="width: 50%; height: auto; display: block; margin: 0 auto;">
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
     <h3>Its Your Centential Verrification</h3>
      <p>Hey There!, This is Siddharth Kone, CEO Of SENTENTIAL</p>
      <p>Your verification token is: <strong>${token}</strong></p>
      <p>This token will expire in 24 hours.</p>
      <p>But don't worry you can always verify your email at any time.</p>
      <p>Best regards,<br>Your sentential Team, Have a Nice Day 😊</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  `;

  try {
    const info = await sendinblueTransport.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: recipients,
      subject,
      text,
      html,
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
