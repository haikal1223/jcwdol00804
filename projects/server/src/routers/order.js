const { orderController } = require("../controllers");
const route = require("express").Router();

route.get("/create-new-order", orderController.createNewOrder);

module.exports = route;
