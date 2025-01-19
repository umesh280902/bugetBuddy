const budgetModel = require("../../../models/budget/budget");

async function deleteByMonth(userId, month, year) {
    try {
        // Ensure parameters are valid
        if (!userId || !month || !year) {
            throw new Error("Missing required parameters: userId, month, or year.");
        }

        // Find and delete the specific budget
        const deletedMonth = await budgetModel.findOneAndDelete({
            userId: userId,
            Month: month,
            Year: year
        });

        if (!deletedMonth) {
            return `No budget found for the user with ID: ${userId}, month: ${month}, and year: ${year}.`;
        }

        return deletedMonth;
    } catch (error) {
        throw new Error(`Error deleting budget for the user ID: ${userId}, month: ${month}, year: ${year}. Details: ${error.message}`);
    }
}

module.exports = deleteByMonth;
