'use strict';
let path = require('path');
let fs = require('fs');
let defaultSettings = require('../defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  name: 'server',
  target: 'node',
  additionalPaths: additionalPaths,
  port: defaultSettings.port + 1,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../../dist/assets'),
    filename: 'api.js'
  },
  devServer: {
    contentBase: './server/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port + 1,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      routes: `${defaultSettings.srcPath}/routes/`,
      components: `${defaultSettings.srcPath}/components/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
    }
  },
  externals: nodeModules,
  module: {}
};
