const BudgetRepository = require("../../../repositories/budget/budgetRepository");

async function updateByMonth(req, res) {
  try {
    const { month, year, budget } = req.body;

    // Validate required fields
    if (!month || !year || !budget) {
      return res
        .status(400)
        .json({ message: "Please provide month, year, and budget." });
    }

    const { userId } = req.user;

    // Validate user authentication
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    // Update the budget
    const updatedBudget = await BudgetRepository.updateByMonth(userId, month, year, budget);

    // Handle update result
    if (!updatedBudget) {
      return res
        .status(404)
        .json({ message: `Budget not found for ${month} ${year}.` });
    }

    return res
      .status(200)
      .json({ message: `Budget updated successfully for ${month} ${year}.` });
  } catch (error) {
    console.error("Error updating budget:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = updateByMonth;
