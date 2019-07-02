'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

const path = require('path');
const router = express.Router();

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


//app.listen(process.env.port || 3000);

//set scripts folder to JS files
app.use(express.static(__dirname + '/Script'));
//add the router
app.use('/', router);


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);