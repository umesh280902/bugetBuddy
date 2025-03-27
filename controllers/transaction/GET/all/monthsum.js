const TransactionsRepository = require("../../../../repositories/transactions/TransactionsRepository");

// GET: Fetch sum of all transactions for each month
const MonthSum = async (req, res, next) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    const monthlySum =
      await TransactionsRepository.transactionRepository.MonthSum(userId);
    return res.status(200).json(monthlySum);
  } catch (error) {
    console.log(error)
    next(error)
  }
};

module.exports = MonthSum;
