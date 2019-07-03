//Init needed vars
// var server = require('server.js');

var btnCpuStart = null;
var data = null;
var running = false;



var loaded = function()
{
	//Grab our loaded vars
	btnCpuStart = document.getElementById("btnCpuStart");	
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
	btnCpuStart.onclick = function(){
	  	running = data.isRunning;		
	  	if(data.isRunning)
	  	{
			//Do things because we're already running
			DoWhileRunning();
			toggle.checked = true;
			btnCpuStart.disabled = true;
		}
		else
		{
			//Launch things
			StartRunning();
			toggle.checked = true;
			btnCpuStart.disabled = true;
		}
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


// async function sendJSON(data) {   
//   var xobj = new XMLHttpRequest();
//   xobj.overrideMimeType("application/json");
//   xobj.open('POST', 'http://${HOST}:${PORT}');
//   xobj.send(data);  

//    return await new Promise((res, rej) => {
//         xhr.onreadystatechange = () => {
//           if(xhr.readyState === 4){
//             if(xhr.status !== 200)
//               return rej(xhr.status);

//             switch(mode){
//               case 0: res(xhr.responseText); break;             // Plain text
//               case 1: res(JSON.parse(xhr.responseText)); break; // JSON
//               case 2: res(new Uint8Array(xhr.response)); break; // Binary
//             }
//           };
//       };
//   });
// }

//TODO: While running, check to see if we have stopped running
var DoWhileRunning = function()
{
	while(running)
	{
		//TODO create a break case
	}

	//tempCode
	setTimeout(1000, StopRunning)
}

//Begin the running process
var StartRunning = function()
{
	data.isRunning = true;
	JSON.stringify(data);
	// sendJSON(data)
	// writeToFile(data);
}

var StopRunning = function()
{
	toggle.checked = false;
	btnCpuStart.disabled = false;
	data.isRunning = false;
	JSON.stringify(data);
	// sendJSON(data)
	// writeToFile(data)
}

// var writeToFile = function()
// {
// 	fs.writeFile(filePath, data, function() {
//         fs.readFile(filePath, 'utf-8', function(err, errdata) {
//             console.log(errdata);
//         });
//     });
// }
