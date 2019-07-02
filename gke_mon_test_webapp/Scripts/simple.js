var loadButton = null;
var data = null;

var loaded = function()
{
	loadButton = document.getElementById("loadButton");	

	loadButton.onclick = function(){

	if(data == null)
	{
	 	loadJSON(function(json) {
	  			console.log(json); // this will log out the json object
	  			data = json;
	  			console.log(data.isRunning)

	  			if(data.isRunning)
	  			{
	  				//Do things because we're already running
	  				DoWhileRunning();
	  			}
	  			else
	  			{
	  				//Launch things
	  				StartRunning();
	  			}
			});
		};
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

var DoWhileRunning = function()
{

}

var StartRunning = function()
{

}