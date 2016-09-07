import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { GridList } from 'material-ui/GridList';
import createGame from '../actions/create-game'
import flipCard from '../actions/flip-card'
import Card from '../components/card'

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
    this.props.createGame()
  }

  renderCard(card, index) {
    return (
      <Card key={ index }
        flipCard={ this.tryFlipCard.bind(this) }
        index={ index } { ...card } />
      )
  }

  tryFlipCard(index) {
    if (this.props.pairFlipped) { return }
    this.props.flipCard(index)
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
    cards: state.cards,
    flippedCards: state.cards.filter((card) => card.flipped),
    canFlip: (state.cards.filter((card) => card.flipped).length < 2),
    pairFlipped: (state.cards.filter((card) => card.flipped).length === 2),
  }
}

Game.propTypes = {
  cards: PropTypes.array.isRequired,
  flippedCards: PropTypes.array.isRequired,
  canFlip: PropTypes.bool.isRequired,
  pairFlipped: PropTypes.bool.isRequired,
  flipCard: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { flipCard, createGame })(Game)
