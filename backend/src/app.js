const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./errors/errorHandler');
const notFound = require('./errors/notFound');

const passport = require('passport');

const { twoFactorAuth } = require('C:/Users/zhizh/OneDrive/Desktop/china-garden-big-pine/backend/src/auth/auth.js');


// const passport = require('./auth/auth');
const { FRONT_END_URL } = process.env;

const app = express();
// const passport = require('./auth/auth');


const corsOptions = {
  origin: FRONT_END_URL,
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

//app.use('/2fa', passport.authenticate('2fa', { session: false }));

app.use('/auth', passport.authenticate('auth', { session: false }));

app.use(notFound);
app.use(errorHandler);

app.listen(5000);

module.exports = app;
