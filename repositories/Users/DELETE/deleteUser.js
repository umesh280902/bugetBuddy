const userModel = require("../../../models/user/user");

async function deleteUser(userId) {
    try {
        // Find the user by ID and delete them
        const deletedUser = await userModel.findByIdAndDelete(userId);
        return deletedUser;
    } catch (error) {
        // Handle any errors that occur during deletion
        throw new Error(`Error deleting user: ${error.message}`);
    }
}

module.exports=deleteUser