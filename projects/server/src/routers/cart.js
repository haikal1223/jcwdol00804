const { cartController } = require("../controllers");
const route = require("express").Router();
const { readToken } = require("../config/token");
const { validateAddToCart } = require("../config/validator");

route.get("/get-cart-list", readToken, cartController.getCartList);
route.post("/add-new-cart", cartController.initCartUser);
route.post(
  "/add-to-cart",
  validateAddToCart,
  readToken,
  cartController.addtoCart
);
route.patch("/update-cart-qty", readToken, cartController.updateCartQuantity);
route.patch("/delete-item", readToken, cartController.deleteFromCart);

module.exports = route;
