'use strict';

const http = require('http');
// const https = require('https');
// const fs = require('fs');
const express = require('express');
const serveIndex = require('serve-index');
const { Server } = require('socket.io');
const log4js = require('log4js');

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'app.log',
      layout: {
        type: 'pattern',
        pattern: '%r %p - %m',
      },
    },
  },
  categories: {
    default: {
      appenders: ['file'],
      level: 'debug',
    },
  },
});

const PORT = 9527;
const app = express();
const logger = log4js.getLogger();

app.use(serveIndex('./public'));
app.use(express.static('./public'));

const httpServer = http.createServer(app);

httpServer.listen(PORT, '0.0.0.0', () => {
  console.info(`The app is running on http://0.0.0.0:${PORT}`);
});

const io = new Server(httpServer, {
  cors: '*',
});

io.sockets.on('connection', (socket) => {
  socket.on('join', (room) => {
    socket.join(room);

    const myRoom = io.sockets.adapter.rooms[room];

    const clients = Object.keys(myRoom.sockets).length;
    logger.log(`the client count in room:${room} is: ${clients}`);
    // socket.emit('joined', room, socket.id);
    // io.in(room).emit('joined', room, socket.id)
    // socket.broadcast.emit('joined', room, socket.id);
    socket.to(room).emit('joined', room, socket.id);
  });

  socket.on('leave', (room) => {
    const myRoom = io.sockets.adapter.rooms[room];
    socket.leave(room);

    logger.log(`the client of ${socket.id} has leaved room:${room}`);
    socket.to(room).emit('leaved', room, socket.id);
  });
});

// const serverOptions = {
//   key: '',
//   cert: '',
// };

// const httpsServer = https
//   .createServer(serverOptions, app)
//   .listen(443, '0.0.0.0');
