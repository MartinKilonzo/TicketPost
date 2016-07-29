const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');

var api = function(port) {
  httpProxy.createProxyServer();
  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use('/routes', (req, res) => {
    httpProxy.web(req, res, {
      target: 'http://localhost:8001'
    });
  });

  var routes = require('./routes/routes.js')(app);

  var server = app.listen(port, () => {
    console.log('Express ready at ' + server.address().port);
  });
};

module.exports = api;
