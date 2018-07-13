// Monkey-patch `require` to handle inline sourcemaps
require('source-map-support').install();

import express from 'express';
import http from 'http';
import path from 'path';
import WebSocket from 'ws';

import { registerSocketClient } from '#server/socket-server';

const publicDir = path.resolve(__dirname, '..', '..', 'public');
const clientDir = path.resolve(__dirname, '..', 'client');

const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 4000;

const app = express();
app.use('/public', express.static(publicDir));
app.use('/public', express.static(clientDir));
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
wss.on('connection', client => {
  registerSocketClient(client);
});

server.listen(port);
console.log(`Serving http at http://localhost:${port}`);
console.log(`Serving ws at http://localhost:${port}`);
