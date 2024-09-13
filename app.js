const express = require("express");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const connection = require("./config/db"); // Import here but don't execute
const authRouter = require("./routes/auth");
const transactionRouter = require("./routes/transactions");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello from the Melody team");
  console.log("Hello from the Melody team");
});
app.use("/auth", authRouter);
app.use("/transactions", transactionRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  if (req.app.get("env") === "development") {
    res.render("error");
  } else {
    res.send({ error: err.message });
  }
});

module.exports = app;
