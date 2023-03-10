const nodemailer = require("nodemailer");

module.exports = {
  transporter: nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "xmart.shop8@gmail.com",
      pass: "mbrdzyrpxbmjdytv",
    },
  }),
};
