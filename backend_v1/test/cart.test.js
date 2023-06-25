const app = require("../src/app");
const DatabaseManger = require("../src/db/DatabaseManager");
const DatabaseConfig = require("../src/db/DatabaseConfig");
const Food = require("../src/db/models/foodModel");
const Cart = require("../src/db/models/cartModel");
require("dotenv").config();

const cartData = {
  items: [],
};
