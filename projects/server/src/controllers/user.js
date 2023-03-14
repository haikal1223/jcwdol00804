const { db, dbQuery } = require("../config/db");
const { hashPass } = require("../config/encrypt");
const emailSender = require("../emailSender");
const bcrypt = require("bcrypt");

module.exports = {
  signUp: async (req, res) => {
    const { name, email, phone, password } = req.body;
    const newPass = await hashPass(password);
    const checkEmail = await dbQuery(
      `SELECT email from user WHERE email=${db.escape(email)}`
    );
    if (checkEmail.length) {
      return res.status(409).send({
        success: false,
        message: "Email already exist, please use another Email",
      });
    } else {
      db.query(
        "INSERT INTO user SET ?",
        { name, email, phone, password: newPass },
        (error, results, fields) => {
          if (error) throw error;
          return res.status(201).send({
            data: results,
            success: true,
            message:
              "Sign up success ✅, please check your email for account verification",
          });
        }
      );
      emailSender.sendEmail(email);

      //   const result = await dbQuery(
      //     `INSERT INTO user (name,email,phone,password) VALUES (${db.escape(
      //       name
      //     )},${db.escape(email)},${db.escape(phone)},${db.escape(newPass)})`
      //   );
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    db.query(
      `SELECT u.password, u.is_verified from user as u WHERE u.email = ${db.escape(
        email
      )};`,
      async (err, results, fields) => {
        if (err) {
          return res.status(403).send({
            success: false,
            message: `Internal Server Error: ${err}`,
          });
        } else {
          const { password: storedPassword, is_verified } = results[0];
          const validPassword = await bcrypt.compare(password, storedPassword);

          if (validPassword && is_verified) {
            return res.status(200).send({
              success: true,
              message: "Login success",
            });
          }

          if (!is_verified) {
            return res.status(401).send({
              success: false,
              message: `Your email has not been verified. Please verify your email`,
            });
          }

          return res.status(401).send({
            success: false,
            message: `Invalid password or email`,
          });
        }
      }
    );
  },
};
