// Test email configuration
// Run this file to test if your email settings are working
// Usage: node test-email.js

require("dotenv").config();
const nodemailer = require("nodemailer");

const testEmail = async () => {
  console.log("Testing email configuration...\n");
  
  console.log("Email Settings:");
  console.log("- Host:", process.env.EMAIL_HOST);
  console.log("- Port:", process.env.EMAIL_PORT);
  console.log("- User:", process.env.EMAIL_USER);
  console.log("- From:", process.env.EMAIL_FROM);
  console.log("");

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    // Verify connection
    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection successful!\n");

    // Send test email
    console.log("Sending test email...");
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: "TicketWise - Email Configuration Test",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Email Configuration Test</h2>
          <p>Congratulations! Your email configuration is working correctly.</p>
          <p>You can now use the forgot password feature in TicketWise.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            TicketWise - Your Event Ticketing Platform
          </p>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("\nCheck your inbox at:", process.env.EMAIL_USER);
  } catch (error) {
    console.error("❌ Email test failed:");
    console.error(error.message);
    console.error("\nPlease check your email configuration in .env file");
    console.error("Make sure you have:");
    console.error("1. Correct SMTP host and port");
    console.error("2. Valid email credentials");
    console.error("3. App password (if using Gmail)");
    console.error("4. Network connection to SMTP server");
  }
};

testEmail();
