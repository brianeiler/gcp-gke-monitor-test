'use strict';

var dataFilePath = './scripts/data.json'
var JSONData = require( dataFilePath);
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');


function getJson(req, res, next){
    res.send(data);
}

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
const path = require('path');
const router = express.Router();
var server = http.createServer(app);

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Add the router
// Store all JS and CSS in Scripts folder.
app.use("/scripts", express.static(__dirname + '/scripts'));

app.use('/', router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/CPU_On', function(req, res) {
  console.log(req.body);
  var isRunning = req.body.isRunning;
  console.log(isRunning);
  JSONData.isRunning = isRunning;
  fs.writeFile(dataFilePath, JSON.stringify(JSONData, null, 2), errorHandler);
  res.sendStatus(200);
});


var errorHandler = function()
{
	//TODO
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);