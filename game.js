/********** VARIABLES **********/

let board = ["", "", "", "", "", "", "", "", ""];
let playerTurn = 0;
let gameOver = false;

let spaces = document.querySelectorAll(".space");

let selectOpponent;
let selectSymbol;

let symbols = ["o", "o", "x"];
let winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function playerMoviment(position, space) {

    if (gameOver) return;

    selectOpponent = document.querySelector('input[name="selectOpponent"]:checked').value; // human = 0 / robot = 1
    selectSymbol = document.querySelector('input[name="selectSymbol"]:checked').value; // nought = 0 / cross = 1

    if (selectSymbol == "0" && playerTurn == 0) playerTurn = 1;
    if (selectSymbol == "1" && playerTurn == 0) playerTurn = 2;
    
    if (board[position] == "") {

        board[position] = symbols[playerTurn];
        
        gameOver = checkingWinner();
        
        if (gameOver == false) {

            if (selectOpponent == "0" && playerTurn == 1) orangeCrayon();
            if (selectOpponent == "0" && playerTurn == 2) blueCrayon();

            playerTurn == 1 ? playerTurn = 2 : playerTurn = 1;
        }
    }

    return gameOver;
}

function robotMoviment() {

    if (gameOver) return;

    let robotPlay;
    do {
        robotPlay = Math.floor(Math.random() * 9);
    }
    while (board[robotPlay] != "");

    let robotSpace = document.getElementById(robotPlay.toString());
    board[robotPlay] = symbols[playerTurn];
    robotSpace.innerHTML = `<div class="${board[robotPlay]}"></div>`;

    gameOver = checkingWinner();
    if (gameOver == false) playerTurn == 1 ? playerTurn = 2 : playerTurn = 1;

    return gameOver;
}

function checkingWinner() {
   
    for (let i = 0; i < winStates.length; i++) {

        let sequences = winStates[i];

        let place0 = sequences[0];
        let place1 = sequences[1];
        let place2 = sequences[2];

        if (board[place0] == board[place1] && 
            board[place0] == board[place2] &&
            board[place0] != "") {
               
            return [true, board[place0]];
        }
    }

    return false;
}