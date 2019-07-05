
var loadButton = null;
var data = null;
var running = false;
var loaded = function()
{
	//Grab our loaded vars
	loadButton = document.getElementById("loadButton");	
	
	//If our JSON isn't yet loaded, load it
	if(data == null)
	{
	 	loadJSON(function(json) {
	  			console.log(json); // this will log out the json object
	  			data = json;
	  			console.log(data.isRunning)
	  			running = (data.isRunning == "true" || data.isRunning == true) ? true : false ;

	  			console.log(running);
	if(running)
	  	{
			
			toggle.checked = true;
			loadButton.disabled = true;
			DoWhileRunning();
		}
	else
	{
		toggle.checked = false;
		loadButton.disabled = false;
			//Add funcitonality to the generate load button
	assignLoadButton();
	}

		});
	}

}


function loadJSON(callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './Scripts/data.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);  
}


//TODO: While running, check to see if we have stopped running
var DoWhileRunning = function()
{
	//tempCode
	setTimeout(StopRunning, 1000);
}

//Begin the running process
var StartRunning = function()
{
	data.isRunning = true;
	JSON.stringify(data);
	PostFunction(data);
	DoWhileRunning();
}

var StopRunning = function()
{
	toggle.checked = false;
	loadButton.disabled = false;
	data.isRunning = false;
	JSON.stringify(data);
	PostFunction(data);
	assignLoadButton();

}

var assignLoadButton = function() 
{
	running = (data.isRunning == "true" || data.isRunning == true) ? true : false ;
	loadButton.onclick = function(){
	  			
		if(!running && data != null)
		{
			//Launch things
			StartRunning();
			toggle.checked = true;
			loadButton.disabled = true;
		}
	}
}

var PostFunction = function(myData)
{
	const url = "http://localhost:8080/CPU_On";
	$.post(url, myData, function(dataBack, status){
		console.log(dataBack)
	}, 'json');
}