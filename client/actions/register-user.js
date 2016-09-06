import Api from '../middleware/api'
import appLoading from './app-loading'
import authenticate from './authenticate'

export const REGISTER_USER = 'REGISTER_USER'

export default function registerUser(user) {
  return dispatch => {
    // We're loading (communicating with the API asynchronously)
    dispatch(appLoading())

    // Here's the new user data, create a User with it
    const api = new Api()
    api.service('users').create(user)
      .then((response) => {
        // We're done creating the User, now authenticate
        dispatch(authenticate(user))
      })
  }
}
