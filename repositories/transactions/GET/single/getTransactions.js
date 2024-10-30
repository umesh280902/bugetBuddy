const monthSetter = require("../../../../helpers/month/monthSetter");
const { transactionsModel } = require("../../../../models/transactions");
async function getTransactions(month, year, userId) {
  try {
    const transactions = await transactionsModel.find({ userId: userId });
    const transact = monthSetter(transactions, month, year);
    return transact.reverse();
  } catch (error) {
    throw new Error(
      `Error finding transactions for month ${month} and year ${year}: ${error.message}`
    );
  }
}

module.exports = getTransactions;

