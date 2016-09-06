import Api from '../middleware/api'
import appLoading from './app-loading'
import appDoneLoading from './app-done-loading'
import userAuthenticated from './user-authenticated'

export default function authenticateUser(user) {
  return dispatch => {
    // We're loading (communicating with the API asynchronously)
    dispatch(appLoading())

    // Here's the new user data, create a User with it
    const api = new Api()
    api.authenticate(user).then((response) => {
      debugger
      dispatch(userAuthenticated())
      dispatch(appDoneLoading())
    }).catch((error) => {
      console.error('Error authenticating!', error);
      debugger
      // TODO: setFormErrors?
      dispatch(appDoneLoading())
    })
  }
}
