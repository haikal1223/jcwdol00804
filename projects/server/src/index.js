require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");

const emailSender = require("../emailSender");
const db = require("../database");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.use(express.json());

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
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
        return res.status(402).send({
          message: `User with email ${email} is already verified. Please login`,
        });
      }

      await db
        .promise()
        .query(`UPDATE user set is_verified = 1 WHERE email = '${email}';`);
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

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
