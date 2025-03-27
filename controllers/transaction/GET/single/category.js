const TransactionsRepository=require("../../../../repositories/transactions/TransactionsRepository")

// GET: Fetch transactions based on month, year, and category
const CategoryMonth = async (req, res,next) => {
  try {
    const { month, year, category } = req.query;
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    if (!month || !year || !category) {
      return res
        .status(400)
        .json({ message: "Month, Year, and Category are required" });
    }

    const transactions =
      await TransactionsRepository.singleMonthRepository.categoryFilter(
        month,
        year,
        category,
        userId
      );
    res.status(200).json(transactions);
  } catch (error) {
    next(error)
  }
};

module.exports = CategoryMonth;
