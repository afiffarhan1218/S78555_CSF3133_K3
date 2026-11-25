// Global state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Starts the game after validating that the player entered a name
function startGame() {
    let name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + name + "!";
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
}

// Randomly selects and returns "rock", "paper", or "scissors"
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Plays one round of Rock, Paper, Scissors
function playRound(playerChoice) {
    // Prevent playing before clicking Start Game
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    roundCount++;

    // Update choice images
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    let outcome = "";
    let resultEl = document.getElementById("result");

    // Determine winner using if...else rules
    if (playerChoice === computerChoice) {
        outcome = "Draw";
        draws++;
        resultEl.innerHTML = "Round " + roundCount + ": It's a Draw!";
        resultEl.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        outcome = "Win";
        wins++;
        resultEl.innerHTML = "Round " + roundCount + ": You Win!";
        resultEl.style.color = "green";
    } else {
        outcome = "Lose";
        losses++;
        resultEl.innerHTML = "Round " + roundCount + ": You Lose!";
        resultEl.style.color = "red";
    }

    // Update scoreboard display
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Record result in array and append row to history table
    results.push(outcome);
    let historyBody = document.getElementById("historyBody");
    historyBody.innerHTML +=
        "<tr>" +
            "<td>" + roundCount + "</td>" +
            "<td>" + playerChoice + "</td>" +
            "<td>" + computerChoice + "</td>" +
            "<td>" + outcome + "</td>" +
        "</tr>";
}

// Loops through the results array to calculate and display win percentage
function showSummary() {
    if (results.length === 0) {
        alert("No rounds played yet.");
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let winPercentage = Math.round((winCount / results.length) * 100);
    document.getElementById("summaryText").innerHTML =
        "You played " + results.length + " rounds and won " + winPercentage + "%.";
}

// Resets scores, history table, arrays, and messages back to initial state
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}