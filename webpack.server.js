const nodeExternals = require('webpack-node-externals');
const path = require('path');

const commonConfig = require('./webpack.common');

const serverConfig = {
  ...commonConfig,
  entry: './app/src/server.js',
  externals: nodeExternals(),
  node: { __dirname: false },
  output: {
    path: path.resolve(__dirname, 'app', 'build', 'server'),
    filename: 'server.js'
  },
  target: 'node'
};

module.exports = serverConfig;
