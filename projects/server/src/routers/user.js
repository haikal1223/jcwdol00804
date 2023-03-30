const route = require("express").Router();
const { userController } = require("../controllers");
const {
    validateSignUp,
    validateForgot,
    validateNewPass,
    validateSignIn
    validateReset
} = require("../config/validator");
const { readToken } = require("../config/token");

route.post("/sign-up", validateSignUp, userController.signUp);
route.patch("/verify", userController.verifyEmail);
route.post("/sign-in", validateSignIn, userController.signIn);
route.get("/keep-login", readToken, userController.keepLogin);
route.post("/forgot-password", validateForgot, userController.forgotPass);
route.patch("/reset-password", validateNewPass, readToken, userController.resetPass);
route.patch("/change-password", validateNewPass, readToken, userController.changePass);

module.exports = route;