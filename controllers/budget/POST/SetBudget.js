const BudgetRepository = require("../../../repositories/budget/budgetRepository");

async function setBudget(req, res) {
  try {
    const { budget, month, year } = req.body;

    // Validate required fields
    if (!budget || !month || !year) {
      return res
        .status(400)
        .json({ message: "Please provide budget, month, and year." });
    }

    const { userId } = req.user;

    // Validate user authentication
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    // Set the budget in the database
    await BudgetRepository.setBudget({
      userId: userId,
      Month: month,
      Year: year,
      Budget: budget,
    });

    // Success response
    return res
      .status(200)
      .json({ message: `Budget set for ${month} ${year} successfully.` });
  } catch (error) {
    console.error("Error setting budget:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = setBudget;
