// Monkey-patch `require` to handle inline sourcemaps
if (process.env.NODE_ENV === 'development')
  require('source-map-support').install({
    hookRequire: true
  });

import express from 'express';
import path from 'path';
import WebSocket from 'ws';

import App from './client/app';
import Html from './client/html';

console.log('RESOLVED:', path.resolve(__dirname));
console.log('__dirname', __dirname);
// Application Root Dir
global.__rootdir = path.resolve(__dirname);
// Public files Dir
global.__publicdir = path.join(__rootdir, '..', '..', 'public');
// Client files Dir
global.__clientdir = path.join(__rootdir, '..', 'client');

// Express Server
const httpPort = 4000;
const server = express();
server.use('/public', express.static(__publicdir));
server.use('/public', express.static(__clientdir));

server.get('/', (req, res) => {
  res.sendFile(path.join(__publicdir, 'index.html'));
});

server.listen(httpPort);
console.log(`Serving at http://localhost:${httpPort}`);

// WS Server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(message);
  });

  ws.send('TODO: Initialize from DB');
});
