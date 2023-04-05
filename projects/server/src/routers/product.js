const route = require("express").Router();
const { productController } = require("../controllers");

route.get("/:id", productController.getDetail);

module.exports = route;