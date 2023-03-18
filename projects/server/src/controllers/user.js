const { db, dbQuery } = require("../config/db");
const { hashPass } = require("../config/encrypt");
const emailSender = require("../config/emailSender");
const { transporter } = require("../config/emailSender/transporter");
const { createToken } = require("../config/token");
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
          emailSender.sendEmail(email);
          return res.status(201).send({
            data: results,
            success: true,
            message:
              "Sign up success ✅, please check your email for account verification",
          });
        }
      );
      //   const result = await dbQuery(
      //     `INSERT INTO user (name,email,phone,password) VALUES (${db.escape(
      //       name
      //     )},${db.escape(email)},${db.escape(phone)},${db.escape(newPass)})`
      //   );
    }
  },
  verifyEmail: async (req, res) => {
    const { email } = req.body;
    if (email) {
      try {
        const row = await dbQuery(
          `SELECT u.is_verified FROM user as u WHERE u.email = '${email}'`
        );
        if (!row.length) {
          return res
            .status(400)
            .send({ message: `User with email ${email} is not registered` });
        }
        const isVerified = row[0].is_verified === 1;
        if (isVerified) {
          return res.status(402).send({
            message: `User with email ${email} is already verified. Please login`,
          });
        }
        await dbQuery(
          `UPDATE user set is_verified = 1 WHERE email = '${email}';`
        );
        return res.status(201).send({
          message: `User with email ${email} has been successfully verified!`,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res
        .status(400)
        .send({ message: "Bad Request: Please provide valid email" });
    }
  },
  // ==============================
  // Email check for Reset Password
  forgotPass: async (req, res) => {
    try {
      const { email } = req.body;
      db.query(
        `SELECT * from user WHERE email=${db.escape(email)};`, (error, results) => {
          if (!results.length) {
            return res.status(409).send({
              success: false,
              message: "Email address is not Registered, Please enter a Registered Email"
            });
          } else {
            const token = createToken({ ...results[0] });
            transporter.sendMail({
              from: 'XMART ADMIN',
              to: email,
              subject: 'Reset password',
              html: `<div>
              <h3>
              Click link below to Reset your password
              </h3>
              <a href="http://localhost:3000/reset-password?t=${token}">
              Reset now
              </a>
              </div>`
            }, (error, info) => {
              if (error) {
                return res.status(400).send(error);
              }
              return res.status(200).send({
                success: true,
                message: 'Check your email to reset your password',
                info
              });
            });
          };
        });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // ===================
  // Update new password
  resetPass: async (req, res) => {
    try {
      const { password } = req.body;
      const newPass = await hashPass(password);
      db.query(`UPDATE user set password=${db.escape(newPass)} 
      WHERE id=${db.escape(req.decript.id)};`, (error, results) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: error
          });
        }
        return res.status(200).send({
          success: true,
          message: 'Reset Password success'
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    };
  },
  // =======
  // Sign in
  signIn: async (req, res) => {
    try {
      db.query(`SELECT * from user 
      WHERE email=${db.escape(req.body.email)};`, (error, results) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: error
          });
        };
        const passCheck = bcrypt.compareSync(req.body.password, results[0].password);
        // delete results[0].password;
        if (passCheck) {
          const token = createToken({ ...results[0] });
          return res.status(200).send({ ...results[0], token });
        } else {
          return res.status(401).send({
            success: false,
            message: 'Your password is wrong'
          });
        };
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  // ==========
  // Keep login
  keepLogin: async (req, res) => {
    try {
      db.query(`SELECT * from user
      WHERE id=${db.escape(req.decript.id)};`, (error, results) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: error
          });
        }
        const token = createToken({ ...results[0] });
        return res.status(200).send({ ...results[0], token });
      })
    } catch (error) {

    }
  },
  // ===============
  // Change password
  changePass: async (req, res) => {
    try {
      const { password } = req.body;
      const newPass = await hashPass(password);
      db.query(`UPDATE user set password=${db.escape(newPass)} 
      WHERE id=${db.escape(req.decript.id)};`, (error, results) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: error
          });
        }
        return res.status(200).send({
          success: true,
          message: 'Change Password success'
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    };
  },
};