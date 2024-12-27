const { transactionsModel } = require("../../../models/transactions/transactions");
// Create a new transaction
async function createTransactions(transaction) {
  const newTransaction = new transactionsModel(transaction);
  try {
    const savedTransaction = await newTransaction.save();
    return savedTransaction;
  } catch (error) {
    throw new Error(`Error creating transaction: ${error.message}`);
  }
}

module.exports = createTransactions;
