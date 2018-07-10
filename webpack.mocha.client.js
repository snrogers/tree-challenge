const config = require('./webpack.client');

global.expect = require('chai').expect;
global.should = require('chai').should();

module.exports = config;
