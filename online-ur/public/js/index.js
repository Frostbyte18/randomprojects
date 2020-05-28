//
//SERVER FUNCTIONS & COMMUNICATION
//
var socket = io();

class Game {
  //This is the game from a player's perspective
  //Game is created when the document is loaded, but not started until confirmation is received from server
  constructor(playingTeam){
    this.hasStarted = false;
    this.myTurn = false;
    this.playingTeam = playingTeam;
    this.board = new Board(this.playingTeam);
    this.board.resetBoard();
  }

  startGame(actualPlayer){
    this.actualPlayer = actualPlayer;
    this.hasStarted = true;
    document.getElementById("main-playing-div").style.visibility = "visible";
  }

  startTurn(roll, state){
    this.myTurn = true;
    this.board.currentRoll = roll[0];
    this.board.update(state);
  }

  finishTurn(){
      socket.emit("made-turn", [game.board.summarize]);
  }
}

socket.on("start-game", (response) => {
  //Response will be a A or a B
  game.startGame(response);
  socket.emit("confirm-playing"); //Allow server to assign game id
});

socket.on("start-turn", response => {
  game.startTurn(response[0], response[1]);
});

socket.on("server-message", response => {
  document.getElementById("server-message").innerHTML = response;
});

//
//GAME FUNCTIONS
//

//Player will be assigned A or B which is common to both players
//However, both teams will play from team 1's perspective
var playingTeam = "A";

function fixColor(color){
  let p = document.createElement("div");
  p.style.backgroundColor = color;
  return p.style.backgroundColor;
}

class Board {
  constructor(playingTeam) {
    //Game configuration
    //this.teamColors = [fixColor("#00008B"), fixColor("#8B0000")];
    this.teamColors = [fixColor("blue"), fixColor("red")];
    this.pieceNumber = 7;

    //Gameplay mechanics
    this.playingTeam = playingTeam; //A or B
    this.currentRoll = 2;
    this.turnState = 2;
    this.score = [0,0];

    //Board logistics
    this.magazines = [document.getElementById("opponent-magazine").children[0].children[0], document.getElementById("self-magazine").children[0].children[0]];
    this.rows = Array.from(document.getElementById("board").children[0].children);
    this.lists = [this.createList(0), this.createList(1)];
    this.masterList = this.createList(2);
    this.repeatSquares = [16, 11, 22];
    this.currentGuide = -1;
    this.currentClick = -1;
  }

  createList(team){
    //Creates a list that refrence the indivual divs of the board for a given team (for easy refrence in other functions)
    let a = [];
    if(team < 2){
      for(let i = 0; i < 14; i++){
        if(i < 4){ //First four squares, 0-3
          a.push(this.rows[team*2].children[3-i]);
        } else if (i > 11) { //Last two squares, 12-13
          a.push(this.rows[team*2].children[19-i]);
        } else { //Middle eight squares, 4-11
          a.push(this.rows[1].children[i-4]);
        }
      }
    }
    if(team == 2){
      for(let i = 0; i < 3; i++){
        for(const square of this.rows[i].children){
            //Determine whether it's term A, B, or N
            a.push(square);
        }
      }
    }
    return(a);
  }

  detLocation(e){ //Location 0-23
    return this.masterList.indexOf(e);
  }

  placePiece(team, location){
    //Location 0-23
    //Create newPiece html element
    let newPiece = document.createElement("div");
    newPiece.className = "piece";
    newPiece.style["background-color"] = this.teamColors[team];
    this.masterList[location].appendChild(newPiece);
  }

  //Determines which team holds a square (1, 0, or N)
  detTeam(location){
    //Location 0-23
    let pieces = this.masterList[location].getElementsByClassName("piece");
    if(pieces.length == 0){
      return "N";
    } else {
      return this.teamColors.indexOf(pieces[0].style["background-color"]);
    }
  }

  clearCurrentGuide(){
    if(this.currentGuide != -1){
      if(this.detTeam(this.currentGuide) == 0){
        this.masterList[this.currentGuide].children[0].innerHTML = "";
      } else if(this.detTeam(this.currentGuide) == "N"){
        this.masterList[this.currentGuide].innerHTML = "";
      }
    }
  }

