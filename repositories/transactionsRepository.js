var transactionsModel = require("../models/transactions");

class transactionRepository {
    
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

    // Get transactions based on user ID
    async getTransactionBasedOnUserId(userId) {
        try {
            const transaction = await transactionsModel.find({ userId: userId });
            return transaction;
        } catch (error) {
            throw new Error(`Error finding transactions for user ID: ${error.message}`);
        }
    }

    // Get transactions based on Amount
    async getTransactionBasedOnAmount(amount) {
        try {
            const transactions = await transactionsModel.find({ Amount: amount });
            return transactions;
        } catch (error) {
            throw new Error(`Error finding transactions with amount ${amount}: ${error.message}`);
        }
    }

    // Get transactions based on DOB to current date
    async getTransactionBasedOnDOBtoCurrent(dob) {
        try {
            const currentDate = new Date();  // Get current date
            const transactions = await transactionsModel.find({
                Date: {
                    $gte: new Date(dob),  // Greater than or equal to the given date (DOB)
                    $lte: currentDate  // Less than or equal to the current date
                }
            });
            return transactions;
        } catch (error) {
            throw new Error(`Error finding transactions between DOB and current date: ${error.message}`);
        }
    }

    // Get transactions based on Category
    async getTransactionBasedOnCategory(category) {
        try {
            const transactions = await transactionsModel.find({ category: category });
            return transactions;
        } catch (error) {
            throw new Error(`Error finding transactions in category ${category}: ${error.message}`);
        }
    }
}

module.exports = transactionRepository;
