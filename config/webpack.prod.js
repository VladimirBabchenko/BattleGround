const config = require('./main');
const webpack = require("webpack");
const webpackConfig = require('./webpack');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const merge = require('webpack-merge');

module.exports = merge(webpackConfig, {
  entry: {
    app: config.src + '/app.js'
  },

  plugins: [
    new UglifyJSPlugin()
  ],

  output: {
    path: config.dist,
    filename: '[name].bundle.js'
  }
});