'use strict';

// src/services/game/hooks/winner.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const { cards, turn } = hook.data;
    const flippedCards = cards.filter((card) => (card.flipped))
    if (flippedCards.length === 2) {
      if (flippedCards[0].symbol === flippedCards[1].symbol) {
        hook.data.players[turn].pairs.push(flippedCards[0].symbol)
      } else {
        const totalPlayers = hook.data.players.length
        let nextTurn = turn + 1
        if (nextTurn > totalPlayers - 1) {
          nextTurn = 0
        }
        hook.data.turn = nextTurn
      }
    }
  };
};
