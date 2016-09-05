import { REGISTER_USER } from '../actions/register-user'

export default function updateUser(state = {}, { type, payload }) {
  switch (type) {
    case REGISTER_USER :
      console.log(payload)
      return payload

    default :
      return state
  }
}
