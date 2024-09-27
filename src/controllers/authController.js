const { login } = require('../services/userService');

const authLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Ensure email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Attempt login and generate token
    const token = await login(email, password);
    
    // Return the token to the client
    return res.status(200).json({ token });
    
  } catch (error) {
    // Handle any errors
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { authLogin };
