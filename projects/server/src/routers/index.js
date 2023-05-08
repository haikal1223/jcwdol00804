const userRoute = require("./user");
const cartRoute = require("./cart");
const orderRoute = require("./order");
const addressRoute = require("./address");
const citiesDataRoute = require("./citiesData");
const productRoute = require("./product");
const categoryRoute = require("./category");
const transactionRoute = require("./transaction");

module.exports = {
  userRoute,
  addressRoute,
  citiesDataRoute,
  productRoute,
  cartRoute,
  orderRoute,
  categoryRoute,
  transactionRoute,
};
