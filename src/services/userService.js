const jwt = require('jsonwebtoken');
const UsersModel = require('../models/user');


const login = async (email) => {
    const secretkey = process.env.JWT;

  try {
    
    let user = await UsersModel.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }


    const token = jwt.sign({ id: user._id }, secretkey, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw new Error(error.message || 'Error Occurred');
  }
};

module.exports = { login };
