const route = require("express").Router();
const { addressController } = require("../controllers");
const { readToken } = require("../config/token");

route.get("/my-address", readToken, addressController.getAddress);
route.post("/add-address", readToken, addressController.addAddress);
route.put("/:id/delete", addressController.deleteAddress);
route.put("/:id/set-main", addressController.setMain);

module.exports = route;