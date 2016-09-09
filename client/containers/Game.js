import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { GridList } from 'material-ui/GridList';
import flipCard from '../actions/flip-card'
import Card from '../components/card'
import leaveGame from '../actions/leave-game'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 612,
    height: 612,
    overflowY: 'auto',
    marginBottom: 0,
  },
};


class Game extends Component {
  componentDidMount() {
    const { leaveGame } = this.props
    if (this.gameIsFinished()) { leaveGame() }
  }

  componentDidUpdate() {
    const { leaveGame } = this.props
    if (this.gameIsFinished()) { leaveGame() }
  }

  gameIsFinished() {
    const { cards } = this.props
    return (cards.filter((card) =>
      (!this.cardIsWon(card))).length === 0)
  }

  renderCard(card, index) {
    console.log(this.cardIsWon(card), card.symbol, index)
    return (
      <Card key={ index }
        flipCard={ this.tryFlipCard.bind(this) }
        index={ index } { ...card }
        won={ this.cardIsWon(card) }/>
      )
  }

  tryFlipCard(index) {
    const { flipCard, pairFlipped, game, currentPlayer } = this.props
    if (pairFlipped) { return }
    flipCard(game, index, currentPlayer)
  }

  cardIsWon(card) {
    const { game } = this.props
    let pairs = []
    game.players.map((player) => {
      pairs = pairs.concat(player.pairs)
    })
    return pairs.filter((symbol) => (card.symbol === symbol)).length > 0
  }

  gameIsPlayable() {
    return this.props.game.players.length > 1
  }

  render() {
    const { cards } = this.props

    return (
      <div style={ styles.root }>
        <GridList cellHeight={ 150 } cols={ 4 } style={ styles.gridList }>
          { cards.map(this.renderCard.bind(this)) }
        </GridList>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.currentGame,
    cards: state.currentGame ? state.currentGame.cards : [],
    currentPlayer: state.currentPlayer,
    flippedCards: state.currentGame.cards.filter((card) => card.flipped),
    canFlip: (state.currentGame.cards.filter((card) => card.flipped).length < 2),
    pairFlipped: (state.currentGame.cards.filter((card) => card.flipped).length === 2),
  }
}

Game.propTypes = {
  cards: PropTypes.array.isRequired,
  flippedCards: PropTypes.array.isRequired,
  canFlip: PropTypes.bool.isRequired,
  pairFlipped: PropTypes.bool.isRequired,
  flipCard: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { flipCard, leaveGame })(Game)
