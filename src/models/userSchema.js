const mongoose = require('mongoose');
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName:{ type:String, required:true},
    lastName:{ type:String, required:true},
    userName:{ type:String, required:true},
    email:{ type:String, required:true}, 
    password:{ type:String, required:true},
    isVerified: { type:Boolean, default:false },
    VerificationToken: {type:String},
});


const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
        userName: Joi.string().required().label("UserName"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

const users = mongoose.model(
    'users', userSchema, 'Users');;
module.exports = { users, validate };