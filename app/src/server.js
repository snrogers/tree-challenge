// Monkey-patch `require` to handle inline sourcemaps
if (process.env.NODE_ENV === 'development')
  require('source-map-support').install({
    hookRequire: true
  });

import express from 'express';
import path from 'path';

import App from './client/app';
import Html from './client/html';

const port = 4000;
const server = express();

console.log('RESOLVED:', path.resolve(__dirname));
console.log('__dirname', __dirname);
// Application Root Dir
global.__rootdir = path.resolve(__dirname);
// Public files Dir
global.__publicdir = path.join(__rootdir, '..', '..', 'public');
// Client files Dir
global.__clientdir = path.join(__rootdir, '..', 'client');

console.log('__clientdir', __clientdir);
console.log('__publicdir', __publicdir);

server.use('/public', express.static(__publicdir));
server.use('/public', express.static(__clientdir));

server.get('/', (req, res) => {
  res.sendFile(path.join(__publicdir, 'index.html'));
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
