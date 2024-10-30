const TransactionsRepository = require("../../../../repositories/transactions/TransactionsRepository");

// GET: Fetch the latest 5 transactions for the user
const RecentTransaction = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    const transactions = (
      await TransactionsRepository.transactionRepository.getTransactions(userId)
    ).reverse();

    const recentTransactions =
      transactions.length > 5 ? transactions.slice(0, 5) : transactions;

    return res.status(200).json(recentTransactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = RecentTransaction;
