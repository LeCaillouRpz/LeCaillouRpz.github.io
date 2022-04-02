const BOARD = document.querySelector(".board");
const RED_SCORE = document.querySelector(".red-score");
const GREEN_SCORE = document.querySelector(".green-score")

/* Creation of the grid*/

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 11; j++) {
        var space = document.createElement("div");
        space.id = String(i) + "-" + String(j);
        if (i%2 == 0 && j%2 == 0) {space.classList.add("smallSquare");}
        else if (i%2 == 0 && j%2 != 0) {space.classList.add("spaces", "horizontal");}
        else if (i%2 != 0 && j%2 != 0) {space.classList.add("bigSquare");}
        else {space.classList.add("spaces", "vertical");}
        BOARD.appendChild(space);
    }
}
const SPACES = document.querySelectorAll(".spaces");
SPACES.forEach(space => {
    space.addEventListener("click", () => {
        if (space.classList.contains("clickable")) {
            space.classList.remove("clickable");
            play(space);
        }
    });
});
const SQUARES = document.querySelectorAll(".bigSquare");
const RESET_BUTTON = document.querySelector(".reset-button");
RESET_BUTTON.addEventListener("click", () => {
    start();
})

/* Variables */

var currentPlayer = 1;

/* Functions */

function start() {
    SPACES.forEach(space => {
        space.classList.remove("claimedByRed", "claimedByGreen");
        space.classList.add("clickable");
    });
    SQUARES.forEach(square => {
        square.classList.remove("claimedByRed", "claimedByGreen");
    })
    RED_SCORE.innerText = 0;
    GREEN_SCORE.innerText = 0;
}
function incrementScore(player) {
    if (player == 1) {
        RED_SCORE.innerText = String(parseInt(RED_SCORE.innerText) + 1);
    } else {
        GREEN_SCORE.innerText = String(parseInt(GREEN_SCORE.innerText) + 1);
    }
}
function play(space) {
    if (currentPlayer == 1) {space.classList.add("claimedByRed")} 
    else {space.classList.add("claimedByGreen");}
    check(space);
    currentPlayer = -currentPlayer;
}
function check(space) {
    var id = space.id.split("-");
    if (space.classList.contains("horizontal")) {
        if (id[0] == 0) {
            checkSurrounded(document.getElementById("1-" + id[1]));
        } else if (id[0] == 8) {
            checkSurrounded(document.getElementById("7-" + id[1]));
        } else {
            checkSurrounded(document.getElementById(String(parseInt(id[0]) - 1) + "-" + id[1]));
            checkSurrounded(document.getElementById(String(parseInt(id[0]) + 1) + "-" + id[1]));
        }
    } else {
        if (id[1] == 0) {
            checkSurrounded(document.getElementById(id[0] + "-1"));
        } else if (id[1] == 10) {
            checkSurrounded(document.getElementById(id[0] + "-9"));
        } else {
            checkSurrounded(document.getElementById(id[0] + "-" + String(parseInt(id[1]) - 1)));
            checkSurrounded(document.getElementById(id[0] + "-" + String(parseInt(id[1]) + 1)));
        }
    }
}
function checkSurrounded(square) {
    var id = square.id.split("-");
    var spacesToCheck = [document.getElementById(id[0] + "-" + String(parseInt(id[1]) - 1)),
                         document.getElementById(id[0] + "-" + String(parseInt(id[1]) + 1)),
                         document.getElementById(String(parseInt(id[0]) - 1) + "-" + id[1]),
                         document.getElementById(String(parseInt(id[0]) + 1) + "-" + id[1])];
    var s = 0
    for (var i in spacesToCheck) {
        if (spacesToCheck[i].classList.contains("claimedByRed") || spacesToCheck[i].classList.contains("claimedByGreen")) {
            s += 1;
        }
    }
    if (s == 4) {
        if (currentPlayer == 1) {
            square.classList.add("claimedByRed");
        } else {
            square.classList.add("claimedByGreen"); 
        }
    }
}

start();