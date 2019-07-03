
var btnCpuStart = null;
var data = null;
var running = false;

var loaded = function() {
	//Grab our loaded vars
	btnCpuStart = document.getElementById("btnCpuStart");
	btnCpuStop = document.getElementById("btnCpuStop");
	
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
			btnCpuStart.disabled = true;
			DoWhileRunning();
			}
	else
		{
		toggle.checked = false;
		btnCpuStart.disabled = false;
		//Add funcitonality to the generate load button
		assignLoadButton();
		}
		});
	}
}


function loadJSON(callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './scripts/data.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);  
}


// TODO: While running, check to see if we have stopped running
// var DoWhileRunning = function()
// {
// 	tempCode
// 	setTimeout(StopRunning, 1000);
// }


//Begin the running process
var StartRunning = function()
{
	data.isRunning = true;
	JSON.stringify(data);
	PostFunction(data);
	// DoWhileRunning();
}

var StopRunning = function()
{
	btnCpuStart.disabled = false;
	btnCpuStop.disabled = true;
	data.isRunning = false;
	JSON.stringify(data);
	PostFunction(data);
	assignLoadButton();		// <--- Why is this running again?
}

var assignLoadButton = function() 
{
	running = (data.isRunning == "true" || data.isRunning == true) ? true : false ;
	btnCpuStart.onclick = function(){
	  			
		if(!running && data != null)
		{
			//Launch things
			StartRunning();
			toggle.checked = true;
			btnCpuStart.disabled = true;
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