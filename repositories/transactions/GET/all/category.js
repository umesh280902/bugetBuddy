const { transactionsModel } = require("../../../../models/transactions");

// Get transactions for a specific category and user
async function categoryFilter(category, userId) {
  try {
    const transactions = await transactionsModel.find({
      userId: userId,
      category: category,
    });
    return transactions;
  } catch (error) {
    throw new Error(
      `Error finding transactions in category ${category}: ${error.message}`
    );
  }
}

module.exports = categoryFilter;
