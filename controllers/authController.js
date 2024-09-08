const userRepository = require("../repositories/userRepository");
const {comparePassword}=require("../helpers/passwordHelper")
const createToken=require("../middleware/authMiddleware")

const signupPost = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber } = req.body;

        if (!firstName || !lastName || !email || !password || !phoneNumber) {
            return res.status(400).json({ message: "Please fill all the details" });
        }

        const user = await userRepository.getUserByEmail(email);
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        } else {
            const newUser = await userRepository.createUser({
                firstName,
                lastName,
                email,
                password, // Ensure that password is hashed before saving
                phoneNumber
            });
            const token = createToken({ userId: newUser._id, email: newUser.email });

            return res.status(201).json({
                message: "User successfully created",
                token: token,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


const loginPost = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = createToken({ userId: user._id, email: user.email });

        return res.status(200).json({
            message: "Login successful",
            token: token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.userId;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Please provide both old and new passwords" });
        }

        const user = await userRepository.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect" });
        }

        // Ensure the new password is hashed before saving
        await userRepository.updatePassword(userId, newPassword);

        return res.status(200).json({ message: "Password successfully updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


const logout = (req, res) => {
    try {
        // Clear the token stored on the client-side
        // In React Native, this would be handled via AsyncStorage on the app side
        res.clearCookie("token"); // If using cookies on the backend side

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports = {
    signupPost,
    loginPost,
    changePassword,
    logout,
};
