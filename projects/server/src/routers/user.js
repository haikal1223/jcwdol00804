const route = require("express").Router();
const { userController } = require("../controllers");
const {
  validateSignUp,
  validateSignIn,
  validateEditProfile,
} = require("../config/validator");
const { readToken } = require("../config/token");
const { profileImgUploader } = require("../config/uploader");

route.post("/sign-up", validateSignUp, userController.signUp);
route.patch("/verify", userController.verifyEmail);
route.post("/sign-in", validateSignIn, userController.signIn);
route.get("/keep-login", readToken, userController.keepLogin);
route.patch(
  "/update-profile",
  validateEditProfile,
  readToken,
  userController.editProfile
);
route.get("/unique-email/:email", userController.uniqueEmail);
route.patch(
  "/upload-profile-img",
  readToken,
  profileImgUploader("/imgProfile", "IMGPROFILE").array("images", 1),
  userController.uploadProfileImg
);
route.get("/get-user-info", readToken, userController.getUserInfo);

module.exports = route;
