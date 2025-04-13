const BudgetRepository = require("../../../repositories/budget/budgetRepository");

async function setBudget(req, res) {
  try {
    const {
      food,
      entertainment,
      tourTravel,
      fashion,
      academics,
      Budget,
    } = req.body;

    const { userId } = req.user;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please login again." });
    }

    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    const currentYear = new Date().getFullYear().toString();

    const existingBudget = await BudgetRepository.Month(userId, currentMonth.toString(), currentYear.toString());
    console.log(existingBudget)
    const budgetData = {
      ...(food !== undefined && { food }),
      ...(entertainment !== undefined && { entertainment }),
      ...(tourTravel !== undefined && { "tour/travel": tourTravel }),
      ...(fashion !== undefined && { fashion }),
      ...(academics !== undefined && { academics }),
      ...(Budget !== undefined && { Budget }),
    };

    if (existingBudget) {
      // Partial update is allowed
      if (Object.keys(budgetData).length === 0) {
        return res.status(400).json({ message: "No fields provided to update." });
      }

      await BudgetRepository.updateByMonth(userId, currentMonth, currentYear, budgetData);
      console.log("yes")
      return res.status(200).json({ message: "Budget updated successfully for the current month." });
    } else {
      console.log("yes")
      // Require all fields for new budget
      const requiredFields = [food, entertainment, tourTravel, fashion, academics, Budget];
      const allProvided = requiredFields.every((field) => field !== undefined);

      if (!allProvided) {
        return res.status(400).json({ message: "Please provide all required fields to set the budget." });
      }

      const newBudgetData = {
        userId,
        food,
        entertainment,
        "tour/travel": tourTravel,
        fashion,
        academics,
        Budget,
        Month: currentMonth,
        Year: currentYear,
      };

      const budget=await BudgetRepository.setBudget(newBudgetData);
      return res.status(201).json({ message: "Budget set successfully for the current month.",budget });
    }
  } catch (error) {
    console.error("Error setting/updating budget:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = setBudget;
