const categoryHelper = require("../../../../helpers/category/categoryHelper");
const expenseAllHelper = require("../../../../helpers/expense/expenseAllHelper");
const monthSorter = require("../../../../helpers/month/monthHelpers");
const {
  transactionsModel,
} = require("../../../../models/transactions/transactions");
class TransactionRepository {
  async Amount(amount) {
    const transactions = await transactionsModel.find({ Amount: amount });
    return transactions;
  }

  async categoryMonthSum(category, userId) {
    const transactions = await transactionsModel.find({
      userId: userId,
      category: category,
    });
    const trans = expenseAllHelper(transactions);
    console.log(trans)
    return trans;
  }

  async MonthSum(userId) {
    const transact = await transactionsModel.find({ userId: userId });
    const transactions=expenseAllHelper(transact)
    return transactions;
  }
  async categoryFilter(category, userId) {
    const transactions = await transactionsModel.find({
      userId: userId,
      category: category,
    });
    return transactions;
  }
  async categorysorted(userId) {
    const transact = await transactionsModel.find({ userId: userId });
    const transactions = categoryHelper(transact);
    return transactions;
  }
  async getTransactions(userId) {
    const transaction = await transactionsModel.find({ userId: userId });
    return transaction;
  }

  async creditOrDebit(userId,type){
    let transactions=[]
    const transact=await this.getTransactions(userId);
    transact.forEach((singleTransact)=>{
      if(singleTransact.type===type){
        transactions.push(singleTransact);
      }
    })
    return transactions;
  }

  async creditOrDebitMonthSum(userId,type){
    const transact=await this.creditOrDebit(userId,type);
    const transactions=monthSorter(transact);
    return transactions;
  }


}

module.exports = TransactionRepository;
