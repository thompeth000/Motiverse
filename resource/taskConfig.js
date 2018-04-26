var socket = io();

window.onload = function(){
}

function confirmTask(id){
due = Date.parse(document.getElementById('dueDate').value) + 86400000;
socket.emit('addTask', {'taskID': id, 'dueDate': due});
setTimeout(openDash, 400);
}

function openDash(){
window.open('/dashboard', '_self');
}

function getCurrentDate(){
var d = new Date();
return d.getYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
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
