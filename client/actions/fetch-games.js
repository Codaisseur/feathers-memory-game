import api from '../middleware/api'
import appLoading from './app-loading'
import appDoneLoading from './app-done-loading'

export const GAMES_UPDATED = 'GAMES_UPDATED'

export default function fetchGames() {
  return dispatch => {
    // We're loading (communicating with the API asynchronously)
    dispatch(appLoading())

    // Here's the new user data, create a User with it
    api.authThenFind('games', (resources) => {
      dispatch(appDoneLoading())
      dispatch(gamesUpdated(resources))
    })
  }
}

function gamesUpdated(games) {
  return {
    type: GAMES_UPDATED,
    payload: games.data,
  }
}
