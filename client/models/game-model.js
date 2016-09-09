import BaseModel from './base-model'

class GameModel extends BaseModel {
  flipCard(game, index, currentPlayer) {
    const oldCards = game.cards
    const card = oldCards[index]

    const cards = oldCards.slice(0, index)
      .concat([Object.assign({}, card, { flipped: !card.flipped })])
      .concat(oldCards.slice(index + 1))

    this.save(game, { cards })

    this.checkCards(game, cards, currentPlayer)
  }

  checkCards(game, cards, currentPlayer) {
    console.log('This is where I check the cards!')
    const flippedCards = cards.filter((card) => (card.flipped))
    if (flippedCards.length === 2) {
      console.log('Two cards are flipped, checking...')
      let newPlayers = game.players
      window.setTimeout(() => {
        if (flippedCards[0].symbol === flippedCards[1].symbol) {
          console.log('Cards match! Assigning pairs to player...', currentPlayer, flippedCards[0].symbol)
          newPlayers[currentPlayer].pairs.push(flippedCards[0].symbol)
          console.log(newPlayers)
        } else {
          console.log('Cards do not match, flipping back..!')
        }
        let newCards = game.cards.map((card) => {
          return Object.assign({}, card, { flipped: false })
        })
        this.save(game, { players: newPlayers, cards: newCards })
        this.nextPlayer(game, currentPlayer)
      }, 3000)
    }
  }

  nextPlayer(game, currentPlayer) {
    console.log('Neeeeeext..!')
    const totalPlayers = game.players.length
    let nextPlayer = currentPlayer++
    if (nextPlayer >= totalPlayers - 1) {
      nextPlayer = 0
    }
    this.dispatch({
      type: 'NEW_PLAYER_TURN',
      payload: nextPlayer
    })
  }


  defaults() {
    return {
      cards: [],
      players: [],
      started: false,
      winner: null,
      turn: 0,
      createdAt: Date.now,
      updatedAt: Date.now
    };
  }

  findParams() {
    return {
      query: {
        $sort: { createdAt: -1 },
        $limit: 10
      }
    };
  }

  constructor(dispatch, onError) {
    super('game', dispatch, onError);
  }
}

export default GameModel
