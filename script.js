'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const curr0Element = document.getElementById('current--0');
const curr1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const setCurrPlayerScore = (player, score) => {
  document.getElementById(`current--${player}`).textContent = score;
};

const switchScreen = player => {
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

const switchPlayer = player => {
  setCurrPlayerScore(player, 0);
  switchScreen(player);
};

let currPlayer = 0;
let currScore = 0;
let totalScore = [0, 0];
let playing = true;

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    if (diceElement.classList.contains('hidden')) {
      diceElement.classList.remove('hidden');
    }
    diceElement.src = `dice-${dice}.png`;

    // 3. Check if 1 was rolled. If true, reset current score and switch to the other player.
    if (dice !== 1) {
      // Add dice to current score
      currScore += dice;
      setCurrPlayerScore(currPlayer, currScore);
    } else {
      // Reset current score and switch to the other player
      currScore = 0;
      switchPlayer(currPlayer);
      currPlayer ^= 1;
    }
  }
});

// Holding functionality
btnHold.addEventListener('click', () => {
  if (playing) {
    // Update the new total score of the player
    totalScore[currPlayer] += currScore;
    document.getElementById(`score--${currPlayer}`).textContent = totalScore[currPlayer];

    if (totalScore[currPlayer] >= 100) {
      // The current player wins and the game is finished
      playing = false;
      diceElement.classList.add('hidden');

      const currPlayerElement = document.querySelector(`.player--${currPlayer}`);
      currPlayerElement.classList.remove('player--active');
      currPlayerElement.classList.add('player--winner');
    } else {
      // Reset current score and switch to the other player
      currScore = 0;
      switchPlayer(currPlayer);
      currPlayer ^= 1;
    }
  }
});

// Reset to the starting screen and start a new game
btnNew.addEventListener('click', () => {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  curr0Element.textContent = 0;
  curr1Element.textContent = 0;

  if (!diceElement.classList.contains('hidden')) {
    diceElement.classList.add('hidden');
  }

  if (!player0Element.classList.contains('player--active')) {
    player0Element.classList.add('player--active');
  }

  if (player1Element.classList.contains('player--active')) {
    player1Element.classList.remove('player--active');
  }

  if (player0Element.classList.contains('player--winner')) {
    player0Element.classList.remove('player--winner');
  }

  if (player1Element.classList.contains('player--winner')) {
    player1Element.classList.remove('player--winner');
  }

  currPlayer = 0;
  currScore = 0;
  totalScore = [0, 0];
  playing = true;
});
