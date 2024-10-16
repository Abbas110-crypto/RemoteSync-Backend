const { users } = require('../models/userSchema');
const {login,register,verification} = require('../services/userService');

const authRegister =async(req,res) =>{
  const {firstName,lastName,username,email,password,confirm} = req.body;
  try{
    if (!firstName || !lastName || !username || !email || !password || !confirm) {
       resStatus(res,400,{message:"Empty fields"});
    }else{
    const token = await register(firstName,lastName,username,email,password,confirm);
    resStatus(res,201,{ token });
    }
  }catch(error){
    if(error.message === "User with given email already Exist!"){
      res.status(res,209,{message:"User with given email already Exist!"});
    }else{
      res.status(res,400,{ message: error.message });
    }
  }
}



const authLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Empty fields" });
    }

    const token = await login(email, password);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    if (error.message === "Invalid Email" || error.message === "Invalid Password") {
      return res.status(401).json({ success: false, message: error.message });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};



const authVerification = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Email Not Exist in Database" });
    }
    if (user.isVerified){
      return res.status(201).json({success:true, message: "Email is Verified "})
    }

    const Verification = await verification(email);
    return res.status(200).json({ success: true, Verification });
  } catch (error) {
    if (error.message === "Invalid Email" ) {
      return res.status(401).json({ success: false, message: error.message });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};

const tokenverification = async (req, res) => {
  const { token } = req.params;

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'HELLOWELCOME');
    const email = decoded.email;

    // Find the user by email
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    // Update the user to mark as verified
    user.isVerified = true; // Change the user's `isVerified` status
    user.VerificationToken = null; // Clear the token
    await user.save(); // Save the updated user instance

    res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(400).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports = {authLogin,authRegister, authVerification, tokenverification};