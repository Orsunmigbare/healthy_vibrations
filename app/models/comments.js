var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comments_schema = new Schema({
    user: schema.Types.ObjectId,
    comment: String,
    date: Date,
    replies: []
})

var comments = mongoose.model('comments', comments_schema);

module.exports = comments;