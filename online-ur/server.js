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
const serverNamespace = io.of("/")

// https://socket.io/docs/emit-cheatsheet/
var readySockets = []
var lobbySockets = []

function removeFromLobby(socket){
  delete lobbySockets[lobbySockets.indexOf(socket)]
}

io.on('connection', socket => {
  console.log(`Socket ${socket.id} has connected.`);
  lobbySockets.push(socket.id);

  socket.join("lobby");
  let l = lobbySockets.length;
  io.in("lobby").emit("server-message", `A player has joined\nThere ${l == 1 ? "is" : "are"} now ${l} player${l == 1 ? "" : "s"} in the lobby`);

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} has disconnected.`);
    removeFromLobby(socket.id);
    io.in("lobby").emit("server-message", `A player has joined\nThere ${l == 1 ? "is" : "are"} now ${l} player${l == 1 ? "" : "s"} in the lobby`);

  });
});

http.listen(3000, () => {
  console.log(`listening on *:${port}`);
});
