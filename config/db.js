const mongoose = require("mongoose");
require('dotenv').config(); // Ensure this is here

const mongoDbUrl = process.env.MONGODB_URL;

if (!mongoDbUrl) {
  console.error("MONGODB_URL is not defined in the environment variables");
  process.exit(1);
}

const connection = mongoose.connect(mongoDbUrl)
  .then(() => console.log("Connected to the database"))
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process if the connection fails
  });

module.exports = connection;
