var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users_schema = new Schema({
    first_name: String,
    last_name: String,
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    writer: Boolean,
    image: String,
    password: String
})

var users = mongoose.model('users', users_schema);

module.exports = users;