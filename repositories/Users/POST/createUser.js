const userModel = require("../../../models/user");

async function createUser(user) {
    // Create a new instance of the user model
    const newUser = new userModel(user);

    try {
        // Save the new user to the database
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        // Handle any errors that occur during saving
        throw new Error(`Error creating user: ${error.message}`);
    }
}

module.exports=createUser