import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
  tittle: {type:String, required:true}, // String is shorthand for {type: String}
  description: {type:String, required:true},
  tag: {type:String, default:'Genarel'},
  
  timestamp: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model('nots', NotesSchema);