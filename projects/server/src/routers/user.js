const route = require("express").Router();
const { userController } = require("../controllers");
const { validateSignUp } = require("../config/validator");

route.post("/sign-up", validateSignUp, userController.signUp);
route.patch("/verify", userController.verifyEmail);

module.exports = route;
