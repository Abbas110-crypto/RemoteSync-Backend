const mongoose = require('mongoose');

const connectDatabase = async () => {
 try{
  await mongoose.connect(process.env.DATABASE);
      console.log("Connection Successfully");
    }
catch(error){
  console.error("MongoDB connection error:", error);
 }
}

module.exports = {connectDatabase};