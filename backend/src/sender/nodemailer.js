require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const path = require("path");
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
      ${cart.length}
    `;
    const { _id: order_id, phoneNumber, email, name = "Anthony" } = order;
    const cartItems = cartItemsToHtml(cart);
    const htmlPath = path.join(__dirname, ".", "orderTemplate.html");
    const htmlTemplate = await fs.readFile(htmlPath, "utf-8");
    const htmlContent = htmlTemplate
      .replace("{{order_id}}", order_id)
      .replace("{{phoneNumber}}", phoneNumber)
      .replace("{{email}}", email)
      .replace("{{name}}", name)
      .replace("{{cartItems}}", cartItems);
    console.log("htmlContent: ", htmlContent);
    const mailOptionsSeller = {
      from: process.env.FROM_EMAIL,
      to: sellerEmail,
      subject: `New Order Received - Order #${order._id}`,
      text: `You have received a new order!\n\n${emailBody}`,
      html: htmlContent,
    };

    // Send the email to the user and the seller
    const response = await transporter.sendMail(mailOptionsSeller);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    return error;
  }
}

const cartItemsToHtml = (cart) => {
  const cartFormatted = [];
  cart.forEach((cartItem) => {
    const {
      food: { options, sizes, name },
      quantity,
      specialRequest,
      selectedFoodOption,
      selectedFoodSize,
    } = cartItem;
    const template = `
      <li>
        <div class="cart-item-container">
          <h4>${name}</h4>
          <p><b>Quantity:</b> ${quantity}</p>
        </div>
        <div>
          ${
            selectedFoodOption ? `<p> - ${options[selectedFoodOption]}</p>` : ``
          }
          ${selectedFoodSize ? `<p> - ${sizes[selectedFoodSize]}</p>` : ``}
        </div>
        <div>
          ${
            specialRequest ? (
              <p>
                <b>Special Request:</b> ${specialRequest}
              </p>
            ) : (
              ``
            )
          }
        </div>
      </li>
    `;
    cartFormatted.push(template);
  });
  console.log(cartFormatted);
  return cartFormatted;
};

module.exports = sendEmailToRestaurant;
