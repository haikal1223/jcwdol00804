const route = require("express").Router();
const { readToken } = require("../config/token");
const { productController } = require("../controllers");

route.get("/detail/:id", productController.getDetail);
route.get("/product-list", productController.getProducts);
route.get("/categories", productController.fetchCategories);
route.get("/featured-products", productController.getFeaturedProducts);
route.patch(
  "/adjust-stock-after-order",
  readToken,
  productController.adjustStockAfterOrder
);

module.exports = route;
