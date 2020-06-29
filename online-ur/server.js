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
//io.pingInterval = 500;
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
    //getSocket(socketIdA).leave("lobby");
    //getSocket(socketIdB).leave("lobby");
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
    if(this.lobbySockets.indexOf(socketId) > -1){
      delete this.lobbySockets[this.lobbySockets.indexOf(socketId)];
    } else if (this.playerSockets.indexOf(socketId) > -1) {
      delete this.playerSockets[this.playerSockets.indexOf(socketId)];
    }
  }
}

class Game{
  constructor(socketA, socketB){
    //this.playerSockets = [socketA, socketB]; //Sockets of players
    this.playerIds = [socketA, socketB];
    this.state = [];
    this.score = [0, 0]; //A:B
    this.turn = "A" //A or B
    this.players = ["A", "B"];
    this.idDict = {"A" : socketA, "B" : socketB};
    this.gameId = socketA + socketB;
    this.startGame();
  }

  //GAME FUNCTIONS (i.e. used by proccesses)
  flipPlayer(i){return i == "A" ? "B" : "A";}

  roll(){
    let a = [0];
    let s = 0;
    for(let i = 0; i < 4; i++){
      let r = Math.floor(Math.random() * 2);
      a[0] += r;
      a.push(r);
    }
    return a;
    //return [Math.floor(Math.random() * 5) + 1]; //Standard 6-sided dice rolling
  }

  sendMessage(message1, message2){ //A custom function to send messages to both players at once
    //Message 1 -> current turn, Message 2 -> current waitibg
    io.to(idDict(this.turn)).emit("server-message", message1);
    io.to(idDict(this.flipPlayer(this.turn))).emit("server-message", message2);
  }

  //GAME PROCCESSES (i.e. triggered by events)
  //Ordered in code to represent game flow
  startGame(){
    console.log(`Starting game: ${this.gameId}`);
    io.to(this.playerIds[0]).emit("start-game", "A");
    io.to(this.playerIds[1]).emit("start-game", "B");
    this.startTurn(this.playerIds[0]);
  }

  startTurn(playerId){
    //playerId is a socketId
    let roll = this.roll()
    if(roll[0] == 0){
      //Player doesn't get a turn
      this.proccessTurn(this.state, this.score, playerId);
      io.to(playerId).emit("server-message", `Sorry, you rolled a 0. You have to wait for your oppponent to go again`);
    } else{
      io.to(playerId).emit("server-message", `You rolled a ${roll[0]}!`);
      io.to(playerId).emit("start-turn", [roll, this.state, this.score]);
    }
  }

  proccessTurn(state, score, repeat, playerId){
    function flipState(a){
      //Reverses state so each player sees game from their perspective
      return a.slice(16, 24).concat(a.slice(8,16)).concat(a.slice(0,8));
    }

    this.score = score;
    if(repeat){
      this.state = state;
      io.to(this.playerIds[this.players.indexOf(this.flipPlayer(this.turn))]).emit("update-board", flipState(this.state));
      io.to(this.playerIds[this.players.indexOf(this.flipPlayer(this.turn))]).emit("server-message", `Your opponent landed on a repeat square and gets to go again.`);
      io.to(this.playerIds[this.players.indexOf(this.turn)]).emit("server-message", `You landed on a repeat square, go again!`);
    } else{
      this.state = flipState(state);
      io.to(this.playerIds[this.players.indexOf(this.turn)]).emit("server-message", `Nice move! Waiting on your opponent`);
      this.turn = this.flipPlayer(this.turn);
    }
    this.startTurn(this.playerIds[this.players.indexOf(this.turn)]);
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
    socketGame.proccessTurn(response[0], response[1], response[2]);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} has disconnected.`);
    lobby.closeSocket(socket.id);
  });
});

var lobby = new Lobby();
