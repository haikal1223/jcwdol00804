const { check, validationResult } = require("express-validator");

module.exports = {
  validateSignUp: async (req, res, next) => {
    try {
      await check("name").isString().notEmpty().run(req),
        await check("email")
          .isString()
          .notEmpty()
          .isEmail()
          .withMessage("Invalid email format")
          .run(req),
        await check("phone")
          .isString()
          .notEmpty()
          .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)
          .withMessage("Invalid phone number")
          .run(req),
        await check("password")
          .isString()
          .isLength({ min: 8 })
          .withMessage("Should more than 8 characters")
          .matches(/[a-z]/g)
          .withMessage("Should contain at least 1 lower case letter")
          .matches(/[A-Z]/g)
          .withMessage("Should contain at least 1 upper case letter")
          .matches(/[0-9]/g)
          .withMessage("Should contain at least 1 number")
          .run(req);
      await check("confirmpassword")
        .isString()
        .notEmpty()
        .equals(req.body.password)
        .withMessage("Password doesn't match")
        .run(req);
      const validation = validationResult(req);
      if (validation.isEmpty()) {
        next();
      } else {
        return res.status(400).send({
          success: false,
          message: "Validation invalid ❌",
          error: validation.errors,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  validateForgot: async (req, res, next) => {
    try {
      await check("email")
        .isString()
        .notEmpty()
        .isEmail()
        .withMessage("Invalid email format")
        .run(req)
      const validation = validationResult(req);
      if (validation.isEmpty()) {
        next();
      } else {
        return res.status(400).send({
          success: false,
          message: "Validation invalid ❌",
          error: validation.errors,
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  validateNewPass: async (req, res, next) => {
    try {
      await check("password")
        .isString()
        .isLength({ min: 8 })
        .withMessage("Should more than 8 characters")
        .matches(/[a-z]/g)
        .withMessage("Should contain at least 1 lower case letter")
        .matches(/[A-Z]/g)
        .withMessage("Should contain at least 1 upper case letter")
        .matches(/[0-9]/g)
        .withMessage("Should contain at least 1 number")
        .run(req);
      await check("confirmpassword")
        .isString()
        .notEmpty()
        .equals(req.body.password)
        .withMessage("Password doesn't match")
        .run(req);
      const validation = validationResult(req);
      if (validation.isEmpty()) {
        next();
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  validateSignIn: async (req, res, next) => {
    try {
      await check("email")
        .isString()
        .notEmpty()
        .isEmail()
        .withMessage("Invalid email format")
        .run(req)
      await check("password")
        .isString()
        .isLength({ min: 8 })
        .withMessage("Should more than 8 characters")
        .matches(/[a-z]/g)
        .withMessage("Should contain at least 1 lower case letter")
        .matches(/[A-Z]/g)
        .withMessage("Should contain at least 1 upper case letter")
        .matches(/[0-9]/g)
        .withMessage("Should contain at least 1 number")
        .run(req);
      const validation = validationResult(req);
      if (validation.isEmpty()) {
        next();
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  validateForgot: async (req, res, next) => {
    try {
      await check("email")
        .isString()
        .notEmpty()
        .isEmail()
        .withMessage("Invalid email format")
        .run(req)
      const validation = validationResult(req);
      console.log(validation);
      if (validation.isEmpty()) {
        next();
      } else {
        return res.status(400).send({
          success: false,
          message: "Validation invalid ❌",
          error: validation.errors,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  validateReset: async (req, res, next) => {
    try {
      await check("password")
        .isString()
        .isLength({ min: 8 })
        .withMessage("Should more than 8 characters")
        .matches(/[a-z]/g)
        .withMessage("Should contain at least 1 lower case letter")
        .matches(/[A-Z]/g)
        .withMessage("Should contain at least 1 upper case letter")
        .matches(/[0-9]/g)
        .withMessage("Should contain at least 1 number")
        .run(req);
      await check("confirmpassword")
        .isString()
        .notEmpty()
        .equals(req.body.password)
        .withMessage("Password doesn't match")
        .run(req);
      const validation = validationResult(req);
      console.log(validation);
      if (validation.isEmpty()) {
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
