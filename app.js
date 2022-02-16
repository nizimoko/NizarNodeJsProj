const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/authMiddleware");

const usersRouter = require("./routes/users");
const bizRouter = require("./routes/biz");

const app = express();

mongoose
  .connect("mongodb://localhost/studyporjdb")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/biz", authMiddleware, bizRouter);

module.exports = app;
