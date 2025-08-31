const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let taskSchema = new Schema({
    title:{
      type: String,
      required:[true, 'This is a required field'],
      max:100,
      unique:true,
      trim:true,
      lowecase:true
    },
    description:{
      type: String,
      required:false,
      max:1500,
      unique:false,
      trim:true,
      lowercase:true
    },
    completed:{
      type: Boolean,
      default:false
    }
}, {
  collection:'tasks',
  timestamps: true
});

module.exports = mongoose.model("task", taskSchema);