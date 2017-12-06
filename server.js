const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});


//var serviceAccount = require("/motiverse-4490e-firebase-adminsdk-3zmsk-3c22d3d7ec.json");



app.use(express.static('resource'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/signup', function(req, res){
  res.sendFile(__dirname + '/signup.html');
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
      /*admin.auth().createUser({
        email: userinfo.mail,
        password: userinfo.pass,
        displayName: userinfo.username,
        emailVerified: false,
        disabled: false
      })
	  console.log('Check Firebase to see if user was successfully created');
    });
	*/
  });
  });


http.listen(3000, function(){
  console.log('listening on *:3000');
});