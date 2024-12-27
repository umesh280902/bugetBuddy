const BudgetRepository = require("../../../repositories/budget/budgetRepository");

async function setBudget(req, res) {
  try {
    const { budget, month, year } = req.body;
    if (!budget || !month || !year) {
      return res.status(400).json("Please provide budget month and year.");
    }
    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json("Please login again");
    }

    const bud = await BudgetRepository.setBudget({
      userId,
      month,
      year,
      budget,
    });
    if (bud) {
      return res.status(200).json(bud);
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
}

module.exports = setBudget;
