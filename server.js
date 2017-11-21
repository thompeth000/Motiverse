const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('resource'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/signup', function(req, res){
  res.sendFile(__dirname + '/signup.html');
});

io.on('connection', function(socket){
  
  socket.on('logon', function(usernamepassword){
  console.log('Login attempt: ' + usernamepassword.user + ' ' + usernamepassword.pass);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});