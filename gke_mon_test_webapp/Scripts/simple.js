


var loadButton = null;


var loaded = function()
{
	loadButton = document.getElementById("loadButton");	

	loadButton.onclick = function(){
 	var data = JSON.parse(data);
	console.log(data);
};
}



var myFunc = function() 
{
  myButton.style.background='#FF0000';
}

var myFunc2= function(){window.open( "http://www.google.com" )}