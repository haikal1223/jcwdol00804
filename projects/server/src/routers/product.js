const route = require("express").Router();
const { productController } = require("../controllers");

route.get("/detail/:id", productController.getDetail);
route.get("/product-list", productController.getProducts);
route.get("/categories", productController.fetchCategories);
route.get("/featured-products", productController.getFeaturedProducts);

module.exports = route;