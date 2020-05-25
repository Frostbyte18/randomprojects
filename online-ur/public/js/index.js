//
//SERVER FUNCTIONS & COMMUNICATION
//
/*
var socket = io();

socket.on('test', response => {
  console.log(JSON.parse(response));
});

socket.on("server-message", response => {
  document.getElementById("server-message").innerHTML = response;
  console.log(response);
});

socket.on("start-game", response => {
  //Response will be a 1 or a 0;
  actualPlayer = parseInt(reesponse);
  if(actualPlayer == 0){
    requestTurn();
  }
});

function requestTurn(){

}

function requestGame(){
  socket.emit("request-game", "requesting game");
}

function compressGame(){
  //for
}
*/

//
//GAME FUNCTIONS
//
//Player will be assigned A or B which is common to both players However, both teams will play from team 1's perspective
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
    this.currentRoll = 5;
    this.turnState = 2;

    //Board logistics
    this.magazines = [document.getElementById("opponent-magazine").children[0].children[0], document.getElementById("self-magazine").children[0].children[0]];
    this.rows = Array.from(document.getElementById("board").children[0].children);
    this.lists = [this.createList(0), this.createList(1)];
    this.masterList = this.createList(2);
    this.currentGuide = -1;
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
        this.masterList[this.currentGuide].innerHTML = ""
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

      let guidePiece = document.createElement("div");
      guidePiece.style["background-color"] = this.teamColors[1];

      //Only places a dot if it's the right player
      if(this.detTeam(guideLocation) == 1){
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
    //Summary is 24 item array
    this.clearBoard();
    for(const s in summary){
      if(summary[s] != "N"){
        this.placePiece(summary[s] == this.playingTeam ? 1 : 0, s);
      }
    }
  }

  clearBoard(){
    for(const row in this.rows){
      for(const square of this.rows[row].children){
        square.innerHTML = "";
      }
    }
  }

  resetBoard(){
    //Reset board
    this.clearBoard();
    //Reset magazines
    board.magazines[0].innerHTML = "";
    board.magazines[1].innerHTML = "";
    let newPiece;
    for(let i = 0; i < 2; i++){
      for(let j = 0; j < this.pieceNumber; j++){
        newPiece = document.createElement("th");
        newPiece.className = "magazine-piece";
        newPiece.style["background-color"] = this.teamColors[i]
        board.magazines[i].appendChild(newPiece);
      }
    }
  }

  makeMove(location){
    //Make a move to a spot with a given guide
  }
}

document.getElementById("board").addEventListener("click", (event) => {
  if(event.target.className.indexOf("board-square") > -1){

  } else if (event.target.className == "piece"){
    //Show Guide
    board.placeGuide(board.detLocation(event.target.parentNode), board.currentRoll);
  } else if (event.target.className == "guide") {
    //Confirm move
  }
});

document.getElementById("self-magazine").addEventListener("click", (event) => {
  board.placeGuide(-1, board.currentRoll);
});

var board = new Board(playingTeam);
board.resetBoard();
board.update(["B", "N", "N", "B", "N", "N", "N", "B", "A", "B", "B", "A", "N", "N", "N", "A", "N", "A", "N", "N", "N", "N", "N", "A"])
