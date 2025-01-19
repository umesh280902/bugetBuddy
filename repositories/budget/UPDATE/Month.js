const budgetModel = require("../../../models/budget/budget");

async function updateByMonth(userId, month, year, budget) {
  try {
    // Check if the budget exists for the given user, month, and year
    const existingBudget = await budgetModel.findOne({ userId, Month: month, Year: year });
    
    if (!existingBudget) {
      return null; // No existing document found
    }

    // Update the budget
    const updatedBudget = await budgetModel.findOneAndUpdate(
      { userId: userId, Month: month, Year: year },
      { Budget: budget },
      { new: true } // Return the updated document
    );

    return updatedBudget;
  } catch (error) {
    throw new Error(`Error updating budget for the month ${month} and year ${year}: ${error.message}`);
  }
}

module.exports = updateByMonth;
