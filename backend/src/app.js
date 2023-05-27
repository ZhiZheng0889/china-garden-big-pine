const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const rateLimit = require("express-rate-limit");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const { FRONT_END_URL } = process.env;
const { FRONT_END_URLS } = process.env;
console.log("env: ", process.env.NODE_ENV);
const app = express();
const { MAX_REQUEST_LIMIT } = process.env;
const { REQUEST_TIMEOUT } = process.env;
if (!MAX_REQUEST_LIMIT) {
  throw new Error("No max request limit has been provided");
}
if (!REQUEST_TIMEOUT) {
  throw new Error("No request timeout has been provided");
}
const corsOptions = {
  origin: FRONT_END_URLS ? FRONT_END_URLS.split(",") : FRONT_END_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true,
  optionsSuccessStatus: 204,
};

// Routes
const foodRouter = require("./foods/foods.router");
const orderRouter = require("./order/order.router");
const { userRouter } = require("./user/user.router");
const { authRouter } = require("./user/user.router");
const verifyRouter = require("./verify/verify.router");
const favoriteRouter = require("./favorites/favorites.router");

app.use(cookieParser());
app.use(express.json());

app.use(cors(corsOptions));
app.use("/foods", foodRouter);
app.use("/orders", orderRouter);
app.use("/authentication", verifyRouter);
app.use("/favorites", favoriteRouter);

app.use("/users/auth", authRouter);
app.set("trust proxy", 2);
const limiter = rateLimit({
  windowsMs: parseInt(REQUEST_TIMEOUT),
  max: parseInt(MAX_REQUEST_LIMIT),
});

app.get("/ip", (req, res) => res.send(req.ip));
app.use(limiter);
app.use("/users", userRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
