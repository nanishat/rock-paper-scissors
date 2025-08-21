document.querySelector('.js-rock').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors').addEventListener('click', () => {
    playGame('scissors');
});

const autoPlayBtn = document.querySelector('.js-auto-play-btn');

autoPlayBtn.addEventListener('click', () => {
    autoPlay();
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') { playGame('rock') }
    else if (event.key === 'p') { playGame('paper') }
    else if (event.key === 's') { playGame('scissors') }
    else if (event.key === 'a') { autoPlay() }
    else if (event.key === 'Backspace') { showResetConfirmation() }
});

document.querySelector('.js-reset-score-btn').addEventListener('click', () => {
    showResetConfirmation();
});

//check for stored score, if not found any it will show default score
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}

updateScoreElement();

let isAutoPlaying = false;
let intervalID;

//an autoplay function, where playerMove is choosed randomly by computerMove
function autoPlay() {
    if (!isAutoPlaying) {
        intervalID = setInterval(() => {
            //for auto playing we need to pick the player move by computer move
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 3000);
        isAutoPlaying = true;
        autoPlayBtn.innerHTML = 'Stop Playing';

    } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
        autoPlayBtn.innerHTML = 'Auto Play';
    }
}

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

    //a feature to save the score in localStorage
    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result')
        .innerHTML = result;

    document.querySelector('.js-moves')
        .innerHTML = `You
        <img src="images/${playerMove}-emoji.png" alt="playerMove-emoji" class="move-icon">
        <img src="images/${computerMove}-emoji.png" alt="computerMove-emoji" class="move-icon">
        Computer`;

}

//a function to reset all the existing score from display, also from localstore
function showResetConfirmation() {
    const displayDecision = document.querySelector('.js-decision');

    //generated html on reset score button click
    const decisionHTML =
        `
        Are you sure you want to reset the score?
        <button class="js-yes-btn decision-display-btn">Yes</button>
        <button class="js-no-btn decision-display-btn">No</button>
        `;

    displayDecision.innerHTML = decisionHTML;

    document.querySelector('.js-yes-btn')
        .addEventListener('click', () => {
            resetScore();
        });
    document.querySelector('.js-no-btn')
        .addEventListener('click', () => {
            displayDecision.innerHTML = '';
        });

    //core functionality of reset score
    function resetScore() {
        score = {
            wins: 0,
            losses: 0,
            ties: 0
        };
        localStorage.removeItem('score');
        updateScoreElement();

        document.querySelector('.js-result')
            .innerHTML = 'Score has been reset!';

        document.querySelector('.js-moves')
            .innerHTML = '';

        displayDecision.innerHTML = '';
    }

}

//a function to display updated score
function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
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