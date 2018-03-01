var socket = io();
	
function testPoints(){
 console.log('Doing stuff...');
 socket.emit('ptsTest', {'points': 1});
 refreshUserData();
}
	  
function refreshUserData(){
 socket.emit('userQuery', {'username': 'testUser'});
 socket.on('getUser', function(data){
 document.getElementById('points').innerHTML = ('Points: ' + data.pts);
});
}
	  
function execTask(id){
 socket.emit('completeTask', {'taskID': id});
 refreshUserData();
 }
	  
