const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
    mongoose.connect(
        mongoURI,
        (err) => {
         if(err) console.log(err) 
         else console.log("mongdb is connected");
        }
      );
    // mongoose.connect(mongoURI, () => {
    //     console.log("connected to mongo successfully")
    // });
}

module.exports = connectToMongo;