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
    // 1. Disable all buttons during the roll to prevent spamming
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach(btn => btn.disabled = true);

    // Get and display the player's choice instantly
    humanChoice = event.target.id;
    humanOutput.innerHTML = `<img src="${choiceImages[humanChoice]}" class="choice-img" alt="${humanChoice}">`;

    // Set a temporary rolling state for the results text
    resultOutput.innerHTML = "Rolling...";
    
    // Add the motion blur class to the computer output container
    computerOutput.classList.add("cpu-rolling");

    let rollCount = 0;
    const maxRolls = 15; // Number of times it cycles (15 rolls * 70ms = ~1 second total spin)

    // 2. Start the slot machine rolling loop
    const rollInterval = setInterval(() => {
        rdmnum(); // Generates a random temporary computerChoice
        
        // Flash the temporary random image on the screen
        computerOutput.innerHTML = `<img src="${choiceImages[computerChoice]}" class="choice-img" alt="${computerChoice}">`;
        rollCount++;

        // 3. When the rolling time finishes:
        if (rollCount >= maxRolls) {
            clearInterval(rollInterval); // Stop the loop

            // Remove the blur class so the final image snaps sharp
            computerOutput.classList.remove("cpu-rolling");

            // Run your logic on the final locked-in choice
            getResult();

            // Re-enable the buttons for the next round
            allButtons.forEach(btn => btn.disabled = false);
        }
    }, 70); // Updates the image every 70 milliseconds
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