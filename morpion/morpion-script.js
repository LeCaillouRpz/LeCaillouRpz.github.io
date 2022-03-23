const WINNING_COMBINAISONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const BOXES = document.querySelectorAll(".box");
const RESET_BUTTON = document.querySelector(".reset-button");
const MODE_BUTTON = document.querySelector(".switch-mode");
const TEXT = document.querySelector("h1");

var PvP = true;
var currentPlayer;

function playSound(soundfile){
    document.getElementById("sound").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\"/>";
}
function start() {
    playSound("ResetSound.mp3")
    BOXES.forEach(box => {
        box.innerText = "";
        box.classList.add("clickable");
        box.classList.remove("O-Highlight");
        box.classList.remove("X-Highlight");
    })
    RESET_BUTTON.classList.remove("showing");
    TEXT.innerText = "";
    currentPlayer = 1;
}
function end() {
    RESET_BUTTON.classList.add("showing");
    BOXES.forEach(box => {
        box.classList.remove("clickable");
    })

}
function displayWin(i, player) {
    playSound("WinSound.mp3")
    var highlightClass = "X-Highlight";
    if (PvP) {
        if (player == 1) {
            TEXT.innerText = "Victoire de X !"
        } else {
            highlightClass = "O-Highlight";
            TEXT.innerText = "Victoire de  O!"
        }
    } else {
        if (player == 1) {
            TEXT.innerText = "Victoire !"
        } else {
            highlightClass = "O-Highlight"
            TEXT.innerText = "Défaite !"
        }
    }
    BOXES[WINNING_COMBINAISONS[i][0]].classList.add(highlightClass);
    BOXES[WINNING_COMBINAISONS[i][1]].classList.add(highlightClass);
    BOXES[WINNING_COMBINAISONS[i][2]].classList.add(highlightClass);
    end();
}
function displayFull() {
    playSound("DrawSound.mp3")
    TEXT.innerText = "Partie nulle.";
    end();
}
function play(box, player) {
    playSound("BoxClickSound.mp3");
    if (player == 1) {
        box.innerText = "X";
    } else {
        box.innerText = "O";
    }
    box.classList.remove("clickable");
    var eval = evaluation(getGrid());
    if (eval[0]) {
        displayWin(eval[2], eval[1]);
    } else {
        if (eval[1]) {
            displayFull();
        } else {
            if (PvP) {
                currentPlayer = -currentPlayer;
            } else if (player != 0){
                computerPlay();
            }
        }
    }
}
function getGrid() {
    var output = [];
    for (var i = 0; i < 9; i++) {
        if (BOXES[i].innerHTML == "X") {
            output.push(1)
        } else if (BOXES[i].innerHTML == "O") {
            output.push(-1)
        } else {
            output.push(0)
        }
    }
    return output;
}
function leftMoves(grid) {
    var output = [];
    for (var i = 0; i < 9; i++) {
        if (grid[i] == 0) {
            output.push(i);
        }
    }
    return output;
}
function canWin(grid, player) {
    var leftToPlay = leftMoves(grid);
    for (var i in leftToPlay) {
        var nextGrid = grid.map((x) => x);
        nextGrid[leftToPlay[i]] = player;
        if (evaluation(nextGrid)[0] && evaluation(nextGrid)[1] == player) {
            return [true, leftToPlay[i]];
        }
    }
    return false;
}
function evaluation(grid) {
    for (var i = 0; i < WINNING_COMBINAISONS.length; i++) {
        var check = grid[WINNING_COMBINAISONS[i][0]]
                    + grid[WINNING_COMBINAISONS[i][1]]
                    + grid[WINNING_COMBINAISONS[i][2]];
        if (check == 3) {
            return [true, 1, i];
        } else if (check == -3) {
            return [true, -1, i]
        }
    }
    for (var i = 0; i < BOXES.length; i++) {
        if (BOXES[i].innerText == "") {
            return [false, false];
        }
    }
    return [false, true];
}
function computerPlay() {
    play(BOXES[computerAlgo(getGrid())], 0);
}
function computerAlgo(grid) {
    var moves = 9 - leftMoves(grid).length;
    var winPossibility = canWin(grid, -1);
    if (winPossibility[0]) {
        return winPossibility[1];
    }
    var defeatPossibility = canWin(grid, 1);
    if (defeatPossibility[0]) {
        return defeatPossibility[1];
    }
    if (moves == 3 && ((grid[0] && grid[8]) || (grid[2] && grid[6]))) {
        return [1, 3, 5, 7].sort(() => Math.random() - 0.5)[0];
    }
    if (moves == 3 && ((grid[0] && grid[5]) || (grid[2] && grid[3]))) {
        return 1
    }
    if (moves == 3 && ((grid[0] && grid[7]) || (grid[6] && grid[1]))) {
        return 3
    }
    if (moves == 3 && ((grid[8] && grid[1]) || (grid[2] && grid[7]))) {
        return 5
    }
    if (moves == 3 && ((grid[6] && grid[5]) || (grid[8] && grid[3]))) {
        return 7
    }
    if (!grid[4]) {
        return 4
    }
    if (!grid[0]) {
        return 0
    }
    if (!grid[2]) {
        return 2
    }
    if (!grid[6]) {
        return 6
    }
    if (!grid[8]) {
        return 8
    }
    var randGrid = leftMoves(grid).sort(() => Math.random() - 0.5);
    return randGrid[0];
}
function onClick(box) {
    if (box.classList.contains("clickable")) {
        play(box, currentPlayer);
    }
}

BOXES.forEach(box => {
    box.addEventListener("click", () => {
        onClick(box);
    })
})
RESET_BUTTON.addEventListener("click", () => {
    start();
})
MODE_BUTTON.addEventListener("click", () => {
    if (MODE_BUTTON.innerHTML == '<i class="fas fa-bolt"></i>') {
        PvP = false;
        MODE_BUTTON.innerHTML = '<i class="fas fa-microchip"></i>';
    } else {
        PvP = true;
        MODE_BUTTON.innerHTML = '<i class="fas fa-bolt"></i>';
    }
    start()
})


console.log(canWin([1, 1, 0, -1, 0, -1, 0, 0, 0]))
start();
