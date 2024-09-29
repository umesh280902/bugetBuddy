var { monthNames } = require("./dateGenerator");

const monthSorter = (transactions) => {
    let monthlyTotals = {};

    // Initialize the monthly totals for all months
    for (let i = 0; i < 12; i++) {
        monthlyTotals[monthNames[i]] = 0;
    }

    transactions.forEach((transaction) => {
        const dateParts = transaction.Date.split(" ");  // Split the date string
        const transactionMonth = dateParts[3];          // Month is the 4th part
        const transactionYear = parseInt(dateParts[4]); 
        const currentYear = new Date().getFullYear();   // Get the current year
        
        // Only consider transactions from the current year
        if (transactionYear === currentYear) {
            // Update the total for the corresponding month
            monthlyTotals[transactionMonth] += transaction.Amount;
        }
});

    return monthlyTotals;  // Print the monthly totals
}

module.exports=monthSorter