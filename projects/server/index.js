const express = require("express");
const emailSender = require("./emailSender");
const db = require("./database");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.patch("/api/users/verify", async (req, res) => {
  const { email } = req.body;
  if (email) {
    try {
      const row = await db
        .promise()
        .query(
          `SELECT u.is_verified FROM user as u WHERE u.email = '${email}'`
        );
      if (!row) {
        return res
          .status(400)
          .send({ message: `User with email ${email} is not registered` });
      }

      const isVerified = row[0][0].is_verified === 1;

      if (isVerified) {
        return res
          .status(402)
          .send({
            message: `User with email ${email} is already verified. Please login`,
          });
      }

      await db
        .promise()
        .query(`UPDATE user set is_verified = 1 WHERE email = '${email}';`);
      return res
        .status(201)
        .send({
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
});

app.post("/api/users", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  emailSender.sendEmail(email);

  res.send({
    email,
    password,
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
