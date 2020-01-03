let whosTurn = document.getElementById("whos-turn");
let winnerMessage = document.getElementById("winner");
let turn = "X";
let xTurn = document.getElementById("X");
let oTurn = document.getElementById("O");
let foundWinner = false;

let rows = [];
for (let i = 1; i < 4; i++) {
  let row = document.getElementsByClassName("row-" + i);
  rows.push(row);
}

let cols = [];
for (let i = 1; i < 4; i++) {
  let col = document.getElementsByClassName("col-" + i);
  rows.push(col);
}

let boxes = [];
for (let i = 1; i < 10; i++) {
  let box = document.getElementById("box-" + i);
  boxes.push(box);
}

function laneCheck(char, lanes) {
  for (let lane of lanes) {
    let count = 0;
    for (let box of lane) {
      if (box.innerHTML == char) {
        count++;
      }
    }
    if (count == 3) {
      winnerMessage.innerHTML = "WINNER: " + char;
      foundWinner = true;
    }
  }
}

function crossCheck(char) {
  if (
    (boxes[0].innerHTML == char &&
      boxes[4].innerHTML == char &&
      boxes[8].innerHTML == char) ||
    (boxes[2].innerHTML == char &&
      boxes[4].innerHTML == char &&
      boxes[6].innerHTML == char)
  ) {
    winnerMessage.innerHTML = "WINNER: " + char;
    foundWinner = true;
  }
}

function nextTurn() {
  laneCheck(turn, rows);
  laneCheck(turn, cols);
  crossCheck(turn);
  if (turn == "X") {
    turn = "O";
    oTurn.classList.add("your-turn");
    xTurn.classList.remove("your-turn");
  } else {
    turn = "X";
    xTurn.classList.add("your-turn");
    oTurn.classList.remove("your-turn");
  }
  whosTurn.innerHTML = turn + "'s Turn";
}

function place(char, box) {
  if (box.innerHTML == "") {
    box.innerHTML = char;
    nextTurn();
  }
}

for (let box of boxes) {
  function main(box) {
    box.addEventListener("click", function() {
      if (foundWinner == false) {
        place(turn, box);
      }
    });
  }
  main(box);
}
