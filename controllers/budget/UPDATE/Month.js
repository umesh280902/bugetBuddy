const BudgetRepository = require("../../../repositories/budget/budgetRepository");

async function updateByMonth(req, res) {
  try {
    const fieldsToUpdate = req.body;
    const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({ message: "No fields provided for update." });
    }

    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    const currentYear = new Date().getFullYear().toString();

    const updatedBudget = await BudgetRepository.updateByMonth(userId, currentMonth, currentYear, fieldsToUpdate);

    if (!updatedBudget) {
      return res.status(404).json({ message: "No budget found for the current month." });
    }

    return res.status(200).json({
      message: "Budget updated successfully for the current month.",
      updated: updatedBudget,
    });
  } catch (error) {
    console.error("Error updating budget:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = updateByMonth;
