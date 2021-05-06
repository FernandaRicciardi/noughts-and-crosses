spaces.forEach((space) => space.addEventListener("click", handleClick));

function handleClick(event) {
    
    let space = event.target;
    let position = space.id;
    
    if (playerMoviment(position)) setTimeout(() => {message(checkingWinner()[1])}, 20);

    updateSpace(position, space);

    if (selectOpponent == "1") setTimeout(() => {if (robotMoviment()) {setTimeout(() => {message(checkingWinner()[1])}, 520)}}, 700);

}

function updateSpace(position, space) {
    space.innerHTML = `<div class="${board[position]}"></div>`;
}

function blueCrayon() {
    let c = document.getElementById("gameBoard");
    c.addEventListener("mouseover", function(event) {event.target.style.cursor = "url(assets/b-blue-crayon.png), pointer"});
}

function orangeCrayon() {
    let c = document.getElementById("gameBoard");
    c.addEventListener("mouseover", function(event) {event.target.style.cursor = "url(assets/b-orange-crayon.png), pointer"});
}

function message(symbolWinner) {

    let audioHum = new Audio('assets/huhum.mp3');
    let audioApplause = new Audio('assets/applause.mp3');
    let whoo = new Audio('assets/whoo.mp3');
    let humanSymbol;

    selectSymbol == 0 ? humanSymbol = 'o' : humanSymbol = 'x';

    if (selectOpponent == "0" && symbolWinner == "x") {
        document.querySelector('#win-who').classList.add('xWin');
        modalOn();
        whoo.play();
    }

    if (selectOpponent == "0" && symbolWinner =="o") {
        document.querySelector('#win-who').classList.add('oWin');
        modalOn();
        whoo.play();
    }

    if (selectOpponent == "1" && symbolWinner == humanSymbol) {
        document.querySelector('#win-who').classList.add('hWin');
        modalOn();
        audioHum.play();
    }
    
    if (selectOpponent == "1" && symbolWinner != humanSymbol) {
        audioApplause.play();
        document.querySelector('#win-who').classList.add('rWin');
        modalOn();
    }
}

function modalOn() {
    document.querySelector('.modal-overlay').classList.add('active');
    document.querySelector('#win-run').classList.add('run');
}

function playAgain() {

    document.querySelector('.modal-overlay').classList.remove('active');
    document.querySelector('#win-run').classList.remove('run');
    document.querySelectorAll('.space').classList.remove('o');
    document.querySelectorAll('.space').classList.remove('x');
    whoo.stop();
    audioApplause.stop();

    board = ["", "", "", "", "", "", "", "", ""];
    playerTurn = 0;
    gameOver = false;
    let symbol = " ";

    spaces.forEach((space)=>{
        space.innerHTML = `<div class='${symbol}'></div>`
    });

    spaces.forEach((space) => space.addEventListener("click", handleClick));
}

function reloadGame() {
    location.reload();
}