const { comparePassword } = require("../../../helpers/password/passwordHelper");
const { createToken } = require("../../../helpers/token/tokenHelper");
const userRepository = require("../../../repositories/Users/userRepository");
const UserRepository = new userRepository();
const loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await UserRepository.Email(email);
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

module.exports = loginPost;
