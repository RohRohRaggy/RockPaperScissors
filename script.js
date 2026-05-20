// Select all necessary HTML elements
const humanOutput = document.querySelector("#human");
const humanWins = document.querySelector("#HWins");
const humanLosses = document.querySelector("#HLosses");
const computerOutput = document.querySelector("#computer");
const computerWins = document.querySelector("#CPUWins");
const computerLosses = document.querySelector("#CPULosses");
const resultOutput = document.querySelector("#result");

//image choice for each option
const choiceImages = {
    rock: "images/Rock.jpeg",
    paper: "images/paper.jpeg",
    scissors: "images/scissors.jpeg",
    lizard: "images/Lizard.jpeg",
    spock: "images/Spock.jpeg"
};

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
    // Disable all buttons during the roll to prevent spamming inputs
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach(btn => btn.disabled = true);

    // Get and display the player's choice instantly using an image tag
    humanChoice = event.target.id;
    humanOutput.innerHTML = `<img src="${choiceImages[humanChoice]}" class="choice-img" id="player-img" alt="${humanChoice}">`;

    // Reset layout text status and clear old color animation classes
    resultOutput.innerHTML = "Rolling...";
    resultOutput.classList.remove("text-win", "text-lose");
    computerOutput.classList.add("cpu-rolling");

    let rollCount = 0;
    const maxRolls = 30; // Total cycles before settling on the choice

    // Start the slot machine rolling loop
    const rollInterval = setInterval(() => {
        rdmnum(); 
        computerOutput.innerHTML = `<img src="${choiceImages[computerChoice]}" class="choice-img" id="cpu-img" alt="${computerChoice}">`;
        rollCount++;

        // When the rolling loop finishes:
        if (rollCount >= maxRolls) {
            clearInterval(rollInterval); 

            // Stop the vertical smear blur effect
            computerOutput.classList.remove("cpu-rolling");

            // Calculate the score, update scoreboard, and capture the winner
            const winner = getResult();

            // Grab the fresh image element references from the DOM
            const playerImg = document.querySelector("#player-img");
            const cpuImg = document.querySelector("#cpu-img");

            // Apply specific green/red colors and shake classes based on the winner
            if (winner === "player") {
                resultOutput.classList.add("text-win");
                if (playerImg) playerImg.classList.add("img-win");
                if (cpuImg) cpuImg.classList.add("img-lose");
            } else if (winner === "cpu") {
                resultOutput.classList.add("text-lose");
                if (playerImg) playerImg.classList.add("img-lose");
                if (cpuImg) cpuImg.classList.add("img-win");
            } else if (winner === "tie") {
                if (playerImg) playerImg.classList.add("impact-shake");
                if (cpuImg) cpuImg.classList.add("impact-shake");
            }

            // Clean up all animation and border glow classes after 600ms
            setTimeout(() => {
                resultOutput.classList.remove("text-win", "text-lose");
                if (playerImg) playerImg.classList.remove("img-win", "img-lose", "impact-shake");
                if (cpuImg) cpuImg.classList.remove("img-win", "img-lose", "impact-shake");
            }, 600);

            // Re-enable the action buttons for the next round
            allButtons.forEach(btn => btn.disabled = false);
        }
    }, 40); // Runs every 40ms for a rapid rolling animation
}

// Generates a random choice for the computer
function rdmnum() {
    // Pick a random number between 1 and 5
    const randomNumber = Math.floor(Math.random() * 5) + 1;

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

// Calculates the winner, updates scores, and returns results for animations
function getResult() {
    let winner = "";

    // Check for a tie
    if (humanChoice === computerChoice) {
        resultOutput.innerHTML = "It's a tie!";
        winner = "tie";
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
        winner = "player";
    } else {
        // CPU wins if it is not a tie and the player didn't win
        let ruleText = winRules[computerChoice + "-" + humanChoice];
        resultOutput.innerHTML = "CPU wins! " + ruleText;
        hLossesCount++;
        cpuWinsCount++;
        winner = "cpu";
    }

    // Update the score displays inside the HTML
    humanWins.innerHTML = hWinsCount;
    humanLosses.innerHTML = hLossesCount;
    computerWins.innerHTML = cpuWinsCount;
    computerLosses.innerHTML = cpuLossesCount;

    // Send the outcome string back to play() to handle color classes
    return winner;
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