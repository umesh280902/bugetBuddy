const BudgetRepository = require("../../../repositories/budget/budgetRepository");

async function Year(req, res) {
  try {
    const { year } = req.query;

    // Validate year input
    if (!year || isNaN(year)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid year." });
    }

    const { userId } = req.user;

    // Validate user authentication
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Please login again." });
    }

    // Retrieve budgets for the year
    const yr = await BudgetRepository.Year(userId, year);

    // Handle no data case
    if (!yr || yr.length === 0) {
      return res
        .status(404)
        .json({ message: `No budgets found for the year ${year}.` });
    }

    return res.status(200).json(yr);
  } catch (error) {
    console.error("Error fetching yearly budgets:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = Year;
