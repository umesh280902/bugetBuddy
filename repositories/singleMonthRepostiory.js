var { transactionsModel } = require("../models/transactions");
var monthSorter = require("../helpers/monthHelpers");
var categoryHelper = require("../helpers/categoryHelper");
var monthSetter = require("../helpers/monthSetter");

class getSingleMonthMethods {
  // Get transactions for a specific month, sorted by category
  async singleMonthCategorySorted(month, year, userId) {
    try {
      const transact = await this.singleMonth(month, year, userId);
      const transactions = categoryHelper(transact); // Sort transactions by category
      return transactions;
    } catch (error) {
      throw new Error(`Error finding transactions for single month as per all category: ${error.message}`);
    }
  }

  // Get transactions for a specific month, year, and category
  async singleMonthAndSingleCategory(month, year, category, userId) {
    try {
      const transactionsForMonth = await this.singleMonth(month, year, userId);
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

  // Get transactions for a specific month and year
  async singleMonth(month, year, userId) {
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
}

class singleMonthRepository {
  constructor() {
    this.singleMonthMethods = new getSingleMonthMethods();
  }

  // Get total spent for each month for a user
  async allMonthsSum(userId) {
    try {
      const transact = await transactionsModel.find({ userId: userId });
      console.log(transact)
      const transactions = monthSorter(transact); // Sort transactions by month
      return transactions;
    } catch (error) {
      throw new Error(`Error finding transactions as month wise: ${error.message}`);
    }
  }
}

module.exports=singleMonthRepository;