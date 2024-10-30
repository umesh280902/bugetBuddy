const TransactionsRepository = require("../../../../repositories/transactions/TransactionsRepository");
const Amount = async (req, res) => {
  try {
    const { amount } = req.query;
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    const transactions =
      await TransactionsRepository.transactionRepository.Amount(amount);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = Amount;
