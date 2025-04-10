const TransactionsRepository=require("../../../repositories/transactions/TransactionsRepository")
// POST: Create a new transaction
const postTransaction = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { Amount, type, To, category, From, isSelfCredit, Date } = req.body;

    if (!Amount || !type || !category) {
      return res.status(400).json({ message: "Amount, type, and category are required." });
    }

    if (type === "debit" && !To) {
      return res.status(400).json({ message: "'To' field is required for debit transactions." });
    }

    if (type === "credit" && !isSelfCredit && !From) {
      return res.status(400).json({ message: "'From' field is required for credit transactions unless it is self-credit." });
    }

    

    await TransactionsRepository.createTransactions({
      Amount,
      type,
      userId,
      category,
      Date,
      To: type === "debit" ? To : undefined,
      From: type === "credit" ? From : undefined,
      isSelfCredit: type === "credit" ? !!isSelfCredit : false,
    });

    res.status(200).json({ message: "Transaction added successfully." });
  } catch (error) {
    console.error("Error in postTransaction:", error);
    next(error);
  }
};


module.exports = postTransaction;
