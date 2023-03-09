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
      //   const result = await dbQuery(
      //     `INSERT INTO user (name,email,phone,password) VALUES (${db.escape(
      //       name
      //     )},${db.escape(email)},${db.escape(phone)},${db.escape(newPass)})`
      //   );
    }
  },
};
