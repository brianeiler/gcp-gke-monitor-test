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

// Initialize the JSON file to false and 0 users
var cpuLoadRunning = false;
var userCount = 0;
JSONData.CpuIsRunning = cpuLoadRunning;
JSONData.UserCount = userCount;
setTimeout(initData, 2000);		// Needed to allow the file to open before we write to it



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
	cpuLoadRunning = true;
	JSONData.CpuIsRunning = cpuLoadRunning;
	fs.writeFile(dataFilePath, JSON.stringify(JSONData, null, 2), errorHandler);
	res.redirect("/");
	cpuEventLoop();
	console.log('CPU load started');
});

app.post('/StopCPU', function(req, res) {
	cpuLoadRunning = false;
	JSONData.CpuIsRunning = cpuLoadRunning;
	fs.writeFile(dataFilePath, JSON.stringify(JSONData, null, 2), errorHandler);
	res.redirect("/");
	console.log('CPU load stopped');
});

app.post('/IncreaseUsers', function(req, res) {
	userCount = JSONData.UserCount
	userCount = userCount + 1
	JSONData.UserCount = userCount;
	fs.writeFile(dataFilePath, JSON.stringify(JSONData, null, 2), errorHandler);
	res.redirect("/");
	console.log('User Count now: ' + userCount);
});

app.post('/DecreaseUsers', function(req, res) {
	userCount = JSONData.UserCount
	if (userCount > 0) {
		userCount = userCount - 1
		JSONData.UserCount = userCount;
		fs.writeFile(dataFilePath, JSON.stringify(JSONData, null, 2), errorHandler);
		res.redirect("/");
	}
	else {
		userCount = 0;
	}
	console.log('User Count now: ' + userCount);
});

app.post('/SendLogCritical', function(req, res) {
	res.redirect("/");
	console.log('This is a CRITICAL log entry');
});

app.post('/SendLogError', function(req, res) {
	res.redirect("/");
	console.log('This is an ERROR log entry');
});

app.post('/SendLogWarning', function(req, res) {
	res.redirect("/");
	console.log('This is a WARNING log entry');
});

app.post('/SendLogInformational', function(req, res) {
	res.redirect("/");
	console.log('This is an INFORMATIONAL log entry');
});



// --------------------------------------------------------------------------------------
// SECTION: Main Functions
// Code that performs the core application functions
// --------------------------------------------------------------------------------------
//

function initData() {
	fs.writeFile(dataFilePath, JSON.stringify(JSONData, null, 2), errorHandler);
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

async function cpuEventLoop() {
	var answer = 0;
	while (cpuLoadRunning) {
		for (var i = 0; i < 10000000; i++) {
			answer += Math.random() * Math.random();
		}
		await sleep(1);
	}
	return answer; // Code that runs the CPU load
}

function metricExport() {
	console.log('Exporting metrics... userCount = ' + userCount);
}

setInterval(metricExport, 60000);


// --------------------------------------------------------------------------------------
// SECTION: Error Handling
// This code (hopefully) catches all the errors and exceptions raised in the app
// --------------------------------------------------------------------------------------
//
var errorHandler = function() {
	//TODO
}

app.listen(PORT, HOST);
console.log(`Web server started. Running on http://${HOST}:${PORT}`);



// --------------------------------------------------------------------------------------
// SECTION: Code Graveyard
// All code below this point is not called and should be disposable
// --------------------------------------------------------------------------------------
//

// function getJson(req, res, next){
//     res.send(data);
// }
