const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/foods", require("./foods/foods.router"));
app.use("/cart", require("./cart/cart.router"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
