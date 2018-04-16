var socket = io();

window.onload = function(){
    
}

function confirmTask(id){
socket.emit('addTask', {'taskID': id});
window.open('/dashboard', '_self');
}

function toggleRepeating(){
if(document.getElementById('isRepeating').value === 'off'){
  document.getElementById('taskFreq').style.visibility = 'visible';
  document.getElementById('freqText').style.visibility = 'visible';
  document.getElementById('isRepeating').value = 'on';
  console.log('hi!');
}
else{
  document.getElementById('taskFreq').style.visibility = 'hidden';
  document.getElementById('freqText').style.visibility = 'hidden';
  document.getElementById('isRepeating').value = 'off';
  }
}
