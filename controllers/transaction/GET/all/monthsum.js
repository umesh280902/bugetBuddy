const TransactionsRepository = require("../../../../repositories/transactions/TransactionsRepository");

// GET: Fetch sum of all transactions for each month
const MonthSum = async (req, res) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    const monthlySum =
      await TransactionsRepository.transactionRepository.MonthSum(userId);
    res.status(200).json(monthlySum);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = MonthSum;
