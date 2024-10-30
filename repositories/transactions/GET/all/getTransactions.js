const { transactionsModel } = require("../../../../models/transactions");

// Get all transactions for a user by userId
async function getTransactions(userId) {
  try {
    const transaction = await transactionsModel.find({ userId: userId });
    return transaction;
  } catch (error) {
    throw new Error(`Error finding transactions for user ID: ${error.message}`);
  }
}

module.exports = getTransactions;
