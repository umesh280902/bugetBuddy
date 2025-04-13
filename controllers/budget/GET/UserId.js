const BudgetRepository = require("../../../repositories/budget/budgetRepository");

async function UserId(req, res) {
  try {
    const { userId } = req.user;

    // Validate user authentication
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    // Retrieve all budgets for the user
    const user = await BudgetRepository.UserId(userId);
    console.log(user)
    // Handle no data case
    if (!user || user.length === 0) {
      return res
        .status(404)
        .json({ message: "No budgets found for this user." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user budgets:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = UserId;
