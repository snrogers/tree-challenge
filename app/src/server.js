// Monkey-patch `require` to handle inline sourcemaps
// import 'source-map-support/register';
if (process.env.NODE_ENV === 'development') {
  require('source-map-support').install({
    hookRequire: true
  });
}

import express from 'express';
import http from 'http';
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

const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use('/public', express.static(__publicdir));
app.use('/public', express.static(__clientdir));
app.get('/', (req, res) => {
  console.log(req);
  res.sendFile(path.join(__publicdir, 'index.html'));
});

server.listen(port);
console.log(`Serving http at http://localhost:${port}`);
console.log(`Serving ws at http://localhost:${port}`);

wss.on('connection', client => {
  registerSocketClient(client);
});
