const monthSorter = require("../../../../helpers/month/monthHelpers");
const { transactionsModel } = require("../../../../models/transactions");

// Get total spent for each month for a user
async function MonthSum(userId) {
  try {
    const transact = await transactionsModel.find({ userId: userId });
    console.log(transact);
    const transactions = monthSorter(transact); // Sort transactions by month
    return transactions;
  } catch (error) {
    throw new Error(
      `Error finding transactions as month wise: ${error.message}`
    );
  }
}

module.exports = MonthSum;
