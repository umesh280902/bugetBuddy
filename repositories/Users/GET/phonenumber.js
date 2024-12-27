const userModel = require("../../../models/user/user");

async function PhoneNumber (phoneNumber) {
    try {
        // Find the user by phone number
        const user = await userModel.findOne({ phoneNumber });
        return user;
    } catch (error) {
        // Handle any errors that occur during the query
        throw new Error(`Error finding user by phone number: ${error.message}`);
    }
}

module.exports=PhoneNumber