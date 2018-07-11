// Monkey-patch `require` to handle inline sourcemaps
// import 'source-map-support/register';
if (process.env.NODE_ENV === 'development') {
  require('source-map-support').install({
    hookRequire: true
  });
}

import express from 'express';
import path from 'path';
import WebSocket from 'ws';

import { registerSocketClient } from '#server/socket-server';

const Factory = require('#db/models').Factory; // Would be better to make a model module loader, but time

/*************************/
/** Set up some Globals **/
/*************************/
// Application Root Dir
global.__rootdir = path.resolve(__dirname);
// Public files Dir
global.__publicdir = path.join(__rootdir, '..', '..', 'public');
// Client files Dir
global.__clientdir = path.join(__rootdir, '..', 'client');

/********************/
/** Express Server **/
/********************/
const httpPort = 4000;
const server = express();
server.use('/public', express.static(__publicdir));
server.use('/public', express.static(__clientdir));

server.get('/', (req, res) => {
  res.sendFile(path.join(__publicdir, 'index.html'));
});

server.listen(httpPort);
console.log(`Serving http at http://localhost:${httpPort}`);

/***************/
/** WS Server **/
/***************/
const wsPort = 4040;
const wss = new WebSocket.Server({ port: 4040 });
console.log(`Serving ws at http://localhost:${wsPort}`);

wss.on('connection', client => {
  registerSocketClient(client);
});
