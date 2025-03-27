const TransactionsRepository=require("../../../repositories/transactions/TransactionsRepository")
// POST: Create a new transaction
const postTransaction = async (req, res,next) => {
  try {
    const { userId } = req.user; // Assume `userId` is available in `req.user`
    const { Amount, type, To, category, From, isSelfCredit } = req.body;

    // Validate required fields
    if (!Amount || !type || !category) {
      return res.status(400).json({ message: "Please fill the required details." });
    }

    // Validate `To` for debit transactions
    if (type === "debit" && !To) {
      return res.status(400).json({ message: "'To' field is required for debit transactions." });
    }

    // Validate `From` for credit transactions
    if (type === "credit" && !isSelfCredit && !From) {
      return res.status(400).json({ message: "'From' field is required for credit transactions unless it is self-credit." });
    }

    // Create the transaction
    await TransactionsRepository.createTransactions({
      Amount,
      type,
      userId,
      category,
      To: type === "debit" ? To : undefined,
      From: type === "credit" ? From : undefined,
      isSelfCredit: type === "credit" ? !!isSelfCredit : false, // Ensure boolean value
    });

    res.status(200).json({ message: "Transaction added successfully." });
  } catch (error) {
    next(error)
  }
};

module.exports = postTransaction;
