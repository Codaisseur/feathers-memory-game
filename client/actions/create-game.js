import api from '../middleware/api'
import appLoading from './app-loading'
import appDoneLoading from './app-done-loading'

export const GAME_CREATED = 'GAME_CREATED'

export default function createGame(game) {
  return dispatch => {
    dispatch(appLoading())
    api.authThenCreate('games', game, (resource) => {
      dispatch(gameCreated(resource))
    })
    dispatch(appDoneLoading())
  }
}

function gameCreated(game) {
  return {
    type: GAME_CREATED,
    payload: game
  }
}
