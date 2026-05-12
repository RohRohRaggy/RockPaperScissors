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
    } else {
        resultOutput.innerHTML = "CPU wins!";
    }
}

//Button click event ingekort
const btns = document.querySelectorAll("button");
btns.forEach(btn => {
    btn.addEventListener("click", play);
});
