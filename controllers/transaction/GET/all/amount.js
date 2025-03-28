const { nextTick } = require("process");
const TransactionsRepository = require("../../../../repositories/transactions/TransactionsRepository");
const Amount = async (req, res,next) => {
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
    next(error)
  }
};

module.exports = Amount;
