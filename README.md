# Legal Disclaimer !!!
**WARNING!** This test application is provided as-is without warranty or support. This tool is not intended for use in a production environment, and may cause significant system load when the CPU load generator is active. 

**Use at your own risk!**

&nbsp;

&nbsp;

# gcp-gke-monitor-test
This is a web-based test utility for Google Kubernetes Engine (GKE) and Stackdriver on Google Cloud Platform. The tool includes a CPU load generator, a custom metric generator, and an event log test.

## CPU Load generator
The CPU load generator uses a math function to keep the CPU busy, then waits 1ms to allow for other system processes to respond, as well as to check if the variable "cpuLoadRunning" is true or false. When the user clicks the stop button, this variable is set to False, which prevents the math function from running.
```
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

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}
```

## Custom Metric Generator
The test utility also can send custom metrics to Stackdriver.  You must first click the Start Monitoring button to create the Stackdriver Custom Metric Descriptor. This function then begins exporting the value of the custom metric to Stackdriver once every minute. The custom metric in this example is called "Web App - Active Users" and is associated with the "k8s_pod" resource in Stackdriver Monitoring.

### Create Stackdriver Custom Metric Descriptor
This is the code used to create the custom metric descriptor in Stackdriver:
```
async function createStackdriverMetricDescriptor() {
	// This function will create the metric descriptor for the timeSeries data
	// The descriptor is only created once.
	const request = {
	  name: client.projectPath(projectId),
	  metricDescriptor: {
		description: 'TEST METRIC - Number of active users in the web application.',
		displayName: 'Web App - Active Users',
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
	if (debugMode) console.log(getDateTime() + ',DEBUG, Message: Created custom metric in Stackdriver.');
}
```

### Write timeSeries Data to Stackdriver
This is the code that writes the timeSeries data values to Stackdriver once per minute:
```
app.post('/StartMonitoring', function(req, res) {
	res.redirect("/");

	createStackdriverMetricDescriptor()
	.then(result => startMonitoring(result))
	.then(endResult => {
	  if (debugMode) console.log(getDateTime() + ',DEBUG, Message: Custom Metric export started.');
	})
	.catch(() => {
	  console.log(getDateTime() + ',ERROR, Message: Custom Metric export failed.');
	});
});

function startMonitoring() {
	//This function starts the export of custom metrics to Stackdriver, which occurs once per minute.
	setInterval(metricExport, 60000);
}

function metricExport() {
	writeStackdriverMetricData();
	if (debugMode) console.log(getDateTime() + ',DEBUG, Message: Exporting metrics... userCount = ' + userCount);
}

async function writeStackdriverMetricData() {
	//
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
		  project_id: projectId,
		  location: zone_name,
		  cluster_name: cluster_name,
		  namespace_name: namespace_name,
		  pod_name: pod_name,
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
}


```


## Log Generator
The test utility has four log generation buttons: Critical, Error, Warning, and Informational. Each sends a date stamped message to stdOut, where it can be caught by the logging engine.  There is also a toggle to enable/disable DEBUG level logging. By default debug logging is **Disabled**. When debug logging is enabled, each function call reports its status to stdOut.

This is the code which creates the test event logs:
```
app.post('/SendLogCritical', function(req, res) {
	res.redirect("/");
	console.log(getDateTime() + ',CRITICAL, Message: This is a test of a CRITICAL log entry.');
});

app.post('/SendLogError', function(req, res) {
	res.redirect("/");
	console.log(getDateTime() + ',ERROR, Message: This is a test of an ERROR log entry.');
});

app.post('/SendLogWarning', function(req, res) {
	res.redirect("/");
	console.log(getDateTime() + ',WARNING, Message: This is a test of a WARNING log entry.');
});

app.post('/SendLogInformational', function(req, res) {
	res.redirect("/");
	console.log(getDateTime() + ',INFO, Message: This is a test of an INFORMATIONAL log entry.');
});
```

