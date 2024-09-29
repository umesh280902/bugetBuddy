const { faker } = require('@faker-js/faker');
const userRepository = require('../repositories/userRepository');
const UserRepository = new userRepository();

const createDummyUsers = async () => {
  const data = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.number.bigInt({min:"1000000000",max:"9999999999"}).toString(),  // Generates a 10-digit number
    password: "12345678",  // Use a simple password for dummy users
  };

  // Save user data to the repository
  await UserRepository.createUser(data);
};

module.exports = createDummyUsers;
