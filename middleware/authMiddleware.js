const { authenticateToken } = require("../helpers/token/tokenHelper");

const authentication = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const authenticationHeader = req.headers["authorization"];
    const token = authenticationHeader && authenticationHeader.split(' ')[1];

    if (token == null) {
      return res.status(401).json({ message: "Token not provided" });
    }

    // Authenticate the token
    const authorizedToken = await authenticateToken(token);
    if (!authorizedToken) {
      return res.status(401).json({ message: "Invalid token, please login again" });
    }

    // Add the user information to the request object
    req.user = authorizedToken;
    console.log(req.user)
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(`Error occurred: ${error.message}`);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = authentication;
