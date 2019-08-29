var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var article_schema = new Schema({
        title: String,
        writer: Schema.Types.ObjectId,
        creation_date: Date,
        // category: Schema.Types.ObjectId,
        // sub_category: Schema.Types.ObjectId,
        category: String,
        sub_category: String,
        date: Number,
        paragraphs: [],
        tags: [],
        landing_image: String,
        images: [],
        views: { type: Number, default: 0 }
})

var article = mongoose.model('article', article_schema);

module.exports = article;