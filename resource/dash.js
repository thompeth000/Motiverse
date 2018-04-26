var socket = io();
	
function testPoints(){
 console.log('Doing stuff...');
 socket.emit('ptsTest', {'points': 1});
 refreshUserData();
}
	  
function refreshUserData(){
 socket.emit('userQuery', {'username': 'dankMemes'});
 socket.on('getUser', function(data){
 document.getElementById('points').innerHTML = ('Points: ' + data.pts);
 for(i = 0; i < data.tasks.length; i++){
 document.getElementById('task' + (i + 1)).innerHTML = ('Task ' + (i + 1) + ': ' + data.tasks[0].title);
}
});
}
	  
function execTask(id){
 socket.emit('completeTask', {'taskId': id});
 setTimeout(location.reload() , 500);
 }
	  
