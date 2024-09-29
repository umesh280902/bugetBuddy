const transactionRepository = require("../repositories/transactionsRepository");
const TransactionRepository = new transactionRepository();

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

// GET: Fetch transactions by category
const getTransactionByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const transactions = await TransactionRepository.getTransactionBasedOnCategory(category, userId);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET: Fetch all transactions category sorted
const getAllTransactionsCategorySorted = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    const transactions = await TransactionRepository.getTransactionBasedOnAllTransactionsCategory(userId);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET: Fetch transactions based on month and year
const getTransactionByMonth = async (req, res) => {
  try {
    const { month, year } = req.query;
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    if (!month || !year) {
      return res.status(400).json({ message: "Month and Year both are required" });
    }

    const transactions = await TransactionRepository.getSingleMonthTransactions(month, year, userId);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET: Fetch single month transactions sorted by category
const singleMonthCategorySorted = async (req, res) => {
  try {
    const { month, year } = req.query;
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    if (!month || !year) {
      return res.status(400).json({ message: "Month and Year both are required" });
    }

    const transactions = await TransactionRepository.getSingleMonthCategorySorted(month, year, userId);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET: Fetch transactions based on month, year, and category
const getTransactionsByMonthAndCategory = async (req, res) => {
  try {
    const { month, year, category } = req.query;
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    if (!month || !year || !category) {
      return res.status(400).json({ message: "Month, Year, and Category are required" });
    }

    const transactions = await TransactionRepository.getSingleMonthAndCategory(month, year, category, userId);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET: Fetch sum of all transactions for each month
const getAllMonthsSum = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    const monthlySum = await TransactionRepository.getAllMonthsSum(userId);
    res.status(200).json(monthlySum);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTransactionByAmount,
  getTransactionByCategory,
  getAllTransactionsCategorySorted,
  getTransactionByMonth,
  singleMonthCategorySorted,
  getTransactionsByMonthAndCategory,
  getAllMonthsSum,
};
