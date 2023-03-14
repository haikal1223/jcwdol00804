const { db, dbQuery } = require("../config/db");
const { hashPass } = require("../config/encrypt");
const emailSender = require("../config/emailSender");

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
};
