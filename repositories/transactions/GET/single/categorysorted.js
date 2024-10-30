const categoryHelper = require("../../../../helpers/category/categoryHelper");
const { transactionsModel } = require("../../../../models/transactions");
const getTransactions = require("./getTransactions");

// Get transactions for a specific month, sorted by category
async function categorysorted(month, year, userId) {
  try {
    const transact = await getTransactions(month, year, userId);
    const transactions = categoryHelper(transact); // Sort transactions by category
    return transactions;
  } catch (error) {
    throw new Error(
      `Error finding transactions for single month as per all category: ${error.message}`
    );
  }
}

module.exports = categorysorted;
