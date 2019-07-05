
var JSONData = null;
var cpuLoadRunning = false;
var customMetricCreated = false;
var userCount = 0;
var debugMode = false;

var loaded = function() {
	// --------------------------------------------------------------------------------------
	// SECTION: Initialization
	// This code sets configuration values and retrieves the server state from a JSON file.
	// --------------------------------------------------------------------------------------
	//

	// Retrieves the server-side data.json file via HTTP and parses its current values into variables.
	loadJSON(function(JSONData) {
		cpuLoadRunning      = JSONData.CpuLoadRunning;
		customMetricCreated = JSONData.CustomMetricCreated;
		userCount           = JSONData.UserCount;
		debugMode           = JSONData.DebugMode;
	});

	// Set the CPU Load Generator document elements to objects
	var btnStartCPU   = document.getElementById('btnStartCPU');
	var btnStopCPU    = document.getElementById('btnStopCPU');
	var lblCPUStatus  = document.getElementById('lblCPUStatus');	// Maps to the JSON cpuStatus Label for CPU Load Generator
	
	// Set the Custom Metric document elements to objects
	var btnStartMonitoring    = document.getElementById('btnStartMonitoring');
	var btnIncreaseUserCount  = document.getElementById('btnIncreaseUserCount');
	var btnDecreaseUserCount  = document.getElementById('btnDecreaseUserCount');
	var lblCustomMetricStatus = document.getElementById('lblCustomMetricStatus');	// Maps to the JSON customMetricCreated flag
	var lblCurrentUserCount   = document.getElementById('lblCurrentUserCount');		// Maps to the JSON userCount value

	// --------------------------------------------------------------------------------------
	// SECTION: Staging
	// This code sets the document controls and status text based on the variables set above.
	// --------------------------------------------------------------------------------------
	//
	// CPU Load Generator Section
	//
	if (cpuLoadRunning) {
		// CPU Load Generator is running, so disable the START button and set the status to "Running"
		btnStartCPU.disabled   = true;
		btnStopCPU.disabled    = false;
		lblCPUStatus.innerHTML = "CPU load RUNNING";
	}
	else {
		// CPU isn't running yet, so disable the stop button and set the status to "Not Running"
		btnStartCPU.disabled   = false;
		btnStopCPU.disabled    = true;
		lblCPUStatus.innerHTML = "CPU load NOT running";
	}	
	//
	// Custom Metric Section
	//
	if (customMetricCreated) {
		// CPU Load Generator is running, so disable the START button and set the status to "Running"
		btnStartCPU.disabled   = true;
		btnStopCPU.disabled    = false;
		lblCPUStatus.innerHTML = "CPU load RUNNING";
	}
	else {
		// CPU isn't running yet, so disable the stop button and set the status to "Not Running"
		btnStartCPU.disabled   = false;
		btnStopCPU.disabled    = true;
		lblCPUStatus.innerHTML = "CPU load NOT running";
	}	
	
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