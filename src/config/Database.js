const mongoose = require('mongoose');

const connectDatabase = async () => {
 try{
  await mongoose.connect('mongodb+srv://RemoteSync:c70hHaWLJlHf8oCn@cluster0.cmg9t.mongodb.net/RemoteSync?retryWrites=true&w=majority');
  
      console.log("Connection to database successfully");
  }
  catch(error){
    console.error("MongoDB connection error:", error);
  }
}

module.exports = {connectDatabase};
