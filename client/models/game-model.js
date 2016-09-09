import BaseModel from 'feathersjs-redux-model/build/models/base-model'
// import BaseModel from './base-model'

class GameModel extends BaseModel {
  flipCard(game, index, currentPlayer) {
    const oldCards = game.cards
    const card = oldCards[index]

    const cards = oldCards.slice(0, index)
      .concat([Object.assign({}, card, { flipped: !card.flipped })])
      .concat(oldCards.slice(index + 1))

    window.setTimeout(() => {
      this.save(game, Object.assign({}, game, { cards }), true)
      this.flipBackCards(game, cards, currentPlayer)
    }, 300)
  }

  flipBackCards(game, cards, currentPlayer) {
    console.log('This is where I check the cards!')
    const flippedCards = cards.filter((card) => (card.flipped))
    if (flippedCards.length === 2) {
      console.log('Two cards are flipped, flipping back...')
      window.setTimeout(() => {
        let newCards = game.cards.map((card) => {
          return Object.assign({}, card, { flipped: false })
        })
        this.save(game, { cards: newCards })
      }, 1000)
    }
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

const gameModel = new GameModel()

export default gameModel
