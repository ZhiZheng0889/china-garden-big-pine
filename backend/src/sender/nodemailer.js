require("dotenv").config();
const nodemailer = require("nodemailer");

// create transporter
const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AWS_ACCESS_KEY_ID,
    pass: process.env.AWS_SECRET_ACCESS_KEY,
  },
  authMethod: "LOGIN",
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendEmailToRestaurant(order, cart) {
  const sellerEmail = process.env.TO_EMAIL; // Replace this with the seller's email address
  try {
    const emailBody = `
      Order Details:
      Order ID: ${order._id}
      Items:
      ${JSON.stringify(cart)}
    `;

    const mailOptionsSeller = {
      from: process.env.FROM_EMAIL,
      to: sellerEmail,
      subject: `New Order Received - Order #${order._id}`,
      text: `You have received a new order!\n\n${emailBody}`,
    };

    // Send the email to the user and the seller
    const response = await transporter.sendMail(mailOptionsSeller);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    return error;
  }
}

module.exports = sendEmailToRestaurant;
