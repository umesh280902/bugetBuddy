const transactionRepository = require("../repositories/transactionsRepository");
const TransactionRepository = new transactionRepository();

// GET: Fetch transactions based on user ID
const getTransaction = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    const transactions = await TransactionRepository.getTransactionBasedOnUserId(userId);
    console.log(transactions)
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET: Fetch the latest 5 transactions for the user
const getRecentTransaction = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    const transactions = (await TransactionRepository.getTransactionBasedOnUserId(userId)).reverse();

    const recentTransactions = transactions.length > 5 ? transactions.slice(0, 5) : transactions;

    return res.status(200).json(recentTransactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET: Fetch transactions based on amount
const getTransactionByAmount = async (req, res) => {
  try {
    const { amount } = req.query;
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    const transactions = await TransactionRepository.getTransactionBasedOnAmount(amount);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  getTransaction,
  getRecentTransaction,
  getTransactionByAmount
};
