const getTransactions = require("./getTransactions");

// Get transactions for a specific month, year, and category
async function categoryFilter(month, year, category, userId) {
  try {
    const transactionsForMonth = await getTransactions(month, year, userId);
    const filteredTransactions = transactionsForMonth.filter(
      (transaction) => transaction.category === category
    );
    return filteredTransactions;
  } catch (error) {
    throw new Error(
      `Error finding transactions for month ${month}, year ${year}, and category ${category}: ${error.message}`
    );
  }
}

module.exports=categoryFilter