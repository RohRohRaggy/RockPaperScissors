//span elements
const humanOutput = document.querySelector("#human");
const computerOutput = document.querySelector("#computer");
const resultOutput = document.querySelector("#result");

let humanChoice = "";
let computerChoice = "";

humanOutput.innerHTML = "Make your choice";
computerOutput.innerHTML = "Deciding...";
resultOutput.innerHTML = "Result";

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
    } else {
        resultOutput.innerHTML = "CPU wins!";
    }
}

//Button click event
const rock = document.querySelector("#rock");
rock.addEventListener("click", function (event) {
    humanChoice = event.target.id;
    humanOutput.innerHTML = humanChoice;
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 1) {
        computerChoice = 'rock';
    }
    if (randomNumber === 2) {
        computerChoice = 'scissors';
    }
    if (randomNumber === 3) {
        computerChoice = 'paper';
    }
    computerOutput.innerHTML = computerChoice;
    getResult();
});

const paper = document.querySelector("#paper");
paper.addEventListener("click", function (event) {
    humanChoice = event.target.id;
    humanOutput.innerHTML = humanChoice;
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 1) {
        computerChoice = 'rock';
    }
    if (randomNumber === 2) {
        computerChoice = 'scissors';
    }
    if (randomNumber === 3) {
        computerChoice = 'paper';
    }
    computerOutput.innerHTML = computerChoice;
    getResult();
});

const scissors = document.querySelector("#scissors");
scissors.addEventListener("click", function (event) {
    humanChoice = event.target.id;
    humanOutput.innerHTML = humanChoice;
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 1) {
        computerChoice = 'rock';
    }
    if (randomNumber === 2) {
        computerChoice = 'scissors';
    }
    if (randomNumber === 3) {
        computerChoice = 'paper';
    }
    computerOutput.innerHTML = computerChoice;
    getResult();
});