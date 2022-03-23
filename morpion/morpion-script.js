const LINES = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
const BOXES = document.querySelectorAll(".box");
const RESET_BUTTON = document.querySelector(".reset-button");
const TEXT = document.querySelector("h1");

var victoire = false;
var joueur = "";

function playSound(soundfile){
    document.getElementById("sound").innerHTML="<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\"/>";
}
function start() {
    BOXES.forEach(box => {
        box.innerText = "";
        box.classList. add("clickable");
        box.classList.remove("highlighted");
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
        var check = BOXES[LINES[i][0] - 1].innerText
                    + BOXES[LINES[i][1] - 1].innerText
                    + BOXES[LINES[i][2] - 1].innerText;
        if (check == "XXX") {
            TEXT.innerText = "Victoire du joueur X !";
            victoire = true;
        } else if (check == "OOO") {
            TEXT.innerText = "Victoire du joueur O !";
            victoire = true;
        }
        if (victoire) {
            playSound("WinSound.mp3")
            BOXES[LINES[i][0] - 1].classList.add("highlighted");
            BOXES[LINES[i][1] - 1].classList.add("highlighted");
            BOXES[LINES[i][2] - 1].classList.add("highlighted");
            end();
            return true;
        }
    }
    return false;
}
function checkFull() {
    for (var i = 0; i <= LINES.length; i++) {
        if (BOXES[i].innerText == "") {
            return;
        }
    }
    playSound("DrawSound.mp3")
    TEXT.innerText = "Partie nulle.";
    end();
}
function onClick(box) {
    if (box.innerText == "") {
        playSound("BoxClickSound.mp3")
        if (joueur !== "") { 
            box.innerText = joueur;
            if (joueur == "X") {
                joueur = "O";
            } else {
                joueur = "X";
            };
            box.classList.remove("clickable");
            console.log("Au tour du joueur " +  joueur + ".");
            checkWin();
            if (!victoire) {
                checkFull()
            }
        };
    }
}

BOXES.forEach(box => {
    box.addEventListener("click", () => {
        onClick(box);
    })
})
RESET_BUTTON.addEventListener("click", () => {
    playSound("ResetSound.mp3")
    start();
})

start();
