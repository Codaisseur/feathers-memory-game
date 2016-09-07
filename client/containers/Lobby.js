import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import fetchGames from '../actions/fetch-games'
import createGame from '../actions/create-game'

class Lobby extends Component {
  componentDidMount() {
    this.props.fetchGames()
  }

  createGame() {
    this.props.createGame({})
  }

  renderGameItem(game, index) {
    return (
      <li key={index}>Game by { game.players[0].name }</li>
    )
  }

  render() {
    return (
      <div>
        <h1>Games Lobby</h1>
        <div>
          <RaisedButton
            label="New Game"
            primary={true}
            onClick={this.createGame.bind(this)}/>
        </div>
        <div>
          <ul>
            { this.props.games.map(this.renderGameItem.bind(this)) }
          </ul>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
  }
}

export default connect(mapStateToProps, { fetchGames, createGame })(Lobby)
