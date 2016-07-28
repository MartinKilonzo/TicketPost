'use strict';
let path = require('path');
let defaultSettings = require('../defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  name: 'server',
  additionalPaths: additionalPaths,
  port: defaultSettings.port + 1,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../../dist/server'),
    filename: 'api.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: '../server/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port + 1,
    publicPath: defaultSettings.publicPath,
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
  module: {}
};
