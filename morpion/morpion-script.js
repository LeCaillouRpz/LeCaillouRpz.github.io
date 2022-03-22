const LINES = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
const CASES = document.querySelectorAll(".case");
const RESET_BUTTON = document.querySelector(".reset-button");
const TEXT = document.querySelector("h1");
var victoire = false;
var joueur = "";

function start() {
    CASES.forEach(btn => {
        btn.innerText = "";
        btn.classList. add("clickable");
        btn.classList.remove("highlighted");
        btn.classList.remove("clicked");
    })
    RESET_BUTTON.classList.remove("showing");
    TEXT.innerText = ""
    victoire = false;
    joueur = "X"
}
function end() {
    joueur = "";
    RESET_BUTTON.classList.add("showing");
}
function checkWin() {
    for (var i = 0; i < LINES.length; i++) {
        var check = CASES[LINES[i][0] - 1].innerText
                    + CASES[LINES[i][1] - 1].innerText
                    + CASES[LINES[i][2] - 1].innerText;
        if (check == "XXX") {
            TEXT.innerText = "Victoire du joueur X !";
            victoire = true;
        } else if (check == "OOO") {
            TEXT.innerText = "Victoire du joueur O !";
            victoire = true;
        }
        if (victoire) {
            CASES[LINES[i][0] - 1].classList.add("highlighted");
            CASES[LINES[i][1] - 1].classList.add("highlighted");
            CASES[LINES[i][2] - 1].classList.add("highlighted");
            end();
            return true;
        }
    }
    return false;
}
function checkFull() {
    for (var i = 0; i < LINES.length; i++) {
        if (CASES[i].innerText == "") {
            return;
        }
    }
    TEXT.innerText = "Partie nulle.";
    end();
}
function onClick(btn) {
    if (btn.innerText == "") {
        if (joueur !== "") { 
            btn.innerText = joueur;
            if (joueur == "X") {
                joueur = "O";
            } else {
                joueur = "X";
            };
            btn.classList.remove("clickable");
            btn.classList.add("clicked");
            console.log("Au tour du joueur " +  joueur + ".");
            checkWin();
            if (!victoire) {
                checkFull()
            }
        };
    }
}

CASES.forEach(btn => {
    btn.addEventListener("click", () => {
        onClick(btn);
    })
})
RESET_BUTTON.addEventListener("click", () => {
    start();
})

start();
