const { faker } = require("@faker-js/faker");
const TransactionRepository = require("../../repositories/transactions/TransactionsRepository");
const getRandomCategory = require("./category");
const getRandomUserId = require("./userId");
const User = require("../../models/user/user"); // Adjust the path to your User model
const selfCreditTransactionFactory = async () => {
  try {
    const userId = await getRandomUserId(); // Fetch a random user ID
    const user = await User.findById(userId); // Fetch user details

    if (!user) {
      throw new Error("User not found");
    }

    const data = {
      Amount: parseFloat(faker.finance.amount(1, 10000, 2)), // Generate a positive number
      userId,
      category: getRandomCategory(),
      type: "credit",
      isSelfCredit: true,
      From: `${user.firstName} ${user.lastName}`, // Set the From field here
    };

    await TransactionRepository.createTransactions(data);
    console.log("Self-credit transaction created:", data);
  } catch (error) {
    console.error("Error creating self-credit transaction:", error);
  }
};

module.exports = selfCreditTransactionFactory;
