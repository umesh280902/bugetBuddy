const { hashPassword } = require("../../../helpers/password/passwordHelper");
const { authenticateToken } = require("../../../helpers/token/tokenHelper");
const userRepository = require("../../../repositories/Users/userRepository");
const UserRepository = new userRepository();
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
    const user = await UserRepository.UserById(userId);
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

module.exports = changePassword;
