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
  flipMe() {
    const { flipCard, index } = this.props
    flipCard(index)
  }

  render() {
    const { flipped, symbol } = this.props

    return (
      <GridTile onClick={ this.flipMe.bind(this) }>
        <Paper style={ style.paper } zDepth={1}>
          <h1 style={ style.symbol }>{ flipped ? symbol : '' }</h1>
        </Paper>
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
