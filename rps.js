//

document.getElementById('rock').addEventListener('click', () => {
    playGame('rock');
});

document.getElementById('paper').addEventListener('click', () => {
    playGame('paper');
});

document.getElementById('scissors').addEventListener('click', () => {
    playGame('scissors');
});

document.getElementById('reset-score').addEventListener('click', () => {

    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    alert(`Score has been reset.`);

});

const score = {
    wins: 0,
    losses: 0,
    ties: 0
};

//a function to play the game
function playGame(playerMove) {

    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }
    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }
    }

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}

//a function to create computer move
function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}