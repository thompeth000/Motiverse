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
 document.getElementById('task1').innerHTML = ('Task 1: ' + data.tasks[1]);
 document.getElementById('task2').innerHTML = ('Task 2: ' + data.tasks[2]);
 document.getElementById('task3').innerHTML = ('Task 3: ' + data.tasks[3]);
 document.getElementById('task4').innerHTML = ('Task 4: ' + data.tasks[4]);
});
}
	  
function execTask(id){
 socket.emit('completeTask', {'taskID': id});
 refreshUserData();
 }
	  
