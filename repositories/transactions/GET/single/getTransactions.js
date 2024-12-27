const monthSetter = require("../../../../helpers/month/monthSetter");
const { transactionsModel } = require("../../../../models/transactions/transactions");
async function getTransactions(month, year, userId) {
  try {
    const transactions = await transactionsModel.find({ userId: userId });
    console.log(transactions)
    const transact = monthSetter(transactions, month, year);
    return transact.reverse();
  } catch (error) {
    throw new Error(
      `Error finding transactions for month ${month} and year ${year}: ${error.message}`
    );
  }
}

module.exports = getTransactions;

