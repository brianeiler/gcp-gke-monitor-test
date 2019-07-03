#!/usr/bin/env node

"use strict";

var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
require(__dirname+"/backend.js");


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
app.post('/StartCPU', function(req, res) {
	JSONData.CpuIsRunning = true;
	fs.writeFile(dataFilePath, JSON.stringify(JSONData, null, 2), errorHandler);
	res.redirect("/");
	console.log("CPU load started");
});

app.post('/StopCPU', function(req, res) {
	JSONData.CpuIsRunning = false;
	fs.writeFile(dataFilePath, JSON.stringify(JSONData, null, 2), errorHandler);
	res.redirect("/");
	console.log("CPU load stopped");
});

app.post('/IncreaseUsers', function(req, res) {
	var userCount = JSONData.UserCount
	userCount = userCount + 1
	JSONData.UserCount = userCount;
	fs.writeFile(dataFilePath, JSON.stringify(JSONData, null, 2), errorHandler);
	res.redirect("/");
	console.log("User Count now: " & userCount);
});

app.post('/DeceaseUsers', function(req, res) {
	var userCount = JSONData.UserCount
	if (userCount > 0) {
		userCount = userCount - 1
		JSONData.UserCount = userCount;
		fs.writeFile(dataFilePath, JSON.stringify(JSONData, null, 2), errorHandler);
		res.redirect("/");
	}
	else {
		userCount = 0;
	}
	console.log("User Count now: " & userCount);
});

app.post('/SendLogCritical', function(req, res) {
	res.redirect("/");
	console.log("This is a CRITICAL log entry");
});

app.post('/SendLogError', function(req, res) {
	res.redirect("/");
	console.log("This is an ERROR log entry");
});

app.post('/SendLogWarning', function(req, res) {
	res.redirect("/");
	console.log("This is a WARNING log entry");
});

app.post('/SendLogInformational', function(req, res) {
	res.redirect("/");
	console.log("This is an INFORMATIONAL log entry");
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
	data.CpuIsRunning = true;
	JSON.stringify(data);
	// sendJSON(data)
	// writeToFile(data);
}

var StopRunning = function() {
	toggle.checked = false;
	btnCpuStart.disabled = false;
	data.CpuIsRunning = false;
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
