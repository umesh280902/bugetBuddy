const { transactionsModel } = require("../../../../models/transactions/transactions");
// Get transactions based on amount
async function Amount(amount){
  try {
    const transactions = await transactionsModel.find({ Amount: amount });
    return transactions;
  } catch (error) {
    throw new Error(
      `Error finding transactions with amount ${amount}: ${error.message}`
    );
  }
};

module.exports=Amount;