const TransactionsRepository = require("../../../../repositories/transactions/TransactionsRepository");

// GET: Fetch the latest 5 transactions for the user
const RecentTransaction = async (req, res,next) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    const transactions = (
      await TransactionsRepository.transactionRepository.getTransactions(userId)
    );

    const recentTransactions =
      transactions.length > 5 ? transactions.slice(0, 5) : transactions;

    return res.status(200).json(recentTransactions);
  } catch (error) {
    next(error)
  }
};

module.exports = RecentTransaction;
