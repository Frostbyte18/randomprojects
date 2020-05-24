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

class Board {
  constructor(playingTeam) {
    this.playingTeam = playingTeam; //A or B
    this.rows = document.getElementById("board").children[0].children;
    this.list = [this.createBoardList(0), this.createBoardList(1), this.createBoardList(2)];
    this.teamColors = ["blue", "yellow"];
  }

  createBoardList(team){
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

  determineLocation(e){
    return this.list[0].indexOf(e) > -1 ? this.list[0].indexOf(e) : (this.list[1].indexOf(e) > -1 ? this.list[1].indexOf(e) : -1);
  }

  determineTeam(e){
    if(this.determineLocation(e) > 3 && this.determineLocation(e) < 12){
      return "N";
    } else{
      return this.list[0].indexOf(e) > -1 ? 0 : (this.list[1].indexOf(e) > -1 ? 1 : -1);
    }
  }

  placePiece(team, location){
    //Location will be 0-23
    //Create newPiece html element
    let newPiece = document.createElement("div");
    newPiece.className = "piece";
    newPiece.style.backgroundColor = this.teamColors[team];

    document.getElementById("board").children[0].children[Math.floor(location/8)].children[location - Math.floor(location/8)*8].appendChild(newPiece);
  }

  summarize(){ //Returns board summary (3x8 => 1x24)
    let a = [];
    let i = 0;
    for(let i = 0; i < 3; i++){
      for(const square of this.rows[i].children){
          //Determine whether it's term A, B, or N
          a.push(typeof square.children[0] == "undefined" ? "N" :
          ["B", "A"][this.teamColors.indexOf(square.children[0].style["background-color"])]);
      }
    }
    return a;
  }

  resetBoard(){
    //Square state can be 0,1,or N (neutral)
  }
}

//Create boardLists
var board = new Board(playingTeam);


resetBoard();



function pieceClicked(location){

}



function setState(team, location, state){
  board.placePiece(team, location);
}

document.getElementById("board").addEventListener("click", boardPressed);

function tempFunction(elem){
  setState(1, board.determineLocation(elem));
}

function boardPressed(event){
  if(event.target.className.indexOf("board-square") > -1){
    tempFunction(event.target);
  } else if (event.target.className == "piece"){

  }
}
