const BudgetRepository = require("../../../repositories/budget/budgetRepository");

async function Month(req, res) {
    try {
        const { month, year } = req.query;

        // Validate month and year
        if (!month || !year) {
            return res.status(400).json({ message: "Please provide both month and year." });
        }

        const { userId } = req.user;

        // Validate user authentication
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. Please login again." });
        }

        // Fetch budget for the given month and year
        const mon = await BudgetRepository.Month(userId, month, year);

        // Handle case when no data is found
        if (!mon || mon.length === 0) {
            return res.status(404).json({ message: `No budget found for the month ${month} and year ${year}.` });
        }

        // Success response
        return res.status(200).json(mon);

    } catch (error) {
        // Log the error for debugging
        console.error("Error fetching budget for the month:", error);

        // Return generic error response
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = Month;
