var bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.SALTROUNDS, 10); // Parse SALTROUNDS as an integer

// Function to hash a password
const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error; // Re-throw the error for further handling
  }
};

// Function to compare a password with the stored hash
const comparePassword = async (password, databasePassword) => {
  try {
    return await bcrypt.compare(password, databasePassword);
  } catch (error) {
    console.error('Error comparing password:', error);
    throw error; // Re-throw the error for further handling
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
