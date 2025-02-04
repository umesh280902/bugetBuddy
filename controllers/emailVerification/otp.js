const { createToken } = require("../../helpers/token/tokenHelper");
const UserRepository = require("../../repositories/Users/userRepository");
const tempUserRepository = require("../../repositories/tempUser/tempUserRepository");
const { StatusCodes } = require("http-status-codes");

const userRepo = new UserRepository();

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide email and OTP both" });
        }

        const user = await userRepo.Email(email);
        if (user) {
            return res.status(StatusCodes.CONFLICT).json({ message: "User already exists" });
        }

        const tempUser = await tempUserRepository.getTempUser(email);
        if (!tempUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found. Please try again" });
        }

        // **Check if OTP is expired (10 minutes)**
        const currentTime = Date.now();
        const otpExpiryTime = 10 * 60 * 1000; // 10 minutes in milliseconds

        if (currentTime - tempUser.timestamp > otpExpiryTime) {
            tempUserRepository.deleteTempUser(email);
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "OTP expired. Please request a new OTP."
            });
        }

        if (tempUser.otp !== otp) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid OTP" });
        }

        const newUser = await userRepo.createUser({
            firstName: tempUser.firstName,
            lastName: tempUser.lastName,
            email: tempUser.email,
            password: tempUser.password,
            phoneNumber: tempUser.phoneNumber
        });

        tempUserRepository.deleteTempUser(email);
        const token = createToken({ userId: newUser._id, email: newUser.email });

        return res.status(StatusCodes.CREATED).json({
            message: "User successfully created",
            token: token,
        });

    } catch (error) {
        console.log("Some error occurred:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Some error occurred" });
    }
};

module.exports =  verifyOtp ;
