const { faker } = require("@faker-js/faker");
const TransactionRepository = require("../../repositories/transactions/TransactionsRepository");
const getRandomCategory = require("./category");
const getRandomUserId = require("./userId");
const getRandomType = require("./type");

const transactionFactory = async () => {
  // Generate random transaction type
  const type = getRandomType();

  // Generate transaction data based on type
  const data = {
    Amount: parseFloat(faker.finance.amount(1, 10000, 2)), // Generate valid positive number
    userId: await getRandomUserId(), // Await the Promise resolution here
    category: getRandomCategory(),
    type, // Debit or Credit
    ...(type === "debit" && { To: faker.person.fullName() }),
    ...(type === "credit" && { From: faker.person.fullName() }),
  };

  try {
    // Create a transaction in the database
    await TransactionRepository.createTransactions(data);
    console.log("Transaction created:", data);
  } catch (error) {
    console.error("Error creating transaction:", error);
  }
};

module.exports = transactionFactory;
