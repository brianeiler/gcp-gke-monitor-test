#!/usr/bin/env node

require(__dirname+"/processor-usage.js").startWatching();

var shouldRun = true;
var desiredLoadFactor = .5;

function blockCpuFor(ms) {
	var now = new Date().getTime();
	var result = 0
	while(shouldRun) {
		result += Math.random() * Math.random();
		if (new Date().getTime() > now +ms)
			return;
	}	
}

function start() {
	shouldRun = true;
	blockCpuFor(1000*desiredLoadFactor);
	setTimeout(start, 1000* (1 - desiredLoadFactor));
}

setInterval(function() {
    console.log("current process cpu usage: "+(global.processCpuUsage || 0)+"%");}
, 1000);

if (process.argv[2]) {
    var value = parseFloat(process.argv[2]);
    if (value < 0 || value > 1) {
        console.log("please give desired load value as a range [0..1]");
	process.exit(-1);
    } else {
        desiredLoadFactor = value;
    }
}
start();