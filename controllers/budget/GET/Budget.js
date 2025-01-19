const BudgetRepository = require("../../../repositories/budget/budgetRepository");

async function Budget(req, res) {
    try {
        const { budget } = req.query;

        // Validate 'budget' query parameter
        if (!budget) {
            return res.status(400).json({ message: "Please provide a valid budget value." });
        }

        const { userId } = req.user;

        // Validate user authentication
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. Please login again." });
        }

        // Fetch budget data from repository
        const bud = await BudgetRepository.Budget(userId, budget);

        // Handle case when no data is found
        if (!bud || bud.length === 0) {
            return res.status(404).json({ message: "No budget found for the provided value." });
        }

        // Success response
        return res.status(200).json(bud);

    } catch (error) {
        // Log the error for debugging
        console.error("Error fetching budget:", error);

        // Return generic error response
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = Budget;
