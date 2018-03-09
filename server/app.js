var express = require('express'),
	app = express(),
	cors = require('cors'),
	bodyParser = require('body-parser');
	jwt = require('jsonwebtoken');

var corsOptions = {
	origin: 'http://localhost:4200',
	optionsSuccessStatus: 200
}

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
	Post.find({}, function(err, posts){
		res.send(posts);
	});
});


app.post('/addpost', function(req, res) {
	Post.findOne({id: req.body.id}, function(err, data) {
	    if (data) {
	        console.log('Post already exists');
	    } else {
	    	Post.count({}, function(err, num) {
	    		req.body.id = num + 1;
	    		var mongoPost = new Post(req.body);
		        mongoPost.save(function(err){
					if(!err){
						console.log('Post saved succussfully')
						res.send({'flg': 'success'});
					}else{
						console.log(err);
						res.send({'flg': 'failed'});
					}
				})
	    	})
	    }
	})
});


app.post('/delete/:id', function(req, res){
	var id = +req.params.id;
	Post.findOneAndRemove({id: id}, function(err, post) {
	  	if (err) {
            res.send({'flg' : 'success'});
        } else {
            res.send({'flg' : 'failed'});
        }
	})
})


app.get('/posts/:id', function(req, res) {
    var id = +req.params.id;
	Post.findOne({id: id}, function(err, post) {
        if (err) {
            console.log(err);
        } else {
            res.send(post);
        }
    });
});


app.post('/addcomments/:id', function(req, res) {
	var id = +req.params.id;
	Post.findOne({id:id}, function(err, post){
		if(req.body.content){
			post.comments.push(req.body.content);
			post.save(function(err){
				if(!err){
					console.log('comment saved succussfully')
				}else{
					console.log(err);
				}
			})
		}
	})
});


app.post('/addlikes', function(req, res) {
	var postId = +req.body.postId;
	var username = req.body.username;
	
	Post.findOne({id : postId}, function(err, post){
		var index = post.likedUsers.indexOf(username);
		// console.log(post.likedUsers);
		if( index === -1){
			post.likedUsers.push(username);
		}else{
			post.likedUsers.splice(index, 1);
		}

		post.save(function(err){
			if(!err){
				console.log('likes saved succussfully');
				res.send({'flg' : 'success'});
			}else{
				console.log(err);
				res.send({'flg' : 'failed'});
			}
		})
	})
	// res.send(posts);
});


app.post('/editPost', function(req, res){
	var post = req.body;
	Post.findOneAndUpdate({id : post.id}, post, function(err, data){
    	if (err) return res.send(500, { error: err });
    	if (!data) {
    		console.log('Can not find post!');
	        res.send({'flg': 'failed'});
	    } else {
	        console.log('Update post!');
	        res.send({'flg': 'success'});
	    }
	});
})


app.listen(2000, function() {
	console.log('Server running @ localhost:2000');
});