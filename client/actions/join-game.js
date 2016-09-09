import GameModel from '../models/game-model'

export const GAME_JOINED = 'GAME_JOINED'

export default function joinGame(game, currentUser) {
  return dispatch => {
    dispatch(setCurrentGame(game))

    const model = new GameModel(dispatch)
    if (game.players.filter((player) => (player._id === currentUser._id)).length > 0) {
      return // we're done!
    }

    const playerColors = [
      '#f00',
      '#0f0',
      '#00f'
    ]

    const currentPlayer = {
      userId: currentUser._id,
      color: playerColors[game.players.length],
      pairs: []
    }

    const players = game.players.concat([currentPlayer])
    model.save(game, { players })
  }
}

export function setCurrentGame(game) {
  return {
    type: GAME_JOINED,
    payload: game
  }
}
