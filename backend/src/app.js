const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const errorHandler = require('./errors/errorHandler');
const notFound = require('./errors/notFound');

const app = express();

// Routes
const foodsRouter = require('./foods/foods.router');
const orderRouter = require('./order/order.router');
app.use(cors());

app.use(express.json());
app.use('/foods', foodsRouter);
app.use('/orders', orderRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
