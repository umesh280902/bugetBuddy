const logout = (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = logout;
