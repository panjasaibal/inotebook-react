
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
  name: {type:String, required:true}, // String is shorthand for {type: String}
  email: {type:String, required:true, unique:true},
  passwd: {type:String, required:true},
  
  timestamp: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model('users', UsersSchema);