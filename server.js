const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var admin = require("firebase-admin");

//var serviceAccount = require("/motiverse-4490e-firebase-adminsdk-3zmsk-3c22d3d7ec.json");

admin.initializeApp({
  credential: admin.credential.cert({
  type: "service_account",
  project_id: "motiverse-4490e",
  private_key_id: "3c22d3d7ec93c50ef4cd1142cf9535ec84c775f4",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJIQKQQ+br4GLJ\nUtuB4RUHZTjD8yk7axqVLPgD/n9ozIvd1+pJJF4TLslmjD4n+IeI0l3JLCDDnedF\nw2CtfXDvYkBbRLcM/Cs+vkXBefFuP91+1Kxh8BJ0f42jF9L8r+L5HToRqMx08jsS\n9DijLy+fRWumrSxAnaxlXZQEe4s4/610YsvgScqWi9rnM8PyRffn/J4eaY81CuoT\nf0bZyRRceKoNJ5A3ehD8BILCHgNeL81RDgrn5PwzBEnT0/0XiXJ4LYXBgRkTf6i2\nnvVl1jc75Xrb8sjpj4VSlimBLPum9AtCLx166suWbuDsnUgcT7coglOcz3KqdJem\nTXIeU8dpAgMBAAECggEAGK/AjMyIz3LfLS7KWoqx9hJqgUKbUPu4a471cigOo2JX\n2Ibj7s5T7a7UcY3NI0LR/+0yLbsI2nnLJTjx6Nl4vykkFQ++GA3rkOvxy+mXxJx6\nJ1MbRXoeCcaOL/KApxs/lKwNsJUzYzdIIO9w9DaadcYjjHW89MFlo5t0y4gOcpRX\nkNOFOL7jF/DvIwGbkrH/c2+laylcsPV1cyCxj92WEOqG8Scpxe23sXfukMT1JXpl\nflk2ueLYoB5b1deXc1OsQblCNkrTwyEs9M3rPyfuNnPucde8ARwoowzYdBNtH/Mx\ngMN8P0fFd1DniPYhyKD1SwlOzR6FpVghvPIoCluZwQKBgQDpEQT9MrSRanXCl62k\nF0Xnicc9tqpBgjJR6E7sOC9hJm6MjhnmPHqoKIy5gNiLyUA1klBTqCNyhDvSWTy8\nvOVQ+gdOuEdImQVOhZTheHn8cHNkI2IiIRmmwy1oYzsTm0cBuETxXXPTZ3AV0Cq+\ndMleFQRzD5BE2gDk3wR0PPRnZQKBgQDc63qjpGnyTbFNhhyjWLj2WmsR5jHgyIvB\nhcIXJQA+A/3mIYxcjCK/Sd5jhSMpmMT641E43nLp9FI05QggDeg/33xFkADYkDdj\nzadrOH5NbpNpqfvHeOSQjPF9fc45aPoB5vCBUWcIgcrDqxj1Y7bJvJcmvng/o/e8\nzQRYgGGptQKBgH9p4oRZWAW3YbGEIlV2s6yk0duXJPSzLLdCfQL+pEhELmOAu//2\nSEfuAyDWo4un9gZTer6BSP+t8tZIGsBDtEnUpnIOpEm3/gKzXHT23Bl5kFvKTDfE\nSLW2Nfi/ZuiNFwCFsIsTP+LuxYPnTbbZOczJSKludLxvQdXdZh31xNdRAoGAOgKX\nhIryyw59pUa3FGmCwCXEAcI5jLX8hMeTzLIJmz8/F4PtsIuXwDUscWOPdSfJabvx\nIwa+lBJ017DgblJYjxUnM7j5j+Rmtw1UjgIaoEiN6uwY0is7kX2BGBvF4Cthosg6\nlSqD7KbwUGsINb+GSvj7k8/mEYgD0I7hOkAT5RUCgYEA0Es5QcVHe4jI+UBiyJEn\niB+Bot+QJ/f26FHyPJbSfEvsNHbuElOapgm3SBwO/eNNIqY3Klxcjot7PdhoRUCt\n13hgMl1mpUJAEZJG8W9PV5m5cm3WyAsoSf4pYAYg/ZZlFzSq99MAe8ohAhzCtoXk\njowiPAGOm/3OiRZo6yaQWbs=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-3zmsk@motiverse-4490e.iam.gserviceaccount.com",
  client_id: "116180109702426025585",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://accounts.google.com/o/oauth2/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3zmsk%40motiverse-4490e.iam.gserviceaccount.com"
}
),
  databaseURL: "https://motiverse-4490e.firebaseio.com"
});

app.use(express.static('resource'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/signup', function(req, res){
  res.sendFile(__dirname + '/signup.html');
});

io.on('connection', function(socket){
  
  socket.on('logon', function(usernamepassword){
  
    admin.auth().getUserByEmail(usernamepassword.user)
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
  
    });
	
    socket.on('signup', function(userinfo){
      admin.auth().createUser({
        email: userinfo.mail,
        password: userinfo.pass,
        displayName: userinfo.username,
        emailVerified: false,
        disabled: false
      })
	  console.log('Check Firebase to see if user was successfully created');
    });
  });


http.listen(3000, function(){
  console.log('listening on *:3000');
});