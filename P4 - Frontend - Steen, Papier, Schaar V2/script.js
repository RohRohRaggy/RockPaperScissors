//span elements
const humanOutput = document.querySelector("#human");
const computerOutput = document.querySelector("#computer");
const resultOutput = document.querySelector("#result");

let humanChoice = "";
let computerChoice = "";

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
    if (randomNumber === 1) {
        computerChoice = 'rock';
    }
    if (randomNumber === 2) {
        computerChoice = 'scissors';
    }
    if (randomNumber === 3) {
        computerChoice = 'paper';
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
    } else {
        resultOutput.innerHTML = "CPU wins!";
    }
}

//Button click event
const rock = document.querySelector("#rock");
rock.addEventListener("click", play); //rock button event listener toegevoegd verwezen naar functie play()

const paper = document.querySelector("#paper");
paper.addEventListener("click", play); //paper button event listener toegevoegd verwezen naar functie play()

const scissors = document.querySelector("#scissors");
scissors.addEventListener("click", play); //scissors button event listener toegevoegd verwezen naar functie play()

