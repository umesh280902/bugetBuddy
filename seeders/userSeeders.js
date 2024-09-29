const createDummyUsers = require('../factories/userFactory');

const seedUsers = async (n) => {
  for (let i = 0; i < n; i++) {
    await createDummyUsers();  // Await to ensure each user is created before moving to the next
  }
};


module.exports = seedUsers;
