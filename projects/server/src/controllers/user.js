const { db, dbQuery } = require("../config/db");
const { hashPass } = require("../config/encrypt");

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
        message:
          "Username or Email already exist, please use another Username or Email",
      });
    } else {
      const result = await dbQuery(
        // "INSERT INTO user (name,email,phone,password) VALUES (?,?,?,?)"
        `INSERT INTO user (name,email,phone,password) VALUES (${db.escape(
          name
        )},${db.escape(email)},${db.escape(phone)},${db.escape(newPass)})`
      );
      return res.status(201).send({
        ...result,
        success: true,
        message:
          "Sign up success ✅, please check your email for account verification",
      });
    }
  },
};
