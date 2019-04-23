var mongoose = require("mongoose");
 
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: false
    },
    note: {
        type: [],
        required: false
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;