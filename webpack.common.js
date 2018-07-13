// const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require('path');

const pathAliases = {
  '#client': path.resolve(__dirname, 'app', 'src', 'client'),
  '#db': path.resolve(__dirname, 'app', 'db'),
  '#server': path.resolve(__dirname, 'app', 'src', 'server'),
  '#shared': path.resolve(__dirname, 'app', 'src', 'shared')
};

const commonConfig = {
  devtool: 'inline-source-map',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-runtime'],
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: pathAliases
  }
};

module.exports = commonConfig;
