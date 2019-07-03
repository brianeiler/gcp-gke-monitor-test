#!/usr/bin/env node

"use strict";

var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');


// --------------------------------------------------------------------------------------
// SECTION: Initialization
// This code sets configuration values and retrieves the server state from a JSON file
// --------------------------------------------------------------------------------------
//
var dataFilePath = './scripts/data.json'
var JSONData = require( dataFilePath);    // Reads the JSON data file to get current server state
const PORT = 8080;
const HOST = '0.0.0.0';



// --------------------------------------------------------------------------------------
// SECTION: Routes for Express
// This code sets up the Express web engine and its endpoints (called routes)
// --------------------------------------------------------------------------------------
//
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var server = http.createServer(app);

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Store all client-side JS, CSS, and user-readable data files in the scripts folder.
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use('/', router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// --------------------------------------------------------------------------------------
// SECTION: Endpoint Handlers
// This code handles button click events and launches the appropriate functions
// --------------------------------------------------------------------------------------
//
app.post('/CPU_On', function(req, res) {
  console.log(req.body);		// <--- Is this just for debug? If so, we can comment it out to keep logs clean
  var isRunning = req.body.isRunning;
  // console.log(isRunning);
  JSONData.isRunning = isRunning;
  fs.writeFile(dataFilePath, JSON.stringify(JSONData, null, 2), errorHandler);
  res.sendStatus(200);
});



// --------------------------------------------------------------------------------------
// SECTION: Function calls
// Code to perform the core mechanics of the application
// --------------------------------------------------------------------------------------
//
var DoWhileRunning = function() {
	while(running)
	{
		//TODO create a break case
	}

	//tempCode
	setTimeout(1000, StopRunning)
}

//Begin the running process
var StartRunning = function() {
	data.isRunning = true;
	JSON.stringify(data);
	// sendJSON(data)
	// writeToFile(data);
}

var StopRunning = function() {
	toggle.checked = false;
	btnCpuStart.disabled = false;
	data.isRunning = false;
	JSON.stringify(data);
	// sendJSON(data)
	// writeToFile(data)
}



// --------------------------------------------------------------------------------------
// SECTION: Error Handling
// This code (hopefully) catches all the errors and exceptions raised in the app
// --------------------------------------------------------------------------------------
//
var errorHandler = function() {
	//TODO
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



// --------------------------------------------------------------------------------------
// SECTION: Code Graveyard
// All code below this point is not called and should be disposable
// --------------------------------------------------------------------------------------
//

// function getJson(req, res, next){
//     res.send(data);
// }
