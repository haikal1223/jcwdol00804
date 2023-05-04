const userController = require("./user");
const cartController = require("./cart");
const orderController = require("./order");
const addressController = require("./address");
const citiesDataController = require("./citiesData");
const productController = require("./product");
const categoryController = require("./category");
const transactionController = require("./transaction");

module.exports = {
  userController,
  addressController,
  citiesDataController,
  productController,
  cartController,
  orderController,
  categoryController,
  transactionController,
};
