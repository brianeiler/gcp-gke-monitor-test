


var loadButton = null;


var loaded = function()
{
	loadButton = document.getElementById("loadButton");	

	loadButton.onclick = function(){
 	loadJSON(function(json) {
  			console.log(json); // this will log out the json object
		});
	};
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

var myFunc = function() 
{
  myButton.style.background='#FF0000';
}

var myFunc2= function(){window.open( "http://www.google.com" )}