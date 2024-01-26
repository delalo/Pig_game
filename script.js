'use strict';

// Selecting elements
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = () => {
  // Starting conditions

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = () => {
  // switch
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  currentScore = 0;
};

// Rolling dice functionality

btnRoll.addEventListener('click', () => {
  // Generating a random dice roll

  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the diceEl
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;
    // check for the rolled 1

    if (dice !== 1) {
      // Add the dice to the current score
      currentScore += dice;
      document.getElementById(`score--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  // Add current score to the score of the active player
  if (playing) {
    scores[activePlayer] += currentScore;
    //   scores[1] = scores [1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if the player's score is >= 100
    if (scores[activePlayer] >= 10) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    //   switch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
