const TransactionsRepository = require("../../../../repositories/transactions/TransactionsRepository");

// GET: Fetch transactions by category
const Category = async (req, res) => {
  try {
    const { category } = req.query;
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const transactions =
      await TransactionsRepository.transactionRepository.categoryFilter(
        category,
        userId
      );
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = Category;
