
var btnCpuStart = null;
var data = null;
var running = false;


// --------------------------------------------------------------------------------------
// SECTION: Initialization
// This code retrieves the server's state and sets the form values accordingly
// --------------------------------------------------------------------------------------
//
var loaded = function() {
	//Grab our loaded vars
	btnCpuStart = document.getElementById("btnCpuStart");
	btnCpuStop = document.getElementById("btnCpuStop");
	inputCpuPercent = document.getElementById("inputCpuPercent");
	btnIncreaseUsers = document.getElementById("btnIncreaseUsers");
	btnDecreaseUsers = document.getElementById("btnDecreaseUsers");
	lblUserCount = document.getElementById("lblUserCount");
	inputLogEntrySeverity = document.getElementById("inputLogEntrySeverity");
	btnGenerateLog = document.getElementById("btnGenerateLog");
	
	
	
	//If our JSON isn't yet loaded, load it
	if(data == null)
		{
	 	loadJSON(function(json) {
	  			console.log(json); // this will log out the json object
	  			data = json;
	  			console.log(data.CpuIsRunning)
	  			running = (data.CpuIsRunning == "true" || data.CpuIsRunning == true) ? true : false ;

	  			console.log(running);
		if(running)
		  	{
			btnCpuStart.disabled = true;
			DoWhileRunning();
			}
	else
		{
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


// --------------------------------------------------------------------------------------
// SECTION: UI Handlers
// This code handles on click events and calls the server-side functions
// --------------------------------------------------------------------------------------
//

var assignLoadButton = function() {
	running = (data.CpuIsRunning == "true" || data.CpuIsRunning == true) ? true : false ;
	btnCpuStart.onclick = function() {
		btnCpuStart.disabled = true;
		btnCpuStop.disabled = false;
		console.log(inputCpuPercent.value);
		data.CpuIsRunning = true;			// <--- How is this used? Client can't write.
		JSON.stringify(data);
		PostFunction(data);
	}
}

<script>
	$('button').click(function() {
		$.post('/CPU_On', myData, function (data) {
		console.log(data);
	});
	}, 'json');
</script>

var PostFunction = function(myData)
{
	const url = "http://localhost:8080/CPU_On";
	$.post(url, myData, function(dataBack, status){
		console.log(dataBack)
	}, 'json');
}

// 	btnCpuStart.onclick = function() {
// 		btnCpuStart.disabled = true;
// 		btnCpuStop.disabled = false;
// 		console.log(inputCpuPercent.value);
// 		data.CpuIsRunning = true;			// <--- How is this used? Client can't write.
// 		// TODO: Must get the value from 
// 		JSON.stringify(data);
// 		PostFunction(data);
// 	}

var PostFunction = function(myData)
{
	const url = "http://localhost:8080/CPU_On";
	$.post(url, myData, function(dataBack, status){
		console.log(dataBack)
	}, 'json');
}


// --------------------------------------------------------------------------------------
// SECTION: Code Graveyard
// All code below this point is not called and should be disposable
// --------------------------------------------------------------------------------------
//
// 	var assignLoadButton = function() {
// 		running = (data.CpuIsRunning == "true" || data.CpuIsRunning == true) ? true : false ;
// 		btnCpuStart.onclick = function() {
// 			if(!running && data != null) {
// 				StartRunning();
// 				toggle.checked = true;
// 				btnCpuStart.disabled = true;
// 			}
// 		}
// 	}
// 
// 	var StartRunning = function() {
// 		btnCpuStart.disabled = true;
// 		btnCpuStop.disabled = false;
// 		data.CpuIsRunning = true;			// <--- How is this used? Client can't write.
// 		// TODO: Must get the value from 
// 		JSON.stringify(data);
// 		PostFunction(data);
// 	}
// 
// 	var StopRunning = function() {
// 		btnCpuStart.disabled = false;
// 		btnCpuStop.disabled = true;
// 		data.CpuIsRunning = false;
// 		JSON.stringify(data);
// 		PostFunction(data);
// 		assignLoadButton();		// <--- Why is this running again?
// 	}
