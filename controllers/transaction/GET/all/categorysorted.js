const TransactionsRepository = require("../../../../repositories/transactions/TransactionsRepository");

// GET: Fetch all transactions category sorted
const CategorySorted = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    const transactions =
      await TransactionsRepository.transactionRepository.categorysorted(userId);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = CategorySorted;
