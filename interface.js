spaces.forEach((space) => space.addEventListener("click", handleClick));

document.getElementById("sel-h").addEventListener("click", activeScoreHH);
document.getElementById("sel-r").addEventListener("click", activeScoreHR);

function activeScoreHH() {
    document.querySelector(".score_hum-rob").classList.remove('active');
    document.querySelector(".score_hum-hum").classList.add('active');
}

function activeScoreHR() {
    document.querySelector(".score_hum-hum").classList.remove('active');
    document.querySelector(".score_hum-rob").classList.add('active');
}

function handleClick(event) {
    
    let space = event.target;
    let position = space.id;

    if (board[position] != "") return;
    
    if (playerMoviment(position)) setTimeout(() => {message(checkingWinnerOrTie()[1])}, 220);

    updateSpace(position, space);

    if (selectOpponent == "1") setTimeout(() => {if (robotMoviment()) {setTimeout(() => {message(checkingWinnerOrTie()[1])}, 600)}}, 700);

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

    let audioHum = new Audio('assets/audios/huhum.mp3');
    let audioApplause = new Audio('assets/audios/applause.mp3');
    let whoo = new Audio('assets/audios/whoo.mp3');
    let cat = new Audio('assets/audios/cat.mp3');
    let humanSymbol;
    let robotSymbol;
    selectSymbol == 0 ? humanSymbol = 'o' : humanSymbol = 'x';
    selectSymbol == 0 ? robotSymbol = 'x' : robotSymbol = 'o';

    if (selectOpponent == "0" && res == "x") {
        document.querySelector('#win-who').classList.add('xWin');
        modalOn();
        whoo.play();
        upScore("scoreX")
    }

    if (selectOpponent == "0" && res == "o") {
        document.querySelector('#win-who').classList.add('oWin');
        modalOn();
        whoo.play();
        upScore("scoreO")
    }

    if (selectOpponent == "1" && res == humanSymbol) {
        document.querySelector('#win-who').classList.add('hWin');
        modalOn();
        audioHum.play();
        upScore("scoreH")
    }
    
    if (selectOpponent == "1" && res == robotSymbol) {
        audioApplause.play();
        document.querySelector('#win-who').classList.add('rWin');
        modalOn();
        upScore("scoreR")
    }

    if (res == "tie") {
        modalOnTie();
        cat.play();
    }
}

function modalOn() {
    document.querySelector('.modal-overlay').classList.add('active');
    document.querySelector('#win-run').classList.add('run');
}

function modalOnTie() {
    document.getElementById("win-who").style.width = "350px";
    document.getElementById("win-who").style.height = "350px";
    document.querySelector('#win-who').classList.add('tie');
    document.getElementById("win-run").src = "";
    document.querySelector('.modal-overlay').classList.add('active');
}

function upScore(sc) {
    let player = document.getElementById(sc);
    let score = parseInt(player.innerHTML) + 1;
    player.innerHTML = score;
}

function changeBG() {
    let bg = window.getComputedStyle(document.body,null).getPropertyValue('background-color');
    
    bg == "rgb(19, 21, 21)" ? document.body.style.backgroundColor = "rgb(56, 36, 55)" : document.body.style.backgroundColor = "rgb(19, 21, 21)";
}