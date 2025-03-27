const TransactionsRepository = require("../../../../repositories/transactions/TransactionsRepository");

const credit = async (req, res, next) => {
  try {
    const { userId } = req.user;
    if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized. Please login again." });
      }

    const transactions=await TransactionsRepository.transactionRepository.creditOrDebit(userId,"credit")
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};


module.exports=credit;
