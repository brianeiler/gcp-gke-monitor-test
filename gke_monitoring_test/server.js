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
  //__dirname : It will resolve to your project folder.
});

// router.get('/about',function(req,res){
//   res.sendFile(path.join(__dirname+'/about.html'));
// });

// router.get('/sitemap',function(req,res){
//   res.sendFile(path.join(__dirname+'/sitemap.html'));
// });

//add the router
// app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use("/scripts", express.static(__dirname + '/scripts'));
//Store all JS and CSS in Scripts folder.

app.use('/', router);
// app.listen(process.env.port || 3000);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// console.log('Running at Port 3000');
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