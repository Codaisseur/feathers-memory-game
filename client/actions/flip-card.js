import GameModel from '../models/game-model'

export const NEW_PLAYER_TURN = 'NEW_PLAYER_TURN'

export default function flipCard(game, index, currentPlayer) {
  return dispatch => {
    const model = new GameModel(dispatch)
    model.flipCard(game, index, currentPlayer)
  }
}
