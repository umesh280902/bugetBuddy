const transactionRepository = require("../repositories/transactionsRepository");
const TransactionRepository = new transactionRepository();

// POST: Create a new transaction
const postTransaction = async (req, res) => {
  try {
    const { userId } = req.user;
    const { Amount, To, category } = req.body;

    if (!Amount || !To || !category) {
      return res.status(400).json({ message: "Please fill the required details" });
    }

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

module.exports = {
  postTransaction,
};