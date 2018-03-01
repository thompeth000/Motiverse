var socket = io();
	var tasks = new Array();
	function searchTasks(){
	  var user;
	  socket.emit('userQuery', {'username': 'testUser'});
	  socket.on('getUser', function(data){
	    user = data;
	  });
	  console.log('Searching!');
	  socket.emit('taskQuery', {'search': document.forms['taskSearch']['searchBox'].value});
	  socket.on('taskQueryRes', function(data){
	    refreshTaskList(data.tasks, user);
	  });
	 }
	 
	 function refreshTaskList(taskList, user){
	 document.write('<!DOCTYPE html>');
	 document.write('<html> <head>');
	 document.write('<link href="search.css" rel="stylesheet" type="text/css">');
	 document.write('<script src="/socket.io/socket.io.js"></script>');
	 document.write('</head> <body>');

	 document.write('<h1 class="text">Search Results</h1>');
	 if(taskList.length === 0){
	   document.write('<p class="text">No tasks found...</p>');
	 }
	 else{
	   for(i = 0; i < taskList.length; i++){
	     console.log('Displaying task...');
	     renderTask(taskList[i], user);
	   }
	 }
	 document.write('<a href="/taskSelect">Back...</a>');
	 document.write('</body>');
	 //document.write('</div> </body> </html>');
	 
	}
	
	
	function requestTask(taskID, user){
	  socket.emit('reqTask', {'task': taskID, 'user': user});
	  socket.on('feedback', function(data){
	    console.log(data.message);
	  });
	  }
	  
	function renderTask(task, user){
		  if(!isTaskSelected(task, user)){
		    document.write('<h2 class="searchResult text">' + task.title + '</h2>');
		    document.write('<button class="button text" onclick="requestTask(' + task._id + ',' + user._id + ')">Add Task</button>');
		    document.write('<p class="text">' + task.val + ' pts</p>');
		    document.write('</br>');
		   }
		}
		
	function isTaskSelected(task, user){
		 /*  for(i = 0; i < user.tasks.length; i++){
		    if(task._id === user.tasks[i]._id)
			  return true;
		   } */
		   console.log('Adding task to search results');
		   return false;
		 }
	  