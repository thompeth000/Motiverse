var socket = io();

window.onload = function(){
    
}

function confirmTask(id){
socket.emit('addTask', {'taskID': id});
window.open('/dashboard', '_self');
}
