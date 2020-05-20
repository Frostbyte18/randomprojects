// https://8be506ee.ngrok.io/
`
npm install socket.io // installs socket.io
npm install express // installs express
`
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = 3000;

app.use(express.static('public'));

const io = require('socket.io')(http);

// https://socket.io/docs/emit-cheatsheet/

io.on('connection', socket => {
  console.log(`A user connected.`);

  socket.emit('test', 'this is working');

  socket.on('disconnect', () => {
    console.log(`A user disconnected.`);
  });
});

http.listen(3000, () => {
  console.log(`listening on *:${port}`);
});
