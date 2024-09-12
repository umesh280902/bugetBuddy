const transactionRepository = require("../repositories/transactionsRepository");
const TransactionRepository = new transactionRepository();

// POST: Create a new transaction
const postTransaction = async (req, res) => {
  try {
    const { userId } = req.user;
    const { Amount, To, category } = req.body;

    // Check if all required fields are provided
    if (!Amount || !To || !category) {
      return res.status(400).json({ message: "Please fill the required details" });
    }

    // Create transaction
    await TransactionRepository.createTransaction({
      Amount,
      To,
      userId,
      category,
    });

    res.status(200).json({ message: "Transaction added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET: Fetch transactions based on user ID
const getTransaction = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    const transactions = await TransactionRepository.getTransactionBasedOnUserId(userId);
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
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
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET: Fetch transactions between DOB and the current date
const getTransactionByDob = async (req, res) => {
  try {
    const { dob } = req.query;
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    if (!dob) {
      return res.status(400).json({ message: "Date of birth (dob) is required" });
    }

    const transactions = await TransactionRepository.getTransactionBasedOnDOBtoCurrent(dob);
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
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

    const transactions = await TransactionRepository.getTransactionBasedOnCategory(category);
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Export the controller functions
module.exports = {
  postTransaction,
  getTransaction,
  getTransactionByAmount,
  getTransactionByDob,
  getTransactionByCategory,
};
