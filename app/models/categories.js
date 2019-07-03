var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var category_schema = new Schema({
    name: String,
})

var category = mongoose.model('category', category_schema);

module.exports = category;