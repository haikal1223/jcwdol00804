const route = require("express").Router();
const { userController } = require("../controllers");
const { validateSignUp } = require("../config/validator");

route.post("/sign-up", validateSignUp, userController.signUp);
route.post("/login", userController.login);

module.exports = route;
