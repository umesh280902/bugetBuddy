const express = require("express");
const Router = express.Router();
const authentication = require("../middleware/authMiddleware");

const transactionCreateController = require("../controllers/transactionCreateController");
const transactionGetController = require("../controllers/transactionGetController");
const transactionFilterController = require("../controllers/transactionFilterController");

// Use authentication middleware for all routes
Router.use(authentication);

// POST: Create a new transaction
Router.post("/", transactionCreateController.postTransaction);

// GET: Get all transactions based on userId
Router.get("/", transactionGetController.getTransaction);

// GET: Get the latest transactions
Router.get("/recent-transactions", transactionGetController.getRecentTransaction);

// GET: Get transactions by amount
Router.get("/amount", transactionFilterController.getTransactionByAmount);

// GET: Get transactions by category
Router.get("/category", transactionFilterController.getTransactionByCategory);

// GET: Get transactions by month and year
Router.get("/month", transactionFilterController.getTransactionByMonth);

// GET: Get transactions by month, year, and category
Router.get("/month-category", transactionFilterController.getTransactionsByMonthAndCategory);

// GET: Get all transactions sorted by category
Router.get("/category-sorted", transactionFilterController.getAllTransactionsCategorySorted);

// GET: Get transactions for a single month sorted by category
Router.get("/single-month-category-sorted", transactionFilterController.singleMonthCategorySorted);

// GET: Get sum of transactions for all months
Router.get("/monthly-sum", transactionFilterController.getAllMonthsSum);

module.exports = Router;
