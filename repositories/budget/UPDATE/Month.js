const budgetModel = require("../../../models/budget/budget");

async function updateByMonth(userId, month, year, field, value) {
  try {
    // Field mapping (tourTravel ➝ tour/travel)
    const dbField = field === "tourTravel" ? "tour/travel" : field;

    // Allowed fields
    const allowedFields = ["food", "entertainment", "tourTravel", "fashion", "academics", "others"];
    if (!allowedFields.includes(field)) {
      throw new Error("Invalid field for budget update.");
    }

    // Find existing document
    const existingBudget = await budgetModel.findOne({ userId, Month: month, Year: year });
    if (!existingBudget) {
      return null;
    }

    // Update that specific field
    existingBudget[dbField] = value;

    // Save to trigger pre-save hook (which updates total Budget)
    const updatedDoc = await existingBudget.save();

    return updatedDoc;
  } catch (error) {
    throw new Error(`Error updating ${field} for ${month} ${year}: ${error.message}`);
  }
}

module.exports = updateByMonth;
