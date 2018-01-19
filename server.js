console.log('A');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
console.log('B');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var assert = require('assert');
console.log('C');
var mongoUrl = "mongodb://localhost:27017/users";
var bcrypt = require('bcrypt');
//var db = require('./config/db');
//var Server = require("mongo-sync").Server;
//var mServer = new Server('localhost:27017');
console.log('D');
mongoose.connect(mongoUrl);
var motiverseUser = new Schema({
name: String,
email: String,
passwordHash: String,
score: Number,
uid: Number
});

var motiverseTask = new Schema({
title: String,
pointVal: Number,
due: Date,
taskID: Number
});
//var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
const saltRounds = 10;
var MotiverseUser = mongoose.model('User', motiverseUser);



function createUser(uname, passHash, email){
var newUser = new User;
//newUser.set(name: uName, passHash: passHash, email: email);
}

function addPoints(pts, username){
  MotiverseUser.findOneAndUpdate({name: username}, {$inc: {score: pts}}, function(err, user){
    if (err) return handleError(err);
	console.log(typeof user);
	console.log(user);
	var p = user.score;
	console.log('New Points: ' + p);
	
  });
}

var addUser = function(user, passHash, mail){
  var newUser = new MotiverseUser({name: 'testUser', email: mail, passwordHash: passHash, score: 0, uid: 0});
  newUser.save(function(err){
    if(err)
      return handleError(err);
  });
 };
  
  
  

//passport.use(new LocalStrategy(
  //function(username, password, done) {
   // User.findOne({ username: username }, function (err, user) {
     // if (err) { return done(err); }
     // if (!user) { return done(null, false); }
      //if (!user.verifyPassword(password)) { return done(null, false); }
     // return done(null, user);
   // });
 // }
// ));


//var serviceAccount = require("/motiverse-4490e-firebase-adminsdk-3zmsk-3c22d3d7ec.json");



app.use(express.static('resource'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/signup', function(req, res){
  res.sendFile(__dirname + '/signup.html');
});

app.get('/dashboard', function(req, res){
  //mServer.db('users').collection
  res.sendFile(__dirname + '/dash.html');
});

app.post('/dashboard', function(req, res){
console.log("Adding points...");
addPoints(1, 'testUser');
res.sendFile(__dirname + '/dash.html');
});

//app.post('/signup', function(req, res){
  //if (!req.body) return res.sendStatus(400)
  //var uname = req.body.userinput;
  //var email = req.body.emailinput;
  //var salt = bcrypt.genSaltSync(saltRounds);
  //var hash = bcrypt.hashSync(req.body.passinput, salt);
 //MongoClient.connect(url, function(err, db){
   //var coll = users.collection("users");
   //var oldU = coll.findOne({username: user}, function(err, result){
   // if(err) throw err;
   // return result.username;
   //});
  //});
//});


io.on('connection', function(socket){
  
  socket.on('logon', function(usernamepassword){
  
  
    });
	
    socket.on('signup', function(userinfo){
      var salt = bcrypt.genSaltSync(saltRounds);
	  var hash = bcrypt.hashSync(userinfo.pass, salt);
	  addUser(userinfo.user, hash, userinfo.mail);
    });
  
    socket.on('ptsTest', function(test){
	    
	    //mServer.db("users").collection("users").find({name:"test"}).update({points: test.pts});
		//console.log("Point total updated to " + test.pts);
	 
	});
  });




http.listen(3000, function(){
  console.log('listening on *:3000');
});