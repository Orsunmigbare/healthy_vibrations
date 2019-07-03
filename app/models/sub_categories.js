var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subcategory_schema = new Schema({
    name: String,
    category: schema.Types.ObjectId
})

var sub_category = mongoose.model('sub_category', subcategory_schema);

module.exports = sub_category;