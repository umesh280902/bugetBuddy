const getTransactions = require("./getTransactions");
const categorysorted = require("./categorysorted");
const categoryFilter = require("./categoryFilter");

class SingleMonthRepository {
  async getTransactions(month, year, userId) {
    return await  getTransactions(month, year, userId);
  }

  async categorysorted(month, year, userId) {
    return await categorysorted(month, year, userId);
  }

  async categoryFilter(month, year, category, userId) {
    return await categoryFilter(month, year, category, userId);
  }
}

module.exports=SingleMonthRepository