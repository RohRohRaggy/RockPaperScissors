//span elements
const humanOutput = document.querySelector("#human");
const humanWins = document.querySelector("#HWins");
const humanLosses = document.querySelector("#HLosses");
const computerOutput = document.querySelector("#computer");
const computerWins = document.querySelector("#CPUWins");
const computerLosses = document.querySelector("#CPULosses");
const resultOutput = document.querySelector("#result");

let hWinsCount = 0;
let hLossesCount = 0;
let cpuWinsCount = 0;
let cpuLossesCount = 0;
let humanChoice = "";
let computerChoice = "";

humanWins.innerHTML = hWinsCount;
humanLosses.innerHTML = hLossesCount;
computerWins.innerHTML = cpuWinsCount;
computerLosses.innerHTML = cpuLossesCount;
humanOutput.innerHTML = "Make your choice";
computerOutput.innerHTML = "Deciding...";
resultOutput.innerHTML = "Result";

//play
function play(event) {
    humanChoice = event.target.id;
    humanOutput.innerHTML = humanChoice;
    rdmnum();
    computerOutput.innerHTML = computerChoice;
    getResult();
}
//random number function toegevoegd om herhaling te vermijden
function rdmnum() {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    switch (randomNumber) { //if statements vervangen door switch case
        case 1:
            computerChoice = 'rock';
            break;
        case 2:
            computerChoice = 'scissors';
            break;
        case 3:
            computerChoice = 'paper';
            break;
        default:

    }
}

//RPS result
function getResult() {
    if (humanChoice === computerChoice) {
        resultOutput.innerHTML = "It's a tie!";
    } else if (
        //winning conditions for human
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        resultOutput.innerHTML = "You win!";
        hWinsCount++;
        cpuLossesCount++;
    } else {
        resultOutput.innerHTML = "CPU wins!";
        hLossesCount++;
        cpuWinsCount++;
    }
    humanWins.innerHTML = hWinsCount;
    humanLosses.innerHTML = hLossesCount;
    computerWins.innerHTML = cpuWinsCount;
    computerLosses.innerHTML = cpuLossesCount;
}

//Button click event ingekort
const btns = document.querySelectorAll("button");
btns.forEach(btn => {
    btn.addEventListener("click", play);
});
