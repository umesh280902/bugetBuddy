const BudgetRepository = require("../../../repositories/budget/budgetRepository");

async function deleteByMonth(req, res) {
    try {
        const { month, year } = req.query;
        const { userId } = req.user;

        // Check if the user is authenticated
        if (!userId) {
            return res.status(401).json({ message: "Please login again" });
        }

        // Validate query parameters
        if (!month || !year) {
            return res.status(400).json({ message: "Month and year are required" });
        }

        // Attempt to delete the budget
        const del = await BudgetRepository.deleteByMonth(userId, month, year);

        // Handle no matching document
        if (!del) {
            return res.status(404).json({
                message: `No budget found for the month ${month} and year ${year}`
            });
        }

        // Success response
        return res.status(200).json({
            message: `Budget deleted successfully for the month ${month} and year ${year}`
        });

    } catch (error) {
        // Log error details for debugging
        console.error("Error deleting budget:", error);

        // Internal server error response
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = deleteByMonth;
