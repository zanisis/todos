const mongoose = require('mongoose');
var Schema = mongoose.Schema,

const todoSchema = new Schema({
  tittle: {type: String, required: true}
  task : {type : String, required : true},
  status : {type : Boolean, default: false},
});

let Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;