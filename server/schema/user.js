var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	"username" : {
		type: String,
		required:true
	},
	"password" : String,
	"firstname" : String,
	"lastname" : String,
	"email" : String,
	"phone" : String,
	"location" : String,
	"likes" : [{ type: Number }]
});

var User = mongoose.model('users', UserSchema);
module.exports = User;