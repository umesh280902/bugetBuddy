const userRepository = require("../repositories/userRepository");
//const tempUsersRepository = require("../repositories/tempUsersRepository");
const { comparePassword, hashPassword } = require("../helpers/passwordHelper");
const {
  createToken,
  authenticateToken,
  createTokenForPassword,
} = require("../helpers/tokenHelper");
const sendMail = require("../helpers/sendMail");
//const generateOTP = require("../helpers/otpGenerator");

// Use the singleton instance of userRepository
const UserRepository = new userRepository(); // No need to instantiate it again

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
      const newUser = await UserRepository.createUser({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
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

// const emailVerification = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) {
//       return res.status(400).json({ message: "Please provide email and OTP" });
//     }

//     const tempUser = tempUsersRepository.getTempUserByEmail(email);
//     if (!tempUser || tempUser.OTP !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     const { firstName, lastName, password, phoneNumber } = tempUser;

//     const newUser = await UserRepository.createUser({
//       firstName,
//       lastName,
//       email,
//       password,
//       phoneNumber,
//     });

//     tempUsersRepository.deleteTempUser(email);

//     const token = createToken({ userId: newUser._id, email: newUser.email });

//     return res.status(201).json({
//       message: "User successfully created",
//       token: token,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

const loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
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

const resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserRepository.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = createTokenForPassword({
      userId: user._id,
      email: user.email,
    });

    const resetLink = `${process.env.CLIENT_URL}/change-password?token=${resetToken}`;
    sendMail(
      user.email,
      "Password reset Email",
      `This is your link for changing your password: ${resetLink}`
    );

    return res.status(200).json({
      message:
        "Password reset link is successfully sent to your email. Please check your email.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { token } = req.query; // Correct way to retrieve token from query params
    const { newPassword } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Token is expired or not provided" });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        message:
          "New password is required and should be at least 6 characters long",
      });
    }

    // Verify the token
    const decoded = authenticateToken(token);
    if (!decoded) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.userId;

    // Find the user using the token information
    const user = await UserRepository.getUserById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid token or user not found" });
    }

    // Hash the new password and update it
    const hashedNewPassword = await hashPassword(newPassword);
    await UserRepository.updatePassword(userId, hashedNewPassword);

    return res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error or invalid token" });
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
  resetPasswordToken,
  //emailVerification,
  logout,
};
