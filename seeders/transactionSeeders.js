const transactionFactory = require("../factories/transactionFactory");
const TransactionsRepository=require("../repositories/transactions/TransactionsRepository")

const seedTransactions = async (n) => {
  await TransactionsRepository.deleteTransactions()
  const promises = [];
  for (let i = 0; i < n; i++) {
    promises.push(transactionFactory()); // Create the transaction and add the promise to the array
  }

  // Wait for all transactions to complete
  await Promise.all(promises);

  console.log(`${n} transactions seeded successfully.`);
};

module.exports = seedTransactions;
