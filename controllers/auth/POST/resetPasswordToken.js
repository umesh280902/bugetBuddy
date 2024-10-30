const sendMail = require("../../../helpers/mail/sendMail");
const { createTokenForPassword } = require("../../../helpers/token/tokenHelper");
const userRepository = require("../../../repositories/Users/userRepository");
const UserRepository = new userRepository();
const resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserRepository.Email(email);

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

module.exports = resetPasswordToken;
