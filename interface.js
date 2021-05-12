spaces.forEach((space) => space.addEventListener("click", handleClick));

function handleClick(event) {
    
    let space = event.target;
    let position = space.id;
    
    if (playerMoviment(position)) setTimeout(() => {message(checkingWinnerOrTie()[1])}, 20);

    updateSpace(position, space);

    if (selectOpponent == "1") setTimeout(() => {if (robotMoviment()) {setTimeout(() => {message(checkingWinnerOrTie()[1])}, 520)}}, 700);

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

function message(res) {

    console.log(`de dentro da message func ${res}`)

    let audioHum = new Audio('assets/huhum.mp3');
    let audioApplause = new Audio('assets/applause.mp3');
    let whoo = new Audio('assets/whoo.mp3');
    let humanSymbol;
    let robotSymbol;
    selectSymbol == 0 ? humanSymbol = 'o' : humanSymbol = 'x';
    selectSymbol == 0 ? robotSymbol = 'x' : robotSymbol = 'o';

    if (selectOpponent == "0" && res == "x") {
        document.querySelector('#win-who').classList.add('xWin');
        modalOn();
        whoo.play();
    }

    if (selectOpponent == "0" && res == "o") {
        document.querySelector('#win-who').classList.add('oWin');
        modalOn();
        whoo.play();
    }

    if (selectOpponent == "1" && res == humanSymbol) {
        document.querySelector('#win-who').classList.add('hWin');
        modalOn();
        audioHum.play();
    }
    
    if (selectOpponent == "1" && res == robotSymbol) {
        audioApplause.play();
        document.querySelector('#win-who').classList.add('rWin');
        modalOn();
    }

    if (res == "tie") {
        alert("It is a tie")
    }
}

function modalOn() {
    document.querySelector('.modal-overlay').classList.add('active');
    document.querySelector('#win-run').classList.add('run');
}

function modalOnTie() {
    document.querySelector('.modal-overlay').classList.add('active');
    document.querySelector('#win-run').classList.add('run');
}

function playAgain() {
    
    document.querySelector('.modal-overlay').classList.remove('active');
    document.querySelector('#win-run').classList.remove('run');
    document.querySelector('#win-who').classList.remove('xWin');
    document.querySelector('#win-who').classList.remove('oWin');
    document.querySelector('#win-who').classList.remove('hWin');
    document.querySelector('#win-who').classList.remove('rWin');
   
    board = ["", "", "", "", "", "", "", "", ""];
    playerTurn = 0;
    gameOver = false;
    result = ""
    let symbol = " ";

    spaces.forEach((space)=>{
        space.innerHTML = `<div class='${symbol}'></div>`
    });

    spaces.forEach((space) => space.addEventListener("click", handleClick));

    if (selectOpponent == "0" && selectSymbol == 0) blueCrayon();
    if (selectOpponent == "0" && selectSymbol == 1) orangeCrayon();
}

function reloadGame() {
    location.reload();
}