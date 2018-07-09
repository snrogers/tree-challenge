const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const CleanWebpackPlugin = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

console.log('NODE_ENV: ', process.env.NODE_ENV);

const commonConfig = {
  // devServer: { contentBase: "./build", open: false },
  devtool: 'inline-source-map',
  plugins: [
    new BrowserSyncPlugin(
      {
        // BrowserSync Options
        // host: "localhost",
        port: 3000,
        files: ['app/public', 'app/build'],
        open: false,
        proxy: 'http://localhost:4000'
      },
      { reload: true }
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${process.env.NODE_ENV}'`
      }
    })
  ],
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};

const clientConfig = {
  ...commonConfig,
  entry: './app/src/client.js',
  output: {
    path: path.resolve(__dirname, 'app', 'build', 'client'),
    filename: 'client.js'
  },
  target: 'web'
};

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

module.exports = [clientConfig, serverConfig];
