//Init needed vars
var loadButton = null;
var data = null;
var running = false;

var loaded = function()
{
	//Grab our loaded vars
	loadButton = document.getElementById("loadButton");	
	toggle = document.getElementById("onOffToggle");	
	
	//If our JSON isn't yet loaded, load it
	if(data == null)
	{
	 	loadJSON(function(json) {
	  			console.log(json); // this will log out the json object
	  			data = json;
	  			console.log(data.isRunning)

		});
	};

	//Add funcitonality to the generate load button
	loadButton.onclick = function(){
	  	running = data.isRunning;		
	  	if(data.isRunning)
	  	{
			//Do things because we're already running
			DoWhileRunning();
			toggle.checked = true;
			loadButton.disabled = true;
		}
		else
		{
			//Launch things
			StartRunning();
			toggle.checked = true;
			loadButton.disabled = true;
		}
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
	while(running)
	{
		//TODO create a break case
	}
}

//Begin the running process
var StartRunning = function()
{

}

var StopRunning = function()
{
	
}