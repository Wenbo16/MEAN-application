var express = require('express'),
	app = express(),
	cors = require('cors'),
	bodyParser = require('body-parser');
	jwt = require('jsonwebtoken');

var corsOptions = {
	origin: 'http://localhost:4200',
	optionsSuccessStatus: 200
}


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


app.use(bodyParser.json());
app.use(cors(corsOptions));


app.post('/authenticate', function(req, res) {
	if (req.body.username && req.body.password) {
		var token = jwt.sign({ 'uname': req.body.username }, 'secret-key', {
		 	expiresIn: '1h'
		});
		res.send({ 'token': token, 'username':req.body.username });
	} else {
		res.send({ 'token': null });
	}
});

app.use(function(req, res, next) {
	var token = req.headers.authorization;
	if(token) {
		jwt.verify(token, 'secret-key', function (err, decoded) {
		  	if (err) {
				console.log('Error');
		  	} else {
				req.decoded = decoded;
				console.log(req.decoded);
				next();
		  	}
		});
	} else {

	}
});


app.get('/posts', function(req, res) {
	res.send(posts);
});


app.post('/addpost', function(req, res) {
	req.body.id = posts[posts.length-1].id + 1;
	posts.push(req.body);
	res.send(posts);
});

app.post('/delete/:id', function(req, res){
	var id = +req.params.id;
	console.log(typeof id);
	posts = posts.filter(item => item.id !== id);
	res.send(posts);
})


app.get('/posts/:id', function(req, res) {
    var id = +req.params.id;
    var found = posts.find(function(element) {
		return element.id === id;
	});
	res.send(found);
});


app.post('/addcomments/:id', function(req, res) {
	var id = req.params.id;
    var foundPost = posts.find(function(element) {
		return element.id === +id;
	});
	console.log(req.body.content);
	if(req.body.content) foundPost.comments.push(req.body.content);
});


app.post('/addlikes', function(req, res) {
	var postId = req.body.postId;
	var username = req.body.username;
	var foundPost = posts.find(function(element) {
		return element.id === postId;
	});

	if(foundPost.likedUsers.indexOf(username) === -1){
		foundPost.likedUsers.push(username);
	}
	res.send(posts);
});


app.post('/editPost', function(req, res){
	var post = req.body;
	console.log(post)
})


app.listen(2000, function() {
	console.log('Server running @ localhost:2000');
});