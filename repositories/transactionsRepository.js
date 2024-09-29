const { transactionsModel } = require("../models/transactions");
const singleMonthRepository=require("./singleMonthRepostiory")
const categoryHelper=require("../helpers/categoryHelper")

class transactionRepository {
  constructor() {
    this.singleMonthRepo = new singleMonthRepository();
  }

  // Create a new transaction
  async createTransaction(transaction) {
    const newTransaction = new transactionsModel(transaction);
    try {
      const savedTransaction = await newTransaction.save();
      return savedTransaction;
    } catch (error) {
      throw new Error(`Error creating transaction: ${error.message}`);
    }
  }

  // Get all transactions for a user by userId
  async getTransactionBasedOnUserId(userId) {
    try {
      const transaction = await transactionsModel.find({ userId: userId });
      return transaction;
    } catch (error) {
      throw new Error(`Error finding transactions for user ID: ${error.message}`);
    }
  }

  // Get all transactions for a user and sort them by category
  async getTransactionBasedOnAllTransactionsCategory(userId) {
    try {
      const transact = await transactionsModel.find({ userId: userId });
      const transactions = categoryHelper(transact);
      return transactions;
    } catch (error) {
      throw new Error(`Error finding transactions as per category: ${error.message}`);
    }
  }

  // Get transactions based on amount
  async getTransactionBasedOnAmount(amount) {
    try {
      const transactions = await transactionsModel.find({ Amount: amount });
      return transactions;
    } catch (error) {
      throw new Error(`Error finding transactions with amount ${amount}: ${error.message}`);
    }
  }

  // Get transactions for a specific category and user
  async getTransactionBasedOnCategory(category, userId) {
    try {
      const transactions = await transactionsModel.find({
        userId: userId,
        category: category,
      });
      return transactions;
    } catch (error) {
      throw new Error(`Error finding transactions in category ${category}: ${error.message}`);
    }
  }

  // Access single month methods
  async getSingleMonthTransactions(month, year, userId) {
    return await this.singleMonthRepo.singleMonthMethods.singleMonth(month, year, userId);
  }

  async getSingleMonthCategorySorted(month, year, userId) {
    return await this.singleMonthRepo.singleMonthMethods.singleMonthCategorySorted(month, year, userId);
  }

  async getSingleMonthAndCategory(month, year, category, userId) {
    return await this.singleMonthRepo.singleMonthMethods.singleMonthAndSingleCategory(month, year, category, userId);
  }

  // Access all months sum
  async getAllMonthsSum(userId) {
    return await this.singleMonthRepo.allMonthsSum(userId);
  }
}

module.exports = transactionRepository;
