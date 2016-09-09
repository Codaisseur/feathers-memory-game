'use strict';

// src/services/game/hooks/create-game.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const user = hook.params.user;

    hook.data.userId = user._id;

    const symbols = shuffle('ABCDEFGH'.repeat(2).split(''))
    hook.data.cards = symbols
      .map((symbol) => ({ flipped: false, symbol: symbol }))

    hook.data.players = [{
      userId: user._id,
      name: user.name,
      color: '#f00',
      pairs: []
    }];

  };
};
