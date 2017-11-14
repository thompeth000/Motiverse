const connect = require('connect');
const serveStatic = require('serve-static');
const io = require('socket.io');
connect().use(serveStatic(__dirname)).listen(8000);
