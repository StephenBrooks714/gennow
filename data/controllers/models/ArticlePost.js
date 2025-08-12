const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ArticlePostSchema = new Schema ({
    title: String,
    category: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    editordata: String,
    image: String,
    image2: String,
    datePosted:{
        type: Date,
        default: new Date()
    },
})

const ArticlePost = mongoose.model('ArticlePost', ArticlePostSchema);
module.exports = ArticlePost;