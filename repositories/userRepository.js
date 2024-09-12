const userModel = require("../models/user");

class userRepository {
    async createUser(user) {
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

    async getUserByEmail(email) {
        try {
            // Find the user by email
            const user = await userModel.findOne({ email });
            return user;
        } catch (error) {
            // Handle any errors that occur during the query
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    async getUserByPhoneNumber(phoneNumber) {
        try {
            // Find the user by phone number
            const user = await userModel.findOne({ phoneNumber });
            return user;
        } catch (error) {
            // Handle any errors that occur during the query
            throw new Error(`Error finding user by phone number: ${error.message}`);
        }
    }

    async getUserById(userId) {
        try {
            // Find the user by ID
            const user = await userModel.findById(userId);
            return user;
        } catch (error) {
            // Handle any errors that occur during the query
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    async updatePassword(userId, newPassword) {
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

    async deleteUser(userId) {
        try {
            // Find the user by ID and delete them
            const deletedUser = await userModel.findByIdAndDelete(userId);
            return deletedUser;
        } catch (error) {
            // Handle any errors that occur during deletion
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

module.exports = userRepository;
