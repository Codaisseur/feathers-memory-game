import { FLIP_CARD } from '../actions/flip-card'

export default function updateGame( state = [], { type, payload } ) {
  switch (type) {
    case FLIP_CARD :
      const index = payload

      return state.slice(0, index)
        .concat([Object.assign({}, state[index], { flipped: true })])
        .concat(state.slice(index + 1))

    default :
      return state
  }
}
