const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./errors/errorHandler');
const notFound = require('./errors/notFound');
const { FRONT_END_URL } = process.env;

const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true,
  optionsSuccessStatus: 204,
};

// Routes
const foodsRouter = require('./foods/foods.router');
const orderRouter = require('./order/order.router');
const userRouter = require('./user/user.router');

app.use(cookieParser());
app.use(express.json());

app.use(cors(corsOptions));

app.use('/foods', foodsRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
