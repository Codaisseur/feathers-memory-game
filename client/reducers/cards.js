import { CREATE_GAME } from '../actions/create-game'
import { FLIP_CARD } from '../actions/flip-card'

export default function updateGame( state = [], { type, payload } ) {
  switch (type) {
    case CREATE_GAME :
      const symbols = 'ABCDEFGH'.repeat(2).split('')
      return symbols
        .map((symbol) => ({ flipped: false, symbol: symbol }))

    case FLIP_CARD :
      const index = payload

      return state.slice(0, index)
        .concat([Object.assign({}, state[index], { flipped: true })])
        .concat(state.slice(index + 1))

    default :
      return state
  }
}
