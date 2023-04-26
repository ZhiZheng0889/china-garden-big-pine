const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const passportControl = require("./lib/auth/passport-control");
const { FRONT_END_URL } = process.env;
const app = express();
const corsOptions = {
  origin: FRONT_END_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true,
  optionsSuccessStatus: 204,
};

// Routes
const foodRouter = require("./foods/foods.router");
const orderRouter = require("./order/order.router");
const userRouter = require("./user/user.router");
const verifyRouter = require("./verify/verify.router");
const favoriteRouter = require("./favorites/favorites.router");

app.use(cookieParser());
app.use(express.json());

app.use(cors(corsOptions));
app.use("/foods", foodRouter);
app.use("/orders", orderRouter);
app.use("/authentication", verifyRouter);
app.use("/favorites", favoriteRouter);
app.use(passportControl.initialize());
app.use("/users", userRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
