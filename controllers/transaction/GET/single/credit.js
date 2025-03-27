const TransactionsRepository = require("../../../../repositories/transactions/TransactionsRepository");

const credit = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const { userId } = req.user;
    if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized. Please login again." });
      }
  
    if (!month || !year ) {
        return res
          .status(400)
          .json({ message: "Month and Year are required" });
    }

    const transactions=await TransactionsRepository.singleMonthRepository.creditOrDebit(month,year,userId,"credit")
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};


module.exports=credit;
