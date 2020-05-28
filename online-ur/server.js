//
//SOCKET COMMUNICATION SETUP
//
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
const serverNamespace = io.of("/");

http.listen(3000, () => {
  console.log(`listening on *:${port}`);
});

// https://socket.io/docs/emit-cheatsheet/

function getSocket(id){
  return io.sockets.connected[id];
}

//
//GAME COMMUNICATION FUNCTIONS & EVENTS
//
class Lobby{
  constructor(){
    this.lobbySockets = []; //Stores socket objects of non-game playing sockets
    this.playerSockets = [];
    this.games = []; //Stores game objects
  }

  connectSocket(socketId){
    //Called when a new socket conects
    this.lobbySockets.push(socketId);
    io.to(socketId).emit("server-message", "Welcome to Online Ur. You're in the lobby, but as soon as another player joins, you'll be put into a game");
    getSocket(socketId).join("lobby");
    //Start game if possible
    this.checkGameAvab();
  }

  checkGameAvab(){
      //Checks to see if a game can be started
      if(this.lobbySockets.length > 1){
        this.beginGame(this.lobbySockets[0], this.lobbySockets[1]);
      }
  }

  beginGame(socketIdA, socketIdB){
    this.games.push(new Game(socketIdA, socketIdB));

    //Remove players from lobby
    getSocket(socketIdA).leave("lobby");
    getSocket(socketIdB).leave("lobby");
    delete this.lobbySockets[0];
    delete this.lobbySockets[1];
  }

  admitGame(socketId){
    for(const game of this.games){
      if(game.playerIds.indexOf(socketId) > -1){
        return game;
      }
    }
    return -1;
  }

  closeSocket(socketId){
    if(this.lobbySockets.indexOf(socketId)){
      delete this.lobbySockets[this.lobbySockets.indexOf(socketId)];
    } else if (this.playerSockets.indexOf(socketId)) {
      delete this.playerSockets[this.playerSockets.indexOf(socketId)];
    }
  }
}

class Game{
  constructor(socketA, socketB){
    //this.playerSockets = [socketA, socketB]; //Sockets of players
    this.playerIds = [socketA, socketB];
    this.state = [];
    this.turn = "A"
    this.players = ["A", "B"];
    this.gameId = socketA + socketB;

    this.startGame();
  }

  flip(i){return i == "A" ? "B" : "A";}

  startGame(){
    console.log(`Starting game: ${this.gameId}`);
    io.to(this.playerIds[0]).emit("start-game", "A");
    io.to(this.playerIds[1]).emit("start-game", "B");
    this.startTurn(this.playerIds[0]);
  }

  roll(){
    let a = [0];
    let s = 0;
    for(let i = 0; i < 4; i++){
      let r = Math.floor(Math.random() * 2);
      a[0] += r;
      a.push(r);
    }
    return a;
  }

  proccessTurn(state, playerId){
    if(true){ //Check it came from correct player
      this.state = state;
      this.turn = this.flip(this.turn);
      this.startTurn(this.playerIds[this.players.indexOf(this.turn)]);
    }
  }

  startTurn(playerId){
    io.to(playerId).emit("start-turn", [this.roll(), this.state]);
  }
}

//
// SOCKET EVENTS
//

//Facilitate connection & set up events
io.on('connection', socket => {
  var socketGame; //Refrences which game object assigned to player
  console.log(`Socket ${socket.id} has connected.`);
  //Join lobby and request to join game
  lobby.connectSocket(socket.id);

  socket.on("confirm-playing", response => {
    //Lobby returns player's game object
    socketGame = lobby.admitGame(socket.id);
  });

  socket.on("made-turn", response => {
    socketGame.proccessTurn(response[0]);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} has disconnected.`);
    lobby.closeSocket(socket.id);
  });
});

var lobby = new Lobby();
