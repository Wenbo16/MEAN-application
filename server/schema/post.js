var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
	"id" : {
		type: Number,
		required:true
	},
	"title" : String,
	"description" : String,
	"author" : String,
	"postTime" : String,
	"comments" : [{ content: String, username: String, date: Date}],
	"likedUsers": [{ type: String }]
});

var Post = mongoose.model('post', PostSchema);
module.exports = Post;