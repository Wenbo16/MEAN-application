var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/marlabs');

var User = require('./schema/user.js');
var Post = require('./schema/post.js');
var db = mongoose.connection;

db.on('error', function() {
	console.log('error');
});

db.on('open', function() {
	console.log('connection established');
});

var posts = [
  	{
  		'id' : 0, 
  		'title': 'This is a test post title', 
  		'description':"I was surprised by the good feedback for JavaScript template engine in just 20 lines and decided to blog for another small utility function which I'm using often. While we are talking about JavaScript in the browser, most of the operations are asynchronous. We are dealing with callbacks all the time and sometimes we end up with awesome callback hell.", 
  		'author' : 'Edward',
  		'postTime' : "2017-2-17 12:19:32",
  		'comments': [
  						{
  							content : 'This is the first commet',
  							username : 'Newton',
  							date : "2017-5-7 19:10:12"
  						},
  						{
  							content : 'This is the Second comment',
  							username : 'Darwin',
  							date : "2017-8-20 07:39:52"
  						}	
  					],
  		'likedUsers':['Sam', 'Nanda', 'Susan']
  	},
  	{
  		'id' : 1, 
  		'title': 'This is another test post title', 
  		'description':"Let's say that we have two functions and we want to call them one after each other. They both operate with same variable. The first one sets its value and the second one uses it.", 
  		'author' : 'John',
  		'postTime' : "2016-7-27 13:28:52",
  		'comments': [ 
  						{
  							content : 'This is the first commet',
  							username : 'Newton',
  							date : "2017-5-7 19:10:12"
  						},
  						{
  							content : 'This is the Second comment',
  							username : 'Darwin',
  							date : "2017-8-20 07:39:52"
  						}	
  					],
  		'likedUsers':['James', 'Jiang', 'Arun', 'Susan']
  	}
];


var users = [
	{
		username: "Johnhaha",
	    password: "123",
	    firstname: "John",
	    lastname: "Smith",
	    email: "123@123.com",
	    phone: "818818818",
	    location: "Marlabs",
	    likes: [1,2]
	},
	{
		username: "Sam",
	    password: "123",
	    firstname: "Sam",
	    lastname: "Bush",
	    email: "1234@1234.com",
	    phone: "818818818",
	    location: "Edison",
	    likes: [0,1]
	}
]

posts.forEach(function(i){
	var mongoPost = new Post(i);
	mongoPost.save(function(err){
		if(!err){
			console.log('Job saved succussfully')
		}else{
			console.log(err);
		}
	})
})


users.forEach(function(i){
	var mongoUser = new User(i);
	mongoUser.save(function(err){
		if(!err){
			console.log('User saved succussfully')
		}else{
			console.log(err);
		}
	})
})
