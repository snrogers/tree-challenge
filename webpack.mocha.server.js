const config = require('./webpack.server');

global.expect = require('chai').expect;
global.should = require('chai').should();

module.exports = config;
