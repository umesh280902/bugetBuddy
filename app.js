const express = require("express");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const connection = require("./config/db"); 
const authRouter = require("./routes/auth/auth");
const transactionRouter = require("./routes/transactions/transactions");
const budgetRouter=require("./routes/budget/budget")
const verificationRouter=require("./routes/emailVerification/POST/otp")
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/auth", authRouter);
app.use("/email-verification",verificationRouter)
app.use("/transactions", transactionRouter);
app.use("/budget",budgetRouter)
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
