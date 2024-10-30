const userModel = require("../../../models/user");

async function UserById(userId) {
  try {
    // Find the user by ID
    const user = await userModel.findById(userId);
    return user;
  } catch (error) {
    // Handle any errors that occur during the query
    throw new Error(`Error finding user by ID: ${error.message}`);
  }
}

module.exports=UserById