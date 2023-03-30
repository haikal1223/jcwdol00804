const route = require("express").Router();
const { userController } = require("../controllers");
const {
    validateSignUp,
    validateForgot,
    validateReset
} = require("../config/validator");
const { readToken } = require("../config/token");

route.post("/sign-up", validateSignUp, userController.signUp);
route.patch("/verify", userController.verifyEmail);
route.post("/forgot-password", validateForgot, userController.forgotPass);
route.patch("/reset-password", validateReset, readToken, userController.resetPass);

module.exports = route;
