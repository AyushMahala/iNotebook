const mongoose = require('mongoose');
const  mongoURI = "mongodb+srv://Ayush:15122001@inotebook.k3hebpc.mongodb.net/iNotebook?retryWrites=true&w=majority"

const connectToMongo = async()=>{

    await mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Successfully");
    })
};
mongoose.set('strictQuery',false);
module.exports = connectToMongo;