const mongoose = require('mongoose');
// var findOrCreate = require('mongoose-findorcreate')
var Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    picture: {type: String},
    facebook_id: {type: String, required: true},
    facebook_token: {type: String, required: true},
    todos : [{type: Schema.Types.ObjectId, ref: 'Todo'}]
})

// userSchema.plugin(findOrCreate)
let User = mongoose.model('User', userSchema)

module.exports = User;