/**
* Module dependencies.
*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var util = require('./common/util');
var bowling = require('./routes/bowling');

// Setting host and ports
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 8080;

// Using body parser for request query parameters and body 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Adding route /bowling
app.use('/bowling', bowling);

// Start method to start application server
app.start = function() {
  return app.listen(port, function() {
      app.emit('started');
      console.log("Application Started and it is listening on http://" + host+":" + port+"/");
  });
};

// 
if (require.main === module) {
  app.start();
}

// Exporting app
module.exports = {
  app: app,
  util: util
}