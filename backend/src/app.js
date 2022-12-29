const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./errors/errorHandler');
const notFound = require('./errors/notFound');
const { FRONT_END_URL } = process.env;
const app = express();

// Routes
const foodsRouter = require('./foods/foods.router');
const orderRouter = require('./order/order.router');
const userRouter = require('./user/user.router');
console.log(FRONT_END_URL);
app.use(cookieParser());
app.use(express.json());
app.use('/foods', cors(), foodsRouter);

app.use(
  '/orders',
  cors({
    origin: FRONT_END_URL,
    credentials: true,
  }),
  orderRouter
);
app.use(
  '/users',
  cors({
    origin: FRONT_END_URL,
    credentials: true,
  }),
  userRouter
);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
