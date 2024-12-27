const userModel = require("../../../models/user/user");

async function updatePassword(userId, newPassword) {
    try {
        // Find the user by ID and update their password
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { password: newPassword },
            { new: true } // Return the updated document
        );
        return updatedUser;
    } catch (error) {
        // Handle any errors that occur during the update
        throw new Error(`Error updating password: ${error.message}`);
    }
}

module.exports=updatePassword