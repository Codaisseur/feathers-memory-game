import React, { Component, PropTypes } from 'react'
import { GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

const style = {
  paper: {
    height: 130,
    width: 130,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
  },
  symbol: {
    fontSize: '3rem',
  }
}

class Card extends Component {
  constructor() {
    super()

    this.state = {
      flipping: false
    }
  }

  flipMe() {
    const { flipCard, index, playerHasTurn } = this.props

    this.setState({
      flipping: playerHasTurn
    });

    window.setTimeout(() => {
      this.setState({
        flipping: false
      });
      flipCard(index)
    }, 300)
  }

  cardStyle() {
    return this.state.flipping ?
      Object.assign({}, style.paper, { backgroundColor: '#ccf'}) :
      style.paper
  }

  render() {
    const { flipped, symbol, won } = this.props

    return (
      <GridTile onClick={ this.flipMe.bind(this) }>
        { won ? null :
          <Paper style={ this.cardStyle() } zDepth={1}>
            <h1 style={ style.symbol }>{ flipped ? symbol : '' }</h1>
          </Paper>
        }
      </GridTile>
    )
  }
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  flipped: PropTypes.bool.isRequired,
  symbol: PropTypes.string.isRequired,
  flipCard: PropTypes.func.isRequired,
}

export default Card
