const userModel = require("../../../models/user");

async function Email(email) {
    try {
        // Find the user by email
        const user = await userModel.findOne({ email });
        return user;
    } catch (error) {
        // Handle any errors that occur during the query
        throw new Error(`Error finding user by email: ${error.message}`);
    }
}

module.exports=Email