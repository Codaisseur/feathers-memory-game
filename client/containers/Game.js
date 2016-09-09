import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { GridList } from 'material-ui/GridList';
import flipCard from '../actions/flip-card'
import Card from '../components/card'
import leaveGame from '../actions/leave-game'
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton'

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
  overlay: {
    background: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: '+1',
  },
  progress: {
    width: 300,
    margin: '400px auto',
    textAlign: 'center',
  }
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
    return (
      <Card key={ index }
        flipCard={ this.tryFlipCard.bind(this) }
        playerHasTurn={ this.props.playerHasTurn }
        index={ index } { ...card }
        won={ this.cardIsWon(card) }/>
      )
  }

  tryFlipCard(index) {
    const { playerHasTurn, flipCard, pairFlipped, game, currentPlayer } = this.props
    if (!playerHasTurn || pairFlipped) { return }
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

  currentPlayerNameS() {
    const { game, playerHasTurn, currentPlayer } = this.props
    console.log('Current Player: ', currentPlayer)
    if (playerHasTurn) { return 'your' }
    return `${game.players[currentPlayer].name}'s`
  }

  render() {
    const { game, cards, playerHasTurn } = this.props

    return (
      <div style={ styles.root }>
        { this.gameIsPlayable() ?
          <div>
            <RaisedButton label="Leave game" onClick={this.props.leaveGame} />
            <GridList cellHeight={ 150 } cols={ 4 } style={ styles.gridList }>
              { cards.map(this.renderCard.bind(this)) }
            </GridList>
            <center>It's { this.currentPlayerNameS() } turn!</center>
            <ul>
              { game.players.map((player, index) => {
                return <li key={index}>{player.name}: {player.pairs.length}</li>
              })}
            </ul>
          </div> :
            <div style={styles.overlay}>
              <div style={styles.progress}>
                <CircularProgress size={2} value={50} />
                <p>Waiting for other player(s) to join...</p>
                <RaisedButton label="Leave game" onClick={this.props.leaveGame} />
              </div>
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.currentGame,
    cards: state.currentGame ? state.currentGame.cards : [],
    currentPlayer: state.currentGame ? state.currentGame.turn : 0,
    playerHasTurn: (state.currentGame && state.currentGame.players[state.currentGame ? state.currentGame.turn : 0] && state.currentGame.players[state.currentGame ? state.currentGame.turn : 0].userId === state.currentUser._id),
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
