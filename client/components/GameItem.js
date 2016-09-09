import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

class GameItem extends Component {
  joinGame() {
    this.props.onClick(this.props.game)
  }

  gameIsFinished() {
    const { game } = this.props
    let pairs = []
    game.players.map((player) => {
      pairs.concat(player.pairs)
    })
    return ((2 * pairs.length) === game.cards.length)
  }

  gameIsOpen() {
    const { game } = this.props
    if (this.gameIsFinished()) { return false }
    return game.players.length < 3
  }

  render() {
    const { game } = this.props

    return (
      <li>
        Game by { game.hostedBy && game.hostedBy.name }
        { this.gameIsOpen() ?
          <RaisedButton onClick={this.joinGame.bind(this)} label="Join game"/> :
        null }
      </li>
    )
  }
}

export default GameItem
