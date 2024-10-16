const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users, validate } = require('../models/userSchema');
const { sendEmail } = require('./Emailservice'); 


const JWT = process.env.JWT_SECRET;

const register = async(firstName,lastName,userName,email,password)=>{
    try{
        console.log(firstName+lastName+userName+email+password)
        
        const userExist = await users.findOne({email})
        if(userExist){
            throw new Error('User with given email already Exist!');
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const confirmPassword = await bcrypt.hash(password,10);

        const newUser = new users({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
            confirm: confirmPassword
        });
        await newUser.save();
        console.log("User successfully registered ");
        const token = jwt.sign({ id: newUser._id}, 'HELLOWELCOME' , { expiresIn: '1h' });
        console.log(token);
        return token;
    }catch(error){
        throw new Error(error.message || 'Error Occured');
    }
}

const login = async(email,password)=>{
    try{
        let user = await users.findOne({email});
        if (!user) {
            throw new Error('Invalid Email');
        }
        const validPassword = await bcrypt.compare(password, user.password);  
        if(!validPassword){
            throw new Error('Invalid Password');
        }
    if (!user.verified) {
        throw new Error('Please verify your email to log in.');
    }
        const token = jwt.sign({id: user._id }, 'JWT_SECRET', { expiresIn: '1h' });
        return token;
    }catch(error){
        throw new Error(error.message || 'Error occurred during login.');
    }
}
const verification = async (email) => {
    try {
      const VerificationToken = jwt.sign({ email }, 'HELLOWELCOME', { expiresIn: '1h' });
      
      const user = await users.findOne({ email }); // Assuming 'users' is your user model
      
      if (!user) throw new Error('User not found');
      
      user.verificationToken = VerificationToken;
      await user.save(); // Save the user document
      
      const verificationUrl = `http://localhost:5173/verify-email/${VerificationToken}`;
      
      await sendEmail(email, 'Email Verification', VerificationToken);
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports = {login,register,verification};