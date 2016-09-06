import { USER_AUTHENTICATED } from '../actions/user-authenticated'

export default function isAuthenticated(state = false, { type, payload }) {
  switch (type) {
    case USER_AUTHENTICATED :
      return true

    default :
      return state
  }
}
