// Select all necessary HTML elements
const humanOutput = document.querySelector("#human");
const humanWins = document.querySelector("#HWins");
const humanLosses = document.querySelector("#HLosses");
const computerOutput = document.querySelector("#computer");
const computerWins = document.querySelector("#CPUWins");
const computerLosses = document.querySelector("#CPULosses");
const resultOutput = document.querySelector("#result");

// Initialize scores and choices
let hWinsCount = 0;
let hLossesCount = 0;
let cpuWinsCount = 0;
let cpuLossesCount = 0;
let humanChoice = "";
let computerChoice = "";

// Set initial text on the screen
humanWins.innerHTML = hWinsCount;
humanLosses.innerHTML = hLossesCount;
computerWins.innerHTML = cpuWinsCount;
computerLosses.innerHTML = cpuLossesCount;
humanOutput.innerHTML = "Make your choice";
computerOutput.innerHTML = "Deciding...";
resultOutput.innerHTML = "Result";

// Main function triggered on button click
function play(event) {
    // Get the player's choice from the button ID
    humanChoice = event.target.id;
    humanOutput.innerHTML = humanChoice;

    // Generate the computer's choice
    rdmnum();
    computerOutput.innerHTML = computerChoice;

    // Check who won
    getResult();
}

// Generates a random choice for the computer
function rdmnum() {
    // Pick a random number between 1 and 3
    const randomNumber = Math.floor(Math.random() * 3) + 1;

    // Assign rock, paper, or scissors based on the number
    switch (randomNumber) {
        case 1:
            computerChoice = 'rock';
            break;
        case 2:
            computerChoice = 'scissors';
            break;
        case 3:
            computerChoice = 'paper';
            break;
        case 4:
            computerChoice = 'lizard';
            break;
        case 5:
            computerChoice = 'spock';
            break;
        default:
    }
}

// Calculates the winner and updates scores
function getResult() {
    // Check for a tie
    if (humanChoice === computerChoice) {
        resultOutput.innerHTML = "It's a tie!";
    } else if (
        // Winning conditions for the player
        (humanChoice === "rock" && (computerChoice === "scissors" || computerChoice === "lizard")) ||
        (humanChoice === "paper" && (computerChoice === "rock" || computerChoice === "spock")) ||
        (humanChoice === "scissors" && (computerChoice === "paper" || computerChoice === "lizard")) ||
        (humanChoice === "lizard" && (computerChoice === "spock" || computerChoice === "paper")) ||
        (humanChoice === "spock" && (computerChoice === "scissors" || computerChoice === "rock"))
    ) {
        // Player wins if their choice beats the computer's choice
        let ruleText = winRules[humanChoice + "-" + computerChoice];
        resultOutput.innerHTML = "You win! " + ruleText;
        hWinsCount++;
        cpuLossesCount++;
    } else {
        // CPU wins if it is not a tie and the player didn't win
        let ruleText = winRules[computerChoice + "-" + humanChoice];
        resultOutput.innerHTML = "CPU wins! " + ruleText;
        hLossesCount++;
        cpuWinsCount++;
    }

    // Update the score display
    humanWins.innerHTML = hWinsCount;
    humanLosses.innerHTML = hLossesCount;
    computerWins.innerHTML = cpuWinsCount;
    computerLosses.innerHTML = cpuLossesCount;
}

// Attach click event listeners to all buttons
const btns = document.querySelectorAll("button");
btns.forEach(btn => {
    btn.addEventListener("click", play);
});

// Define the rules for winning combinations
const winRules = {
    "rock-scissors": "Rock crushes Scissors",
    "rock-lizard": "Rock crushes Lizard",
    "paper-rock": "Paper covers Rock",
    "paper-spock": "Paper disproves Spock",
    "scissors-paper": "Scissors cuts Paper",
    "scissors-lizard": "Scissors decapitates Lizard",
    "lizard-spock": "Lizard poisons Spock",
    "lizard-paper": "Lizard eats Paper",
    "spock-scissors": "Spock smashes Scissors",
    "spock-rock": "Spock vaporizes Rock"
};