const userRepository = require("./Users/userRepository");

class tempUsersRepository extends userRepository {
    constructor() {
        // Call the parent class constructor
        super();
        // Initialize tempUsers as a Map to store temporary users
        this.tempUsers = new Map();
    }

    // Store temporary user data with email as the key
    storeTempUsers(userData) {
        this.tempUsers.set(userData.email, userData);
    }

    // Retrieve temporary user data by email
    getTempUserByEmail(email) {
        return this.tempUsers.get(email);
    }

    // Delete temporary user data after successful verification
    deleteTempUser(email) {
        this.tempUsers.delete(email);
    }
}

module.exports = new tempUsersRepository();
