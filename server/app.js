const express = require('express');
const httpProxy = require('http-proxy');
// const bodyParser = require('body-parser');

const routes = require('./routes/routes.js'); //Load routes

var api = function(port) {
  httpProxy.createProxyServer();
  var app = express();

  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({
  //   extended: true,
  //   limit: '5mb'
  // }));

  app.use('/routes', (req, res) => {
    httpProxy.web(req, res, {
      target: 'http://localhost:8001'
    });
  });
  app.use(routes);


  var server = app.listen(port, () => {
    console.log('Express ready at ' + server.address().port);
  });
};

module.exports = api;
