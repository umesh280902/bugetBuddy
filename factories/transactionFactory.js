const { faker } = require("@faker-js/faker");
const UserModel = require("../models/user");
const { categoryEnum } = require("../models/transactions"); 
const transactionRepository = require("../repositories/transactionsRepository");

const TransactionRepository = new transactionRepository();

const getRandomUserId = async () => {
  const users = await UserModel.find({});
  const mainUserIds = users.map((user) => user._id);
  return faker.helpers.arrayElement(mainUserIds); // Return a random user ID
};

const getRandomCategory = () => {
  return faker.helpers.arrayElement(Object.values(categoryEnum)); 
};

const transactionFactory = async () => {
  const data = {
    Amount: faker.finance.amount(),
    To: faker.person.fullName(),
    userId: await getRandomUserId(), // Await the Promise resolution here
    category: getRandomCategory(), 
  };

  await TransactionRepository.createTransaction(data);
};

module.exports = transactionFactory;
