const { createToken } = require("../../helpers/token/tokenHelper");
const UserRepository = require("../../repositories/Users/userRepository");
const tempUserRepository = require("../../repositories/tempUser/tempUserRepository");
const { StatusCodes } = require("http-status-codes");

const userRepo = new UserRepository();

const verifyOtp = async (req, res) => {
    try {
        console.log("Request received with body:", req.body);
        const { email, otp } = req.body;

        if (!email || !otp) {
            console.log("Missing email or OTP");
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide email and OTP both" });
        }

        const stringOtp = Array.isArray(otp) ? otp.join("") : otp.toString();
        console.log("Formatted OTP:", stringOtp);

        console.log("Checking if user already exists...");
        const user = await userRepo.Email(email);
        if (user) {
            console.log("User already exists");
            return res.status(StatusCodes.CONFLICT).json({ message: "User already exists" });
        }

        console.log("Fetching temp user...");
        console.log(email);
        const tempUser = await tempUserRepository.getTempUser(email);
        console.log(tempUser);
        if (!tempUser) {
            console.log("Temp user not found");
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found. Please try again" });
        }

        console.log("Checking if OTP is expired...");
        const currentTime = Date.now();
        const otpExpiryTime = 10 * 60 * 1000; // 10 minutes in milliseconds

        if (currentTime - tempUser.timestamp > otpExpiryTime) {
            console.log("OTP expired. Deleting temp user...");
            tempUserRepository.deleteTempUser(email);
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "OTP expired. Please request a new OTP."
            });
        }

        console.log("Verifying OTP...");
        
        if (tempUser.otp !== stringOtp) {
            console.log("Invalid OTP");
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid OTP" });
        }

        console.log("Creating new user...");
        const newUser = await userRepo.createUser({
            firstName: tempUser.firstName,
            lastName: tempUser.lastName,
            email: tempUser.email,
            password: tempUser.password,
            phoneNumber: tempUser.phoneNumber
        });

        console.log("Deleting temp user...");
        tempUserRepository.deleteTempUser(email);
        
        console.log("Generating token...");
        const token = createToken({ userId: newUser._id, email: newUser.email });

        console.log("User successfully created");
        return res.status(StatusCodes.CREATED).json({
            message: "User successfully created",
            token: token,
            userId: newUser._id
        });

    } catch (error) {
        console.log("Some error occurred:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Some error occurred" });
    }
};

module.exports = verifyOtp;
