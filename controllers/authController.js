const userRepository = require("../repositories/userRepository");
const tempUsersRepository = require("../repositories/tempUsersRepository");
const { comparePassword, hashPassword } = require("../helpers/passwordHelper");
const {createToken} = require("../helpers/tokenHelper");
const sendMail = require("../helpers/sendMail");
const generateOTP = require("../helpers/otpGenerator");

// Use the singleton instance of userRepository
const UserRepository =new userRepository();  // No need to instantiate it again

// Controller functions
const signupPost = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber } = req.body;

        if (!firstName || !lastName || !email || !password || !phoneNumber) {
            return res.status(400).json({ message: "Please fill all the details" });
        }

        const user = await UserRepository.getUserByEmail(email);
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        } else {
            const OTP = generateOTP();
            tempUsersRepository.storeTempUsers({ firstName, lastName, email, password, phoneNumber, OTP });
            sendMail(email, "Email verification", `Hi ${firstName} ${lastName}, your OTP for email verification is ${OTP}`);
            return res.status(200).json({ message: `OTP has been sent to your email. Please check your email.` });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const emailVerification = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Please provide email and OTP" });
        }

        const tempUser = tempUsersRepository.getTempUserByEmail(email);
        if (!tempUser || tempUser.OTP !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        const { firstName, lastName, password, phoneNumber } = tempUser;

        const newUser = await UserRepository.createUser({
            firstName,
            lastName,
            email,
            password,  // Ensure password is hashed
            phoneNumber
        });

        tempUsersRepository.deleteTempUser(email);

        const token = createToken({ userId: newUser._id, email: newUser.email });

        return res.status(201).json({
            message: "User successfully created",
            token: token,
        });

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

        const user = await UserRepository.getUserByEmail(email);
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

        const user = await UserRepository.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect" });
        }

        const hashedNewPassword = await hashPassword(newPassword);
        await UserRepository.updatePassword(userId, hashedNewPassword);

        return res.status(200).json({ message: "Password successfully updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const logout = (req, res) => {
    try {
        res.clearCookie("token");

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
    emailVerification,
    logout,
};
