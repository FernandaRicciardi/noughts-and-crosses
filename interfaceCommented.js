// //For each space (element of spaces), the function handleClick() will be executed when the space is clicked:
spaces.forEach((space) => space.addEventListener("click", handleClick));

document.getElementById("sel-h").addEventListener("click", activeScoreHH);
document.getElementById("sel-r").addEventListener("click", activeScoreHR);

// It activates the right score table (human vs human OR human vs robot):
function activeScoreHH() {
    document.querySelector(".score_hum-rob").classList.remove('active');
    document.querySelector(".score_hum-hum").classList.add('active');
}

function activeScoreHR() {
    document.querySelector(".score_hum-hum").classList.remove('active');
    document.querySelector(".score_hum-rob").classList.add('active');
}

//When the space is clicked:
function handleClick(event) {
    
    let space = event.target; //It gets the clicked element (<div id="0 to 8" class="space"></div>)
    let position = space.id; //It gets the ID of this clicked element (0 to 8)

    if (board[position] != "") return;
    
    // If playerMoviment function returns TRUE, it calls the function message
    if (playerMoviment(position)) setTimeout(() => {message(checkingWinnerOrTie()[1])}, 220);

    updateSpace(position, space);

    // It checks if the robot shoul play and if robotMoviment function returns TRUE, it calls the function message
    if (selectOpponent == "1") setTimeout(() => {if (robotMoviment()) {setTimeout(() => {message(checkingWinnerOrTie()[1])}, 600)}}, 700);

}

//It updates the spaces on the board after each moviment
function updateSpace(position, space) {
    space.innerHTML = `<div class="${board[position]}"></div>`;
}

// It changes the orange crayon to blue
function blueCrayon() {
    let c = document.getElementById("gameBoard");
    c.addEventListener("mouseover", function(event) {event.target.style.cursor = "url(assets/b-blue-crayon.png), pointer"});
}

// It changes de blue crayon to orange
function orangeCrayon() {
    let c = document.getElementById("gameBoard");
    c.addEventListener("mouseover", function(event) {event.target.style.cursor = "url(assets/b-orange-crayon.png), pointer"});
}

// Messages: you win, robot wins, tie
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

    // If the winner is X (human vs human):
    if (selectOpponent == "0" && res == "x") {
        document.querySelector('#win-who').classList.add('xWin');
        modalOn();
        whoo.play();
        upScore("scoreX")
    }

    // If the winner is O (human vs human):
    if (selectOpponent == "0" && res == "o") {
        document.querySelector('#win-who').classList.add('oWin');
        modalOn();
        whoo.play();
        upScore("scoreO")
    }

    // If you are the winner (human vs robot):
    if (selectOpponent == "1" && res == humanSymbol) {
        document.querySelector('#win-who').classList.add('hWin');
        modalOn();
        audioHum.play();
        upScore("scoreH")
    }
    
    // If the robot is the winner (human vs robot):
    if (selectOpponent == "1" && res == robotSymbol) {
        audioApplause.play();
        document.querySelector('#win-who').classList.add('rWin');
        modalOn();
        upScore("scoreR")
    }

    // No winner:
    if (res == "tie") {
        modalOnTie();
        cat.play();
    }
}

// Modal box
function modalOn() {
    document.querySelector('.modal-overlay').classList.add('active');
    document.querySelector('#win-run').classList.add('run');
}

// Modal box
function modalOnTie() {
    document.getElementById("win-who").style.width = "350px";
    document.getElementById("win-who").style.height = "350px";
    document.querySelector('#win-who').classList.add('tie');
    document.getElementById("win-run").src = "";
    document.querySelector('.modal-overlay').classList.add('active');
}

// It updates the score:
function upScore(sc) {
    let player = document.getElementById(sc);
    let score = parseInt(player.innerHTML) + 1;
    player.innerHTML = score;
}

// It changes the background colour if the chameleon is clicked:
function changeBG() {
    let bg = window.getComputedStyle(document.body,null).getPropertyValue('background-color');
    
    bg == "rgb(19, 21, 21)" ? document.body.style.backgroundColor = "rgb(56, 36, 55)" : document.body.style.backgroundColor = "rgb(19, 21, 21)";
}