var mongoose = require("mongoose");
var { hashPassword } = require("../helpers/passwordHelper");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure the email is unique in the database
    },
    phoneNumber: {
        type: Number,
        required: true,  // Assuming phone number is required
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);  // Ensure phone number is 10 digits
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    password: {
        type: String,
        required: true,  // Password is required
    }
});

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (this.isModified("password")) {
        try {
            this.password = await hashPassword(this.password);
        } catch (error) {
            return next(error);  // Handle the error during password hashing
        }
    }
    next();  // Continue with the save operation
});

module.exports = mongoose.model("User", userSchema);
