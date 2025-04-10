const BudgetRepository = require("../../../repositories/budget/budgetRepository");

async function setBudget(req, res) {
  try {
    const {
      food,
      entertainment,
      tourTravel,
      fashion,
      academics,
      Budget
    } = req.body;

    // Properly validate for undefined (allows 0)
    if (
      food === undefined ||
      entertainment === undefined ||
      tourTravel === undefined ||
      fashion === undefined ||
      academics === undefined ||
      Budget === undefined
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
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
      userId,
      food,
      entertainment,
      "tour/travel": tourTravel,
      fashion,
      academics,
      Budget,
    });

    // Success response
    return res
      .status(200)
      .json({ message: `Budget set successfully for the current month.` });
  } catch (error) {
    console.error("Error setting budget:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = setBudget;
