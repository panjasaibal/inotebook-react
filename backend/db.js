const mongoose= require('mongoose');


const mongoUrl = "mongodb://127.0.0.1:27017/inotebook"

const connectToMongo = ()=>{
    mongoose.connect(mongoUrl).then(()=>{console.log("Connect succesfully")})
}

module.exports = connectToMongo;