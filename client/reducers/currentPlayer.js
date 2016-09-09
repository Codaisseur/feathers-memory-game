import { NEW_PLAYER_TURN } from '../actions/flip-card'

export default function updateCurrentPlayer(state = 0, { type, payload }) {
  switch (type) {
    case NEW_PLAYER_TURN :
      return payload

    default :
      return state
  }
}
