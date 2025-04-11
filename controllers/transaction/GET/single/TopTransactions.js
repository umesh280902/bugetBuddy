const TransactionsRepository=require("../../../../repositories/transactions/TransactionsRepository")

// GET: Fetch transactions based on month and year
const getTransactions = async (req, res,next) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    const currentYear = new Date().getFullYear().toString();
    const transactions =
      await TransactionsRepository.singleMonthRepository.TopTransactions(
        currentMonth,
        currentYear,
        userId
      );

    res.status(200).json(transactions);
  } catch (error) {
    next(error)
  }
};

module.exports = getTransactions;
