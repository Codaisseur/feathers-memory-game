import { USER_AUTHENTICATED } from '../actions/user-authenticated'

export default function storeCurrentUser(state = {}, { type, payload }) {
  switch (type) {
    case USER_AUTHENTICATED :
      return payload

    default :
      return state
  }
}
