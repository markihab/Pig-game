'use strict';

// Selecting elements
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const resetButton = document.querySelector('.btn--new');
const currentScoreForPlayer1 = document.querySelector('#current--0');
const currentScoreForPlayer2 = document.querySelector('#current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

//Starting condition

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score1.textContent = 0;
  score2.textContent = 0;
  currentScoreForPlayer1.textContent = 0;
  currentScoreForPlayer2.textContent = 0;
  diceEl.classList.add('hidden');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

rollDiceButton.addEventListener(
  'click',
  function () {
    if (playing) {
      // Generating a random dice roll
      let dice = Math.trunc(Math.random() * 6) + 1;
      console.log(dice);
      // Display the dice
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;
      // Check for rolled 1 : if true, switches to the next player
      if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.querySelector(`#current--${activePlayer}`).textContent =
          currentScore;
        // if (activePlayer === 0) {
        //   currentScoreForPlayer1.textContent = currentScore;
        // } else if (activePlayer === 1) {
        //   currentScoreForPlayer2.textContent = currentScore;
        // }
      } else {
        // Switch to other player
        //activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        //currentScore = 0;
        switchPlayer();
      }
      //remove active class from active player
      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.remove('player--active');

      //set the current active user point to 0
      // document.querySelector(`#current--${activePlayer}`).textContent =
      //   currentScore;

      // activePlayer = activePlayer === 0 ? 1 : 0;

      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.add('player--active');

      // This toggle makes it easier than doing remove & add separtly just in one line
      // player1.classList.toggle('player--active');
      // player2.classList.toggle('player--active');

      // if (activePlayer === 0) {
      //   player1.classList.remove('player--active');
      //   player2.classList.add('player--active');
      //   activePlayer = 1;
      //   currentScoreForPlayer1.textContent = '0';
      // } else if (activePlayer === 1) {
      //   player2.classList.remove('player--active');
      //   player1.classList.add('player--active');
      //   activePlayer = 0;
      //   currentScoreForPlayer2.textContent = '0';
      // }
    }
  },

  holdButton.addEventListener('click', function () {
    if (playing) {
      //add current score for the active user to his total score.
      //Get the current total score for the current active user
      scores[activePlayer] += currentScore;

      // let currentTotalScoreForActivePlayer = Number(
      //   document.querySelector(`#score--${activePlayer}`).textContent
      // );

      //console.log(currentTotalScoreForActivePlayer);

      //Add the current total score for active player & add it the current score
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
      //check if this score >= 20, if yes current player wins : no switch player.
      if (scores[activePlayer] >= 20) {
        //This player wins
        playing = false;
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
        diceEl.classList.add('hidden');
      } else {
        //switch to next player
        switchPlayer();
      }
    }
  }),
  resetButton.addEventListener('click', function () {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    init();
    player1.classList.add('player--active');
  })
);
