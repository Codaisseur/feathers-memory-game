import { GAME_JOINED } from '../actions/join-game'
import { GAME_LEFT } from '../actions/leave-game'

export default function updateCurrentGame(
  state = JSON.parse(localStorage.getItem('memoryGame')) || {}, { type, payload }) {
  switch (type) {
    case GAME_JOINED :
      localStorage.setItem('memoryGame', JSON.stringify(payload))
      return payload

    case GAME_LEFT :
      localStorage.setItem('memoryGame', JSON.stringify({}))
      return {}

    case 'GAME_UPDATED' :
      const updated = payload
      if (state._id === updated._id) {
        localStorage.setItem('memoryGame', JSON.stringify(payload))
        return updated
      }
      return state

    default :
      return state
  }
}
