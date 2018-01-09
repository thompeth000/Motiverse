const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var mongo = require('mongodb');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoUrl = "mongodb://localhost:27017/users";
var bcrypt = require('bcrypt');
var Server = require("mongo-sync").Server;
var mServer = new Server('localhost:27017');

//var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
const saltRounds = 10;
var users;

MongoClient.connect(mongoUrl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected to internal MongoDB server");
  db.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  db.close();
});

function createUser(uname, passHash, email){
return new Promise
}

function addPoints(pts, user){
  mServer.db("users").getCollection("users").save
}

var addUser = function(user, passHash, email){
  console.log(users);
  var coll = users.collection('users');
  var oldUser;
  coll.findOne({username: user}, function(err, result){
  if(err) throw err;
  oldUser = result.username;
  })
  
  if(!(oldUser === user)){
  coll.insertOne({username: user, password: passHash, email: email});
  }
  else{
  
  }

  }
  
  

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
  mServer.db('users').collection
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
  
    /*admin.auth().getUserByEmail(usernamepassword.user)
	.then(function(userRecord){
	console.log("Successfully fetched user data:", userRecord.toJSON());
	  if(userRecord.password === usernamepassword.pass){
        console.log("Login attempt successful!");
	    console.log(userRecord.password);
	    console.log(userRecord.uid);
	    console.log(userRecord.displayName);
		
		admin.auth().createCustomToken(userRecord.uid)
	      .then(function(authToken){
		    res.send("User is now logged in as " + userRecord.displayName);
		    socket.emit("userToken", authToken);
		  });
	    }
		
	  });
	  */
  
    });
	
    socket.on('signup', function(userinfo){
      var salt = bcrypt.genSaltSync(saltRounds);
	  var hash = bcrypt.hashSync(userinfo.pass, salt);
	  addUser(userinfo.user, hash, userinfo.mail);
    });
  
    socket.on('ptsTest', function(test){
	  MongoClient.connect(mongoUrl, function(err, db){
	    db.collection("users").updateOne({name: "test"}, {points = test.pts}, function(err, res){
		console.log("Point total updated to " + test.pts);
	  });
	});
  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});