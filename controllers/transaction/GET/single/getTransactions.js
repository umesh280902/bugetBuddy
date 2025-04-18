const TransactionsRepository=require("../../../../repositories/transactions/TransactionsRepository")

// GET: Fetch transactions based on month and year
const getTransactions = async (req, res,next) => {
  try {
    const { month, year } = req.query;
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    if (!month || !year) {
      return res
        .status(400)
        .json({ message: "Month and Year both are required" });
    }

    const transactions =
      await TransactionsRepository.singleMonthRepository.getTransactions(
        month,
        year,
        userId
      );
    res.status(200).json(transactions);
  } catch (error) {
    next(error)
  }
};

module.exports = getTransactions;
