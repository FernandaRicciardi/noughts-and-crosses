/********** VARIABLES **********/

let board = ["", "", "", "", "", "", "", "", ""]; //This is the board
let playerTurn = 0; //It will change later and then Player A = 1 (o) / Player B = 2 (x)
let gameOver = false;

//Getting all the 9 spaces from the board:
let spaces = document.querySelectorAll(".space");
//spaces = NodeList(9) [div#0.space, div#1.space, div#2.space, div#3.space, div#4.space, div#5.space, div#6.space, div#7.space, div#8.space]

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

let result;

//From interface.js, the function handleClick() is calling this function playerMoviment()
//Player is making a moviment:
function playerMoviment(position, space) {
    
    // It checks if the game is finished (false = no finished / true = finished)
    if (gameOver) return;

    selectOpponent = document.querySelector('input[name="selectOpponent"]:checked').value; // human = 0 / robot = 1
    selectSymbol = document.querySelector('input[name="selectSymbol"]:checked').value; // nought = 0 / cross = 1

    if (selectSymbol == "0" && playerTurn == 0) playerTurn = 1;
    if (selectSymbol == "1" && playerTurn == 0) playerTurn = 2;
    
    //It checks if the space is empty. This prevents the player from changing their previously played symbol by clicking more than once in the same space:
    if (board[position] == "") {

        //It adds the chosen symbol (o / x) within the array board:
        board[position] = symbols[playerTurn];
        
        // Checking if there is a winner to change player turn
        gameOver = checkingWinnerOrTie();
        
        if (gameOver == false) {

            //It changes the crayon colour:
            if (selectOpponent == "0" && playerTurn == 1) orangeCrayon();
            if (selectOpponent == "0" && playerTurn == 2) blueCrayon();

            // Changing player turn:
            playerTurn == 1 ? playerTurn = 2 : playerTurn = 1;
        }
    }

    return gameOver;
}

//If the Robot is playing:
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

    gameOver = checkingWinnerOrTie();
    if (gameOver == false) playerTurn == 1 ? playerTurn = 2 : playerTurn = 1;

    return gameOver;
}

//Function that checks if there is a winner:
function checkingWinnerOrTie() {

    let hasEmpty = board.some((currentSpace) => currentSpace == "")
   
    for (let i = 0; i < winStates.length; i++) {

        let sequences = winStates[i];

        let place0 = sequences[0];
        let place1 = sequences[1];
        let place2 = sequences[2];

        if (board[place0] == board[place1] && 
            board[place0] == board[place2] &&
            board[place0] != "") {
            
            spin(place0, place1, place2) // It shows the winning move
            result = board[place0];
            return [true, result];
        }
    }

    if (!hasEmpty) {
        result = "tie";
        return [true, result];
    }

    return false;
}

function spin(p0, p1, p2) {
    document.getElementById(p0).classList.add('spin-animation');
    document.getElementById(p1).classList.add('spin-animation');
    document.getElementById(p2).classList.add('spin-animation');

    setTimeout(function(){
        document.getElementById(p0).classList.remove('spin-animation')
        document.getElementById(p1).classList.remove('spin-animation')
        document.getElementById(p2).classList.remove('spin-animation')
    }, 2000);
}

// When PLAY button is pressed:
function playAgain() {
    
    document.querySelector('.modal-overlay').classList.remove('active');
    document.querySelector('#win-run').classList.remove('run');
    document.querySelector('#win-who').classList.remove('xWin');
    document.querySelector('#win-who').classList.remove('oWin');
    document.querySelector('#win-who').classList.remove('hWin');
    document.querySelector('#win-who').classList.remove('rWin');
    document.getElementById("win-who").style.width = "280px";
    document.getElementById("win-who").style.height = "280px";
    document.querySelector('#win-who').classList.remove('tie');
    document.getElementById("win-run").src = "assets/run.png";
   
    board = ["", "", "", "", "", "", "", "", ""];
    playerTurn = 0;
    gameOver = false;
    result = ""
    let symbol = " ";

    spaces.forEach((space) => space.innerHTML = `<div class='${symbol}'></div>`);

    spaces.forEach((space) => space.addEventListener("click", handleClick));

    if (selectOpponent == "0" && selectSymbol == 0) blueCrayon();
    if (selectOpponent == "0" && selectSymbol == 1) orangeCrayon();
}

// When ERASE button is pressed:
function reloadGame() {
    window.location = window.location;
    /* window.location.href = "product.aspx?id=prod" + "&" + Date.parse(new Date()); ---> 2nd option */
    /* location.reload(); ---> It does not work in Firefox */
}