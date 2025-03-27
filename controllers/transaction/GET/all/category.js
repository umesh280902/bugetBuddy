const TransactionsRepository = require("../../../../repositories/transactions/TransactionsRepository");

// GET: Fetch transactions by category
const Category = async (req, res,next) => {
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
    next(error)
  }
};

module.exports = Category;
