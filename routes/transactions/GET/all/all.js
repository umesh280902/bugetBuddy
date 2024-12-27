const express = require("express");
const router = express.Router();
const transaction = require("../../../../controllers/transaction/transaction");

// Define the `/transactions/all` routes
router.get("/transactions", transaction.all.allTransaction);
router.get("/recent-transactions", transaction.all.RecentTransaction);
router.get("/category", transaction.all.category); // all transaction page
router.get("/category-sorted", transaction.all.categorySorted); //for profile
//router.get("/amount", transaction.all.Amount);
router.get("/month-sum", transaction.all.MonthSum); // transaction page 

module.exports = router;
