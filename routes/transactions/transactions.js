const express = require("express");
const router = express.Router();
const authentication = require("../../middleware/authMiddleware");
const allRoutes = require("./GET/all/all");
const singleRoutes = require("./GET/single/single");
const transaction = require("../../controllers/transaction/transaction");

// Use authentication middleware for all routes
router.use(authentication);

// Define the main transaction route (e.g., for creating a new transaction)
router.post("/", transaction.postTransaction);
// Set the prefixes for `all` and `single` routes
router.use("/all", allRoutes);
router.use("/single", singleRoutes);

module.exports = router;
