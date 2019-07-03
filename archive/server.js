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

// Google Stackdriver Monitoring initialization
const monitoring = require('@google-cloud/monitoring');
const client = new monitoring.MetricServiceClient();

// Initialize the JSON file to false and 0 users
var cpuLoadRunning = false;
var userCount = 0;
JSONData.CpuIsRunning = cpuLoadRunning;
JSONData.UserCount = userCount;
setTimeout(initData, 2000);		// Needed to allow the file to open before we write to it


// Express Ports
const PORT = 8080;
const HOST = '0.0.0.0';
	
// GCP Project Information
const projectId = 'YOUR_PROJECT_ID';
const pod_guid = 'YOUR_POD_GUID';




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
	return answer;
}

setInterval(metricExport, 60000);

function metricExport() {
	console.log('Exporting metrics... userCount = ' + userCount);
}

async function createStackdriverMetricDescriptor() {
	// This function will create the metric descriptor for the timeSeries data
	// The descriptor is only created once.

	const request = {
	  name: client.projectPath(projectId),
	  metricDescriptor: {
		description: 'Number of active users.',
		displayName: 'Active Users',
		type: 'custom.googleapis.com/webapp/active_users',
		metricKind: 'GAUGE',
		valueType: 'DOUBLE',
		unit: '{users}',
		labels: [
		  {
			key: 'pod_id',
			valueType: 'STRING',
			description: 'The ID of the pod.',
		  },
		],
	  },
	};

	// Creates a custom metric descriptor
	const [descriptor] = await client.createMetricDescriptor(request);
	console.log('Created custom Metric:\n');
}

async function writeStackdriverMetricData() {
	// This section is for writing the data to Stackdriver
	// This code is executed once every minute to publish the value of the custom metric
	//
	// This function uses the global variable "userCount" for its value
	//
	const dataPoint = {
	  interval: {
		endTime: {
		  seconds: Date.now() / 1000,
		},
	  },
	  value: {
		doubleValue: userCount,
	  },
	};

	const timeSeriesData = {
	  metric: {
		type: 'custom.googleapis.com/webapp/active_users',
		labels: {
		  pod_id: pod_guid,
		},
	  },
	  resource: {
		type: 'k8s_pod',
		labels: {
		  project_id: 'projectId',
		  location: 'zone_name',
		  cluster_name: 'cluster_name',
		  namespace_name: 'namespace',
		  pod_name: 'pod_name',
		},
	  },
	  points: [dataPoint],
	};

	const request = {
	  name: client.projectPath(projectId),
	  timeSeries: [timeSeriesData],
	};

	// Writes time series data
	const result = await client.createTimeSeries(request);
	console.log(`Done writing time series data.`, result);

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
console.log(`Web server started. Running on http://${HOST}:${PORT}`);



// --------------------------------------------------------------------------------------
// SECTION: Code Graveyard
// All code below this point is not called and should be disposable
// --------------------------------------------------------------------------------------
//
