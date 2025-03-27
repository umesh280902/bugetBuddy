const TransactionsRepository=require("../../../../repositories/transactions/TransactionsRepository")

// GET: Fetch transactions based on month and year
const getExpenses = async (req, res,next) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    const expenses =
      await TransactionsRepository.singleMonthRepository.netExpenses(
        userId
      );
    res.status(200).json({"expenses":expenses});
  } catch (error) {
    next(error)
  }
};

module.exports = getExpenses;
