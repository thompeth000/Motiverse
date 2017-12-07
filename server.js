const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var mongo = require('mongodb');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/users";
var db;

MongoClient.connect(url, function(err, database) {
   assert.equal(null, err);
  console.log("Connected correctly to server");
  db = database
 
});

var addUser = function(user, pass, email, db, callback){

  var collection = db.collection('documents');
  
  collection.insertOne({username: user, password: pass, email: email});

  });

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));


//var serviceAccount = require("/motiverse-4490e-firebase-adminsdk-3zmsk-3c22d3d7ec.json");



app.use(express.static('resource'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/signup', function(req, res){
  res.sendFile(__dirname + '/signup.html');
});

app.post('/signup', function(req, res){

});

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
      
	  
  });
  });


http.listen(3000, function(){
  console.log('listening on *:3000');
});