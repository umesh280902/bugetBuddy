const TransactionsRepository = require("../../../../repositories/transactions/TransactionsRepository");
// GET: Fetch transactions based on user ID
const allTransaction = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }
    const transactions =
      await TransactionsRepository.transactionRepository.getTransactions(
        userId
      );
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = allTransaction;
