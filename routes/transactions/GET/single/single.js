const express = require("express");
const router = express.Router();
const transaction = require("../../../../controllers/transaction/transaction");

// Define the `/transactions/single` routes
router.get("/transactions", transaction.single.getTransactions);
router.get("/category", transaction.single.CategoryMonth);
router.get("/category-sorted", transaction.single.CategorySortedMonth);

module.exports = router;
