import { GAMES_UPDATED } from '../actions/fetch-games'
import { GAME_CREATED } from '../actions/create-game'

export default function updateGames(state = [], { type, payload }) {
  switch (type) {
    case GAMES_UPDATED :
      return payload

    case GAME_CREATED :
      return state.concat([payload])

    default :
      return state
  }
}
