const { cartController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require("../config/token");
const { validateAddToCart } = require("../config/validator");

route.get("/get-cart-list", readToken, cartController.getCartList);
route.post("/add-new-cart", cartController.initCartUser);
route.post("/add-to-cart", validateAddToCart, cartController.addtoCart);
route.patch("/update-cart-qty", cartController.updateCartQuantity);
route.patch("/delete-item", cartController.deleteFromCart);

module.exports = route;
