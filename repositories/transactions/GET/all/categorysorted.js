const categoryHelper = require("../../../../helpers/category/categoryHelper");
const { transactionsModel } = require("../../../../models/transactions/transactions");
// Get all transactions for a user and sort them by category
async function categorysorted(userId) {
  try {
    const transact = await transactionsModel.find({ userId: userId });
    const transactions = categoryHelper(transact);
    return transactions;
  } catch (error) {
    throw new Error(
      `Error finding transactions as per category: ${error.message}`
    );
  }
}

module.exports = categorysorted;
