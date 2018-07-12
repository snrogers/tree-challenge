const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const commonConfig = require('./webpack.common');

const clientConfig = {
  ...commonConfig,
  entry: './app/src/client.js',

  output: {
    path: path.resolve(__dirname, 'app', 'build', 'client'),
    filename: 'client.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${process.env.NODE_ENV}'`
      }
    }),
    new BrowserSyncPlugin(
      {
        port: 3000,
        files: ['app/public', 'app/build'],
        open: false,
        proxy: 'http://localhost:4000'
      },
      { reload: true }
    )
  ],
  target: 'web'
};

module.exports = clientConfig;
