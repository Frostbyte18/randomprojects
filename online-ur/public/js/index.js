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
    this.teamColors = [fixColor("#00008B"), fixColor("#8B0000")];
    this.pieceNumber = 7;

    //Gameplay mechanics
    this.playingTeam = playingTeam; //A or B
    this.currentGuides = [];

    //Board logistics
    this.magazines = [document.getElementById("opponent-magazine").children[0].children[0], document.getElementById("self-magazine").children[0].children[0]];
    this.rows = Array.from(document.getElementById("board").children[0].children);
    this.list = [this.createList(0), this.createList(1)];
    this.masterList = this.createList(2);
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

  determineLocation(e){ //Location 0-23
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

  placeGuide(team, location){
    //Location 0-23
    //Places smaller dot that shows plater where they can go
  }

  placeAllGuides(team, from, roll){
    //Places all possible guides given a rolled number and position
    for(let i = 0; i < roll; i++){

    }
  }

  clearAllGuides(team, from, roll){

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
}

document.getElementById("board").addEventListener("click", (event) => {
  if(event.target.className.indexOf("board-square") > -1){

  } else if (event.target.className == "piece"){

  }
});

var board = new Board(playingTeam);
board.resetBoard();
board.update(["B", "N", "N", "B", "N", "N", "N", "B", "A", "B", "B", "A", "N", "N", "N", "A", "N", "A", "N", "N", "N", "N", "N", "A"])