  //Places smaller dot that shows plater where they can go
  placeGuide(location, roll){
    //Location 0-23
    this.clearCurrentGuide();
    if(location == -1 || this.detTeam(location) == 1){
      //Correct team clicked
      let guideLocation = this.masterList.indexOf(this.lists[1][this.lists[1].indexOf(this.masterList[location]) + roll]);
      this.currentGuide = guideLocation;
      this.currentClick = location;

      let guidePiece = document.createElement("div");
      guidePiece.style["background-color"] = this.teamColors[1];

      //Only places a dot if it's valid
      if(guideLocation == -1){
        //Trying to go too far
        let clickLocation = this.lists[1].indexOf(this.masterList[this.currentClick]);
        if(clickLocation + roll == 14){
          //Check to see if piece can score
          guidePiece.className = "guide-self";
          this.masterList[21].appendChild(guidePiece);
          this.currentGuide = 24;
        } else{
          this.currentGuide = -1;
        }
      } else if(this.detTeam(guideLocation) == 1){
        //Can't place guide there, same team
        this.currentGuide = -1;
      } else if(this.detTeam(guideLocation) == 0){
        //Placing guide on opponent's piece
        guidePiece.className = "guide-opp";
        this.masterList[guideLocation].children[0].appendChild(guidePiece);
      } else if(this.detTeam(guideLocation) == "N"){
        //Placing guide on open square
        guidePiece.className = "guide-self";
        this.masterList[guideLocation].appendChild(guidePiece);
      }
    }
  }

  clearLocation(location){
    //Number 0-23
    this.masterList[location].innerHTML = "";
  }

  summarize(){ //Returns board summary (3x8 => 1x24)
    let a = [];
    let i = 0;
    for(const row in this.rows){
      for(const square of this.rows[row].children){
          //Determine whether it's term A, B, or N
          if(typeof square.children[0] == "undefined"){
            a.push("N");
          } else{
            a.push(["B", "A"][this.teamColors.indexOf(square.children[0].style["background-color"])]);
          }
      }
    }
    return a;
  }

  update(summary){
    if(summary != []){
      //Summary is 24 item array
      this.resetBoard();
      for(const s in summary){
        if(summary[s] != "N"){
          let team = summary[s] == this.playingTeam ? 1 : 0;
          this.placePiece(team, s);
          //Remove one piece from magazine
          this.magazines[team].removeChild(this.magazines[team].children[0]);
        }
      }
    } else {
      //First move of the game
      this.resetBoard();
    }
  }

  updateScore(){

  }

  resetBoard(){
    //Clear board tiles
    for(const row in this.rows){
      for(const square of this.rows[row].children){
        square.innerHTML = "";
      }
    }
    //Reset magazines
    this.magazines[0].innerHTML = "";
    this.magazines[1].innerHTML = "";
    let newPiece;
    for(let i = 0; i < 2; i++){
      for(let j = 0; j < this.pieceNumber - this.score[i]; j++){
        newPiece = document.createElement("th");
        newPiece.className = "magazine-piece";
        newPiece.style["background-color"] = this.teamColors[i]
        this.magazines[i].appendChild(newPiece);
      }
    }
  }

  makeMove(){
    //Make a move to a spot selected guide
    if(this.currentGuide == 24){
      //Scoring move
      this.clearLocation(this.currentClick);
      this.masterList[21].innerHTML = "";
      this.score[1] += 1;
      this.currentGuide = -1;
    } else {
      //Normal move
      this.clearLocation(this.currentGuide);
      if(this.currentClick != -1){
        this.clearLocation(this.currentClick);
      }
      this.placePiece(1, this.currentGuide);
      this.update(this.summarize()); //Fix magazines
    }

    //Either end turn or request new move
    if(this.repeatSquares.indexOf(this.currentGuide) != -1){
      //Request new move
    } else {
      //End turn
    }
  }
}

document.getElementById("board").addEventListener("click", (event) => {
  if(game.hasStarted && game.myTurn){
    if(event.target.className.indexOf("board-square") > -1){

    } else if (event.target.className == "piece"){
      //Show Guide
      game.board.placeGuide(game.board.detLocation(event.target.parentNode), game.board.currentRoll);
    } else if (event.target.className == "guide-self" || event.target.className == "guide-opp") {
      game.board.makeMove();
    }
  }
});

document.getElementById("self-magazine").addEventListener("click", (event) => {
  if(game.hasStarted && game.myTurn){
    game.board.placeGuide(-1, game.board.currentRoll);
    game.finishTurn();
  }
});

var game = new Game();

//Arbitrary board setup for testing
//board.update(["B", "N", "N", "B", "N", "N", "N", "B", "A", "B", "B", "A", "N", "N", "N", "A", "N", "A", "N", "N", "N", "N", "N", "A"])
