// server.js

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Serve static files (HTML, CSS)
app.use(express.static('public'));

// Define a route to handle the datetime request
app.get('/datetime', (req, res) => {
  const currentDatetime = new Date().toLocaleString();
  res.send(currentDatetime);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('start', () => {
    io.emit('start');
  });

  socket.on('stop', () => {
    io.emit('stop');
  });

  socket.on('reset', () => {
    io.emit('reset');
  });
});

http.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});

