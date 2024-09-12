var express = require("express");
var Router = express.Router();
var authentication = require("../middleware/authMiddleware");

var {
  postTransaction,
  getTransaction,
  getTransactionByAmount,
  getTransactionByDob,
  getTransactionByCategory,
} = require("../controllers/transactionController");

// Use authentication middleware for all routes
Router.use(authentication);

// POST: Create a new transaction
Router.post("/", postTransaction);

// GET: Get transactions based on userId
Router.get("/", getTransaction);

// GET: Get transactions based on Amount (using query parameter)
Router.get("/amount", getTransactionByAmount);

// GET: Get transactions between DOB and current date (using query parameter)
Router.get("/dob", getTransactionByDob);

// GET: Get transactions by category (using query parameter)
Router.get("/category", getTransactionByCategory);

module.exports = Router;
