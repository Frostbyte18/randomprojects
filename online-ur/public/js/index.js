var socket = io();

socket.on('test', text => {
  alert(text);
});

//Variables to be setup later in code
let teamColors = ["red", "blue"];
//Team 0 is opponent, Team 1 is player
let boardLists;
let boardState = {0:{0:"N",1:"N",2:"N",3:"N",12:"N",13:"N"}, 1:{0:"N",1:"N",2:"N",3:"N",12:"N",13:"N"}, "N": {4:"N",5:"N",6:"N",7:"N",8:"N",9:"N",10:"N",11:"N",}}
let rows = document.getElementById("board").children[0].children;

function createBoardList(team){
  //Creates a list that refrence the indivual divs of the board for a given team (for easy refrence in other functions)
  aReturn = [];
  for(let i = 0; i < 14; i++){
    if(i < 4){ //First four squares, 0-3
      aReturn.push(rows[team*2].children[3-i]);
    } else if (i > 11) { //Last two squares, 12-13
      aReturn.push(rows[team*2].children[19-i]);
    } else { //Middle eight squares, 4-11
      aReturn.push(rows[1].children[i-4]);
    }
  }
  return(aReturn);
}
//Create boardLists
boardLists = [createBoardList(0), createBoardList(1)];

function resetBoard(){
  //Square state can be 0,1,or N (neutral)
}
resetBoard();

function placePiece(team, location){
  //Location 0-13

  //Create newPiece html element
  newPiece = document.createElement("div");
  newPiece.className = "piece";
  newPiece.style.backgroundColor = teamColors[team];
  boardLists[team][location].appendChild(newPiece);
}

function pieceClicked(location){

}

function determineBoardLocation(e){
  return boardLists[0].indexOf(e) > -1 ? boardLists[0].indexOf(e) : (boardLists[1].indexOf(e) > -1 ? boardLists[1].indexOf(e) : -1);
}

function determineBoardTeam(e){
  if(determineBoardLocation(e) > 3 && determineBoardLocation(e) < 12){
    return "N";
  } else{
    return boardLists[0].indexOf(e) > -1 ? 0 : (boardLists[1].indexOf(e) > -1 ? 1 : -1);
  }
}

function setState(team, location, state){
  boardState[team][location] = state;
  placePiece(team, location);
  console.log(boardState);
}

document.getElementById("board").addEventListener("click", boardPressed);

function tempFunction(elem){
  setState(0, determineBoardLocation(elem));
}

function boardPressed(event){
  if(event.target.className.indexOf("board-square") > -1){
    tempFunction(event.target);
  } else if (event.target.className == "piece"){

  }
}
