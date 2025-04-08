const userRepository = require("../../../repositories/Users/userRepository");
const UserRepository = new userRepository();
const emailGet = async (req, res) => {
  try {
    const { email} = req.user;

    if (!email ) {
      return res
        .status(400)
        .json({ message: "Please provide email" });
    }

    const user = await UserRepository.Email(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const response={
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        phoneNumber:user.phoneNumber
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = emailGet;
