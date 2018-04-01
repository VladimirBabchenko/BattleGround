var config = require("./main");
var webpack = require("webpack");
var loaders = require("./loaders");
var plugins = require("./plugins");

module.exports = {
  resolve: {
    extensions: config.extensions
  },
  module: {
    loaders: loaders
  },
  plugins: plugins
};