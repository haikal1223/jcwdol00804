const express = require("express");
const bodyParser = require("body-parser");
const emailSender = require("./emailSender");
const cors = require("cors");

const app = express();
app.use(cors());

const jsonParser = bodyParser.json();

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.post("/api/verify-email", jsonParser, (req, res) => {
  const email = req.body.email;

  res.send({
    message: `Your email ${email} has been verified`,
  });
});

app.post("/api/users", jsonParser, (req, res) => {
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
