const BudgetRepository = require("../../../repositories/budget/budgetRepository");

async function updateByMonth(req, res) {
  try {
    const { month, year, budget } = req.body;
    if (!month || !year || !budget) {
      return res.status(400).json("Please provide month year and budget.");
    }

    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json("Please login again");
    }

    const upd = await BudgetRepository.updateByMonth(
      userId,
      month,
      year,
      budget
    );

    if (!upd) {
      return res
        .status(404)
        .json(`Budget update failed for the month ${month} and year ${year}`);
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
}

module.exports = updateByMonth;
